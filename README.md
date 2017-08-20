# react-native-password-strength-checker
A react-native password input with strength checker for both IOS and Android

## Features
- Use zxcvbn to check password strength, combine with custom rules and password length
- Compatible with both IOS and Android
- Custom strength level
- Custom style for password input and password strength

## Dependencies
This Component is built using [Dropbox zxcvbn password strength estimator library](https://github.com/dropbox/zxcvbn)

## Screenshots

![2017-08-21 01_27_00](https://thumbs.gfycat.com/BackSecondhandHoverfly-size_restricted.gif)

## Installation

```sh
npm install react-native-password-strength-checker --save
```

## Usage
### Basic
Import this module:  
```javascript
import PasswordStrengthChecker from 'react-native-password-strength-checker';
```
Use as a component:  
```javascript
const strengLevels = [
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
];

...

<PasswordStrength
    secureTextEntry
    minLength={8}
    strengthLevels={strengthLevels}
    ruleNames="symbols|words"
    inputStyle={{ fontFamily: 'Montserrat', fontWeight: '500'}}
    onChangeText={(text, isValid) => this.setState({ password: { value: text, isValid: isValid } })} />
```

### Customization
- Define min length for password.  
**Default**: `6`
- Rules: _digits_, _letters_, _words_, _symbols_, _upperCase_, _lowerCase_.  
Separate rules with **|**.  
**Default**:  `{ ruleNames: 'lowerCase|upperCase|digits|symbols' }`
- Define min level to pass validation (0,1,2,3,4)  
**Default**: `{ minLevel: 2}`
- Define and enable too short case:  
**Default**: `
    {
        tooShort: {
          enabled: false,
          labelColor: '#fff',
          label: 'Too short',
          widthPercent: '33',
          innerBarColor: '#fe6c6c'
        }
    }
    `  
    Enable to show it when password length is too short
- Define strength labels and label colors, strength bar colors, percentage of width for each level  
**Default**: ` { strengthLevels: [
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
    ] }`

### Properties
This component uses the same props as <TextInput>. Below are additional props for this component:  

Prop        | Type    | Optional | Defaul  | Description
----------- | ------- | -------- | ------- | -----------------------
`minLength`         | number   | Yes      | 6          | Min length for password
`ruleNames`         | string   | Yes      | _Above_      | List of rule name to check password
`strengLevels`      | object array | Yes   | _Above_    | List of password strength level with label, label color, percentage of width, bar color
`tooShort`          | object   | Yes      | _Above_    | enabled, label, label color, percentage of width, bar color for too short
`minLevel`          | number   | Yes      | 2          | Min level to pass password validation
`inputWraperStyle`  | object   | Yes      |            | Style for <View> wrapped password input
`inputStyle`        | object/style   | Yes      |            | Style for password input
`strengthWrapperStyle` | object/style | Yes      |            | Style for <View> wrapped password strength bar and description
`strengthBarStyle`  | object/style   | Yes      |            | Style for password strength bar
`innerStrengthBarStyle` | object/style | Yes     |           | Style for password strength bar based on strength level
`strengthDescriptionStyle` | object/style | Yes    |        | Style for password strength description
`barColor`          | string   | Yes      |  `'#ffffff'` | Color of filled password strength bar
`barWidthPercent`   | number   | Yes       | 70        | Percentage of password strength bar width
`onChangeText`      | function | No       |            | Trigger when user inputs and password input finishes validation. Returns value and validation result


Strength level object:  
Property         | Type      |  Description
---------------- | --------- | ---------------------
`label`          | string    |  Label for strength level description
`labelColor`     | string    |  Color for strength level description label
`widthPercent`   | number    |  Percentage of width for inner strength level bar
`innerBarColor`  | string    |  Color for inner strength level bar
  
Too short object:  
Property         | Type       | Description
---------------- | ---------- | ---------------------
`enabled`        | boolean    | Enable too short description
`label`          | string     |  Label for strength level description
`labelColor`     | string     |  Color for strength level description label
`widthPercent`   | number     |  Percentage of width for inner strength level bar
`innerBarColor`  | string     |  Color for inner strength level bar

## Example
See [EXAMPLE](example)

## License

react-native-password-strength-checker is released under the MIT license. See [LICENSE](LICENSE) for details.