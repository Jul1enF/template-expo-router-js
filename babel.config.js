// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       [
//         'module-resolver',
//         {
//           alias: {
//             styles : './styles',
//             components: './components',
//             utils : './utils',
//             hooks : './hooks',
//             reducers : './reducers',
//           },
//         },
//       ],
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ["./"],
          alias: {
            styles: "./styles",
            components: "./components",
            utils: "./utils",
            hooks: "./hooks",
            reducers: "./reducers",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
