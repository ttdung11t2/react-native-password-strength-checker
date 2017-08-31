/**
 * Created by dungtran on 8/20/17.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import PasswordStrength from './components/PasswordStrengthChecker';

class example extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fullName: {
        value: ''
      },
      userName: {
        value: ''
      },
      password: {
        value: '',
        isValid: false
      }
    };
  }
  
  _onChangePassword(password, isValid) {
    this.setState({ password: { value: password, isValid: isValid } })
  }
  
  render() {
    // Define list of strength
    const strengthLevels = [
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: 25,
        innerBarColor: '#fe6c6c'
      },
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: 25,
        innerBarColor: '#fe6c6c'
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: 50,
        innerBarColor: '#feb466'
      },
      {
        label: 'Good',
        labelColor: '#fff',
        widthPercent: 75,
        innerBarColor: '#81fe2c'
      },
      {
        label: 'Strong',
        labelColor: '#fff',
        widthPercent: 100,
        innerBarColor: '#6cfeb5'
      }
    ];
    
    // Enable too short
    const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red'
    };
    
    /** TO CHANGE PASSWORD INPUT STYLE:
      - Use props inputWrapperStyle to change input wrapper style
      - Use props inputStyle to change input style
      - Use props strengthWrapperStyle to change bar and description wrapper style
      - Use props strengthBarStyle to change full bar style
      - Use props innerStrengthBarStyle to change inner bar style
      - Use props strengthDescriptionStyle to strength description style
     **/
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <Text style={styles.title}>PASSWORD STRENGTH CHECKER DEMO</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>FULLNAME</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                multiline={false}
                underlineColorAndroid="transparent"
                selectionColor="#fff"
                onChangeText={text => this.setState({ fullName: { value: text } })} />
            </View>
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>USERNAME</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                multiline={false}
                underlineColorAndroid="transparent"
                selectionColor="#fff"
                onChangeText={text => this.setState({ userName: { value: text } })} />
            </View>
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <PasswordStrength
              secureTextEntry
              minLength={4}
              ruleNames="symbols|words"
              strengthLevels={strengthLevels}
              tooShort={tooShort}
              minLevel={0}
              barWidthPercent={65}
              barColor="#ccc"
              onChangeText={(text, isValid) => this._onChangePassword(text, isValid)} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009C92'
  },
  title: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 30
  },
  wrapper: {
    marginTop: 30,
    paddingHorizontal: 20
  },
  inputWrapper: {
    marginTop: 30
  },
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.8,
    borderColor: 'rgba(242, 242, 242, 0.5)'
  },
  textInput: {
    flex: 1,
    color: '#fff',
    paddingTop: 7,
    paddingBottom: 10,
    fontSize: 20
  }
});

AppRegistry.registerComponent('example', () => example);