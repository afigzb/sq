# Fault Text Effect Web Component

A customizable text glitch/fault effect as a reusable web component.

## Features

- Encapsulated as a Web Component (Custom Element)
- Clean Shadow DOM implementation
- Configurable text via attribute
- Click to trigger the glitch effect
- Multiple visual effects combined (color shifting, jitter, clip path)

## Usage

### Basic Usage

1. Include the script in your HTML:

```html
<script src="fault-text-effect.js"></script>
```

2. Use the component in your HTML:

```html
<fault-text-effect text="Your Text Here"></fault-text-effect>
```

### Styling

The component has default styling, but you can customize the container size:

```css
fault-text-effect {
    width: 300px;
    height: 200px;
}
```

## Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| `text`    | The text to display with the glitch effect | "Click Me" |

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fault Text Effect Example</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #000;
            font-family: Arial, sans-serif;
        }
        
        fault-text-effect {
            width: 100%;
            height: 100vh;
        }
    </style>
    <script src="fault-text-effect.js"></script>
</head>
<body>
    <fault-text-effect text="Glitch Me"></fault-text-effect>
</body>
</html>
```

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers. 