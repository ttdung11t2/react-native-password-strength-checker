# react-native-password-strength-checker
A react-native password input with strength checker for both IOS and Android

## Features
- Use zxcvbn to check password strength, combine with custom rules and password length
- Support for both IOS and Android, use ES6 React native
- Animated strength bar
- Check password is too short
- Check password not match rules
- Custom strength level (corresponding to 5 levels)
- Custom style for password input and password strength

## Dependencies
This Component is built using [Dropbox zxcvbn password strength estimator library](https://github.com/dropbox/zxcvbn)

## Screenshots

![2017-08-22 12_19_00](https://thumbs.gfycat.com/BoldActiveAlaskajingle-size_restricted.gif)

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
// Define streng level list
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

// Define too short object
const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red'
};

render() {
  return (
    ...
    <PasswordStrength
        secureTextEntry
        minLength={4}
        ruleNames="symbols|words"
        strengthLevels={strengthLevels}
        tooShort={tooShort}
        minLevel={0}
        barWidthPercent={65}
        showBarOnEmpty={true}
        barColor="#ccc"
        onChangeText={(text, isValid) => this.setState({ password: { value: text, isValid: isValid } })} 
    />
  )
}
```

### Customization
- Define min length for password.  
  **Default**: `0`
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
    If you want to show 'too short', Enable it to show when password length is too short
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
`minLength`         | number   | Yes      | 0          | Min length for password
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
`showBarOnEmpty`    | boolean  | Yes      | `true`     | Only show strength bar when input is empty or not

Strength level object:  

Property         | Type      |  Description
---------------- | --------- | ------------------------------------
`label`          | string    |  Label for strength level description
`labelColor`     | string    |  Color for strength level description label
`widthPercent`   | number    |  Percentage of width for inner strength level bar
`innerBarColor`  | string    |  Color for inner strength level bar
  
  
Too short object:  

Property         | Type       | Description
---------------- | ---------- | -----------------------------------
`enabled`        | boolean    | Enable too short description
`label`          | string     |  Label for strength level description
`labelColor`     | string     |  Color for strength level description label
`widthPercent`   | number     |  Percentage of width for inner strength level bar
`innerBarColor`  | string     |  Color for inner strength level bar
  
## Example
See [EXAMPLE](example)
```sh
git clone https://github.com/ttdung11t2/react-native-password-strength-checker.git
cd react-native-password-strength-checker/example
npm install
react-native run-ios / react-native run-android
```
## License

react-native-password-strength-checker is released under the MIT license. See [LICENSE](LICENSE) for details.  
  
Any question or support will welcome.