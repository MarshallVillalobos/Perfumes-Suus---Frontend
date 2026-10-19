const fs = require('fs');
const posiblesNavegadores = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

if (!process.env.CHROME_BIN) {
  const navegadorEncontrado = posiblesNavegadores.find((ruta) =>
    fs.existsSync(ruta)
  );
  if (navegadorEncontrado) {
    process.env.CHROME_BIN = navegadorEncontrado;
  }
}

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            resolve: {
              fullySpecified: false,
            },
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|jpeg|gif|svg|webp)$/, type: 'asset/resource' },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};