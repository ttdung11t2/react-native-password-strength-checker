# react-native-password-strength-checker

A react-native password input with strength checker for both iOS and Android.

## Features
- Uses [zxcvbn](https://github.com/dropbox/zxcvbn) to check password strength, combined with custom rules and password length
- Support for both IOS and Android, use ES6 React native
- Animated strength bar
- Check password is too short
- Check password not match rules
- Custom strength level (corresponding to 5 levels)
- Custom style for password input and password strength

## Screenshots

![2017-08-22 12_19_00](https://thumbs.gfycat.com/BoldActiveAlaskajingle-size_restricted.gif)

## Installation

```sh
npm install react-native-password-strength-checker --save
```

## Usage

Import the module:

```javascript
import PasswordStrengthChecker from 'react-native-password-strength-checker';
```

Use as a component:

```javascript
// Default rule names
const ruleNames = 'lowerCase|upperCase|digits|symbols'

// Default strength level list
const strengthLevels = [
  {
    label: 'Weak',
    labelColor: '#fff',
    widthPercent: 33,
    innerBarColor: '#fe6c6c'
  },
  {
    label: 'Weak',
    labelColor: '#fff',
    widthPercent: 33,
    innerBarColor: '#fe6c6c'
  },
  {
    label: 'Fair',
    labelColor: '#fff',
    widthPercent: 67,
    innerBarColor: '#feb466'
  },
  {
    label: 'Fair',
    labelColor: '#fff',
    widthPercent: 67,
    innerBarColor: '#feb466'
  },
  {
    label: 'Strong',
    labelColor: '#fff',
    widthPercent: 100,
    innerBarColor: '#6cfeb5'
  }
];

// Default too short object
const tooShort = {
  enabled: false,
  labelColor: '#fff',
  label: 'Too short',
  widthPercent: 33,
  innerBarColor: '#fe6c6c'
};

render() {
  return (
    ...
    <PasswordStrengthChecker
      secureTextEntry
      minLength={0}
      ruleNames={ruleNames}
      strengthLevels={strengthLevels}
      tooShort={tooShort}
      minLevel={2}
      barWidthPercent={70}
      showBarOnEmpty={true}
      barColor="#ffffff"
      onChangeText={(text, isValid) => this.setState({ password: { value: text, isValid: isValid } })}
    />
  )
}
```

### Properties

This component uses the same props as `<TextInput>`. Below are additional props for this component:

Prop        | Type    | Default  | Description
----------- | ------- | ------- | -----------------------
`onChangeText`      | function    |     | **Required**. Trigger when user inputs and password input finishes validation. Returns value and validation result
`secureTextEntry`   | boolean     | `false`    | Same as [TextInput#secureTextEntry](https://facebook.github.io/react-native/docs/textinput#securetextentry)
`minLength`         | number      | 0          | Min length for password
`ruleNames`         | string      | _Above_  | List of rule names to check the password. Any combination of _digits_, _letters_, _words_, _symbols_, _upperCase_, _lowerCase_. Separate rules with **|**.
`strengthLevels`      | [StrengthLevel[]](#strengthlevel-object)   | _Above_    | List of password strength level with label, label color, percentage of width, bar color. The label is completely up to you. The only requirement is the list has **5 items** that correspond to [zxcvbn's score](https://github.com/dropbox/zxcvbn#usage).
`tooShort`          | [TooShort](#tooshort-object)      | _Above_  | Displayed when the password is shorter than `minLength`. Otherwise, the corresponding `strengthLevels`'s label is displayed.
`minLevel`          | number      | 2    | Min level to pass password validation (`isValid` flag returned in `onChangeText`). Possible values: _0_, _1_, _2_, _3_, _4_.
`inputWraperStyle`  | object      |     | Style for <View> wrapped password input
`inputStyle`        | object/style      |     | Style for password input
`strengthWrapperStyle` | object/style    |     | Style for `<View>` wrapped password strength bar and description
`strengthBarStyle`  | object/style      |    | Style for password strength bar
`innerStrengthBarStyle` | object/style   |    | Style for password strength bar based on strength level
`strengthDescriptionStyle` | object/style  |        | Style for password strength description
`barColor`          | string      |  `'#ffffff'` | Color of filled password strength bar
`barWidthPercent`   | number       | 70    | Percentage of password strength bar width
`showBarOnEmpty`    | boolean    | `true`     | If `true`, show strength bar even if the  empty or not

#### StrengthLevel object:

Property         | Type      | Description
---------------- | --------- | ------------------------------------
`label`          | string    | Label for strength level description
`labelColor`     | string    | Color for strength level description label
`widthPercent`   | number    | Percentage of width for inner strength level bar
`innerBarColor`  | string    | Color for inner strength level bar


#### TooShort object:

Property         | Type       | Description
---------------- | ---------- | -----------------------------------
`enabled`        | boolean    | Enable too short description
`label`          | string     | Label for strength level description
`labelColor`     | string     | Color for strength level description label
`widthPercent`   | number     | Percentage of width for inner strength level bar
`innerBarColor`  | string     | Color for inner strength level bar

### Methods

To call methods, you first need to get reference to the `<PasswordStrenghChecker>` instance:

```js
render() {
  return (
    ...
    <PasswordStrengthChecker
      ...
      ref={ref => this.password = ref}
    />
  )
}

someMethod() {
  this.password.focus()
}
```

Method   | Arguments | Description
-------- | --------- | -----------
`focus`  | _None_    | See [#focus](https://facebook.github.io/react-native/docs/direct-manipulation#focus)
`blur`   | _None_    | See [#blur](https://facebook.github.io/react-native/docs/direct-manipulation#blur)

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

Any questions or support are welcome.
