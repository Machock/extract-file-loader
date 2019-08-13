// const loader = require('./index');

// module.exports = loader.default;
// module.exports.pitch = loader.pitch

/*
 * @Author: Machock
 * @Date: 2019-08-03 16:33:57
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-13 20:14:19
 */

const validateOptions = require("schema-utils");
const schema = require("./options.json");

const SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin");

const pluginName = "extract-file-loader";
module.exports = function() {};
module.exports.pitch = function pitch(request) {
    const options = this.query || {};
    const cb = this.async();
    this.cacheable(false);
    // validation schema
    validateOptions(schema, options, {
        name: "Extract file Loader",
        baseDataPath: "options"
    });
    let publicPath = options.publicPath || "";
    publicPath = publicPath.endsWith("/") ? publicPath : `${publicPath}/`
    // publicPath = JSON.stringify(publicPath);
    console.log("publicPath",publicPath)
    const outputOptions = {
        filename: options.name,
        publicPath: publicPath
    };

    const childCompiler = this._compilation.createChildCompiler(
        `${pluginName} ${request}`,
        outputOptions
    );

    new SingleEntryPlugin(this.context, `!!${request}`, pluginName).apply(
        childCompiler
    );

    childCompiler.runAsChild((err, entries, compilation) => {
        if (err) return cb(err);
        const file = entries[0].files[0];
        // const source = `${publicPath}${JSON.stringify(file)}`;
        delete compilation.assets[file];
        cb(null, JSON.stringify(publicPath+file));
    });
};
