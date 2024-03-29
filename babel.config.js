module.exports = function (api) {
  return {
    plugins: ['macros'],
  };
};

module.exports = {
  // Required
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  plugins: [['babel-plugin-typescript-to-proptypes', {comments: true}]],
};
