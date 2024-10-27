# PersianNumber Component

`PersianNumber` is a React component that converts and displays numbers in Persian words. It’s designed to handle various number formats, including decimals and large values, providing a customizable way to represent numeric values in Persian.

## Installation

Install the package using npm:

```bash
npm install persian-currency
```

Example

```javascript
import { PersianNumber } from 'persian-currency'

const App = () => (
    <div>
        <PersianNumber value={123} unit="تومان" />
    </div>
);

export default App;
```

Props

| Prop        | Type                  | Default | Description                                                                  |
|-------------|-----------------------|---------|------------------------------------------------------------------------------|
| `value`     | `number`              | `0`     | The numeric value to convert to Persian words.                               |
| `unit`      | `string`              | `''`    | Optional unit to display after the converted Persian words.                  |
| `style`     | `React.CSSProperties` | `null`  | Inline CSS styles to apply to the rendered component.                        |
| `className` | `string`              | `''`    | Optional class name(s) for custom styling.                                   |