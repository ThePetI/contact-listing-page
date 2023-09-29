module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "/assets/unresolved/img.png": path.resolve(
        __dirname,
        "assets/real-path-to-img/img.png"
      ),
    },
  },
};
