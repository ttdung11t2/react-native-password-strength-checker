/**
 * Created by dungtran on 8/20/17.
 */

import React, { Component, PropTypes } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';

const { width: wWidth } = Dimensions.get('window');

function widthByPercent (percentage, containerWidth = wWidth) {
  const value = (percentage * containerWidth) / 100;
  return Math.round(value);
}

const regex = {
  digitsPattern: /\d/,
  lettersPattern: /[a-zA-Z]/,
  lowerCasePattern: /[a-z]/,
  upperCasePattern: /[A-Z]/,
  wordsPattern: /\w/,
  symbolsPattern: /\W/
};

export default class PasswordStrengthChecker extends Component {
  static defaultProps = {
    minLevel: 2,
    minLength: 6,
    ruleNames: 'lowerCase|upperCase|digits|symbols',
    strengthLevels: [
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: '33',
        innerBarColor: '#fe6c6c'
      },
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: '33',
        innerBarColor: '#fe6c6c'
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: '67',
        innerBarColor: '#feb466'
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: '67',
        innerBarColor: '#feb466'
      },
      {
        label: 'Strong',
        labelColor: '#fff',
        widthPercent: '100',
        innerBarColor: '#6cfeb5'
      }
    ],
    barColor: '#ffffff',
    barWidthPercent: 70
  };
  
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    minLength: PropTypes.number,
    ruleNames: PropTypes.string,
    strengthLevels: PropTypes.array,
    minLevel: PropTypes.number,
    inputWrapperStyle: View.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    strengthWrapperStyle: View.propTypes.style,
    strengthBarStyle: View.propTypes.style,
    innerStrengthBarStyle: View.propTypes.style,
    strengthDescriptionStyle: Text.propTypes.style,
    barColor: PropTypes.string,
    barWidthPercent: PropTypes.number
  };
  
  constructor(props) {
    super(props);
    this.state = {
      level: -1
    }
  }
  
  isTooShort(password) {
    if (!this.props.minLength) {
      return true;
    }
    return password.length < this.props.minLength;
  }
  
  isMatchingRules(password) {
    const ruleNames = this.props.ruleNames;
    if (!ruleNames) {
      return true;
    }
    
    const rules = _.chain(ruleNames)
        .split('|')
        .filter(rule => !!rule)
  .map(rule => rule.trim())
  .value();
    
    for (const rule of rules) {
      if (!this.isMatchingRule(password, rule)) {
        return false;
      }
    }
    return true;
  }
  
  isMatchingRule(password, rule) {
    switch (rule) {
      case 'symbols':
        return regex.symbolsPattern.test(password);
      case 'words':
        return regex.wordsPattern.test(password);
      case 'digits':
        return regex.digitsPattern.test(password);
      case 'letters':
        return regex.lettersPattern.test(password);
      case 'lowerCase':
        return regex.lowerCasePattern.test(password);
      case 'upperCase':
        return regex.upperCasePattern.test(password);
      default:
        return true;
    }
  }
  
  calculateScore(text) {
    if (!text) {
      return -1;
    }
    
    if (this.isTooShort(text) || !this.isMatchingRules(text)) {
      return 0;
    }
    
    return zxcvbn(text).score;
  }
  
  getPasswordStrengthLevel(password) {
    return this.calculateScore(password);
  }
  
  onChangeText(password) {
    const level = this.getPasswordStrengthLevel(password);
    this.setState({
      level: level
    });
    const isValid = level >= this.props.minLevel;
    this.props.onChangeText(password, isValid);
  }
  
  renderPasswordInput() {
    return (
      <View style={[styles.inputWrapper, this.props.inputWrapperStyle]}>
        <TextInput
          {...this.props}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          underlineColorAndroid="transparent"
          selectionColor="#fff"
          style={[styles.input, this.props.inputStyle]}
          onChangeText={text => this.onChangeText(text)}
        />
      </View>
    );
  }
  
  renderPasswordStrength() {
    const barWidth = widthByPercent(this.props.barWidthPercent);
    const level = this.state.level;
    let strengthLevelBarStyle = {}, strengthLevelLabelStyle = {}, strengthLevelLabel = '';
    if (level !== -1) {
      strengthLevelBarStyle = {
        backgroundColor: this.props.strengthLevels[level].innerBarColor,
        width: widthByPercent(this.props.strengthLevels[level].widthPercent, barWidth)
      };
      
      strengthLevelLabelStyle = {
        color: this.props.strengthLevels[level].labelColor
      };
      
      strengthLevelLabel = this.props.strengthLevels[level].label
    }
    
    return (
      <View style={[styles.passwordStrengthWrapper, this.props.strengthWrapperStyle]}>
        <View style={[styles.passwordStrengthBar, this.props.strengthBarStyle, { backgroundColor: this.props.barColor, width: barWidth }]}>
          <View style={[styles.innerPasswordStrengthBar, this.props.innerStrengthBarStyle, { ...strengthLevelBarStyle }]} />
        </View>
        <Text style={[styles.strengthDescription, this.props.strengthDescriptionStyle, { ...strengthLevelLabelStyle }]}>{strengthLevelLabel}</Text>
      </View>
  );
  }
  
  render() {
    return (
      <View style={styles.wrapper}>
        {this.renderPasswordInput()}
        {this.renderPasswordStrength()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.8,
    borderColor: 'rgba(242, 242, 242, 0.5)'
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingTop: 7,
    paddingBottom: 10,
    fontSize: 20,
    fontFamily: 'Montserrat'
  },
  passwordStrengthWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  passwordStrengthBar: {
    height: 10,
    position: 'relative',
    top: 5,
    bottom: 5,
    borderRadius: 5
  },
  innerPasswordStrengthBar: {
    height: 10,
    borderRadius: 5,
    width: 0
  },
  strengthDescription: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'right',
    position: 'absolute',
    right: 5,
    top: 1,
    fontSize: 14
  }
});
