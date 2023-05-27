const path = require(`path`);

console.log("ASAAAA");

module.exports = {
  resolve: {
    extensions: ["ts", "tsx", "js", "jsx"],
    alias: {
      "@/*": path.resolve(__dirname, "src/*"),
    },
  },
};
