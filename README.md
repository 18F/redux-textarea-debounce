# redux-textarea-debounce

A React component that emulates a `<textarea>` but debounces the `onChange`
event, which is especially useful for redux apps.  If you try to handle every
`onChange` by routing it through the dispatcher and all that fun stuff, your
app may begin to lag.  This app helps with that!

## Installation

```
npm i @18f/redux-textarea-debounce
```

## Usage

Whatever function you provide as the `onChange` prop is debounced so it only
runs at most once every 200ms.  As long as the user keeps typing, it won't run
at all - unless they slow down long enough.

It's as much like a regular `textarea` as possible:

```javascript
import TextArea from '@18f/redux-textarea-debounce';

function handler(e) {
  // You get the full SyntheticEvent object, but
  // not on every change - at most once every 200ms
  console.log(e.target.value);
}

render() {
  return (
    <TextArea value="initial value" onChange={handler} />
  );
}
```

|Prop|Type|Description|
|--|--|--|
|`value`|string|The initial text value of the text area.|
|`name`|string|A name for the component, passed down to the underlying `<textarea>` - this will show up on the event as `event.target.name`.|
|`onChange`|function|The event handler for change events, called at most once ever 200ms.  Receives one argument, a React [SyntheticEvent](https://facebook.github.io/react/docs/events.html) from the underlying real `<textarea>` component.|

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in
[CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within   the United States, and
> copyright and related rights in the work worldwide are waived through the
> [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
copyright interest.
