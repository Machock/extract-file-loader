# extract-file-loader

## Usage

```javascript
{
    test: /extract\.js$/ig,
    loader: require.resolve('./src/cjs'),
    options: {
        name: '[hash].666.js',
        publicPath: "/static/"
    }
}
```
