module.exports = {
    cache: true,
    entry: "./app/index.jsx",
    output: {
        path: __dirname + "/static/js",
        filename: "build.js"
    },
    plugins: [],
    module: {
        loaders: [
            // { test: /\.css/, loader: "style-loader!css-loader" },
            // { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
            // { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
            // { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },

            // { test: /\.js$/, loader: "jsx-loader" },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }

        ]
    }
};
