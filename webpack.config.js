const path = require('path')

module.exports = {
    mode: 'development',
    entry: './test/index.js',
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist/static/',
        chunkFilename:"[name].d.js"
    },
    module: {
        rules: [
            // {
            //     test: /.js$/,
            //     loader: require.resolve("bable-loader")
            // },
            {
                test: /extract\.js$/ig,
                loader: require.resolve('./src/cjs'),
                options: {
                    name: '[hash].666.js',
                    publicPath: "/static/"
                }
            }
        ]
    }
}
