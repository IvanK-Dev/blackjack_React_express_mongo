const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входа приложения
  output: {
    filename: 'bundle.[contenthash].js', // Название выходного файла с хэшем содержимого для кэширования
    path: path.resolve(__dirname, '../server/public'), // Путь к выходной директории
    publicPath: '/', // Публичный путь, используемый для определения корня приложения на сервере
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Разделение общих зависимостей в отдельные чанки
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Применять правила только к файлам .js и .jsx
        exclude: /node_modules/, // Исключить файлы в папке node_modules
        use: {
          loader: 'babel-loader', // Использовать Babel для транспиляции JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Использовать пресеты @babel/preset-env и @babel/preset-react
          },
        },
      },
      {
        test: /\.css$/, // Применять правила только к файлам .css
        use: ['style-loader', 'css-loader'], // Использовать style-loader и css-loader для обработки стилей
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Применять правила только к файлам изображений
        use: [
          {
            loader: 'file-loader', // Использовать file-loader для обработки изображений
            options: {
              name: '[name].[hash].[ext]', // Формат имен файлов с хэшем содержимого
              outputPath: 'images', // Путь к выходной директории для изображений
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Разрешенные расширения файлов при импортах
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Путь к вашему HTML-шаблону
      filename: 'index.html', // Название выходного HTML файла
    }),
    new CleanWebpackPlugin(), // Очистка выходной директории перед каждой сборкой
    new webpack.ProvidePlugin({
      React: 'react',// Предоставление глобальной переменной React
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public/assets/img/deck', to: 'assets/img/deck' }],// Копирование изображений из './public/assets/img/deck' в 'assets/img/deck'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '../server/public'), // Путь к статическим файлам для dev-сервера
    },
    port: 3000, // Порт dev-сервера
    open: true, // Автоматическое открытие браузера при старте dev-сервера
    historyApiFallback: true, // Обработка истории для поддержки роутинга в SPA
  },
};
