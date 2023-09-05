var path = require("path");

module.exports = {
  entry: "./src/sankey.js",
  output: {
    filename: "main_bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "thread-loader"],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
};
