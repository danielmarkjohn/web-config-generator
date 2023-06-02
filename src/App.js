import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  category: {
    marginBottom: theme.spacing(5)
  },
  select: {
    marginRight: theme.spacing(5)
  },
  button: {
    marginTop: theme.spacing(5)
  }
}));

const ConfigGenerator = () => {
  const classes = useStyles();

  const [rollupConfig, setRollupConfig] = useState("");
  const [tsConfig, setTsConfig] = useState("");
  const [npmrcConfig, setNpmrcConfig] = useState("");
  const [webpackConfig, setWebpackConfig] = useState("");
  const [rollupSubcategory, setRollupSubcategory] = useState("");
  const [tsConfigSubcategory, setTsConfigSubcategory] = useState("");
  const [npmrcSubcategory, setNpmrcSubcategory] = useState("");
  const [webpackSubcategory, setWebpackSubcategory] = useState("");

  const generateRollupConfig = () => {
    let config = "";

    // Generate Rollup config based on subcategory selection
    if (rollupSubcategory === "esModules") {
      config = `
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};`;
    } else if (rollupSubcategory === "commonJS") {
      config = `
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};`;
    } else if (rollupSubcategory === "umd") {
      config = `
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'MyLibrary',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};`;
    } else if (rollupSubcategory === "iife") {
      config = `
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyLibrary',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};`;
    }

    setRollupConfig(config);
  };

  const generateTsConfig = () => {
    let config = "";

    // Generate tsconfig based on subcategory selection
    if (tsConfigSubcategory === "es6") {
      config = `
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": [
    "src"
  ]
}`;
    } else if (tsConfigSubcategory === "es5") {
      config = `
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": [
    "src"
  ]
}`;
    } else if (tsConfigSubcategory === "node") {
      config = `
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": [
    "src"
  ]
}`;
    } else if (tsConfigSubcategory === "browser") {
      config = `
{
  "compilerOptions": {
    "target": "es5",
    "module": "es6",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": [
    "src"
  ]
}`;
    }

    setTsConfig(config);
  };

  const generateNpmrcConfig = () => {
    let config = "";

    // Generate .npmrc config based on subcategory selection
    if (npmrcSubcategory === "publicRegistry") {
      config = `
registry=https://registry.npmjs.org/`;
    } else if (npmrcSubcategory === "privateRegistry") {
      config = `
registry=https://your-private-registry-url/`;
    } else if (npmrcSubcategory === "scopedPackages") {
      config = `
@your-scope:registry=https://registry.npmjs.org/`;
    } else if (npmrcSubcategory === "registryMirror") {
      config = `
registry=https://registry.npm.taobao.org/`;
    }

    setNpmrcConfig(config);
  };

  const generateWebpackConfig = () => {
    let config = "";

    // Generate webpack config based on subcategory selection
    if (webpackSubcategory === "babel") {
      config = `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
};`;
    } else if (webpackSubcategory === "sass") {
      config = `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
};`;
    } else if (webpackSubcategory === "imageOptimization") {
      config = `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
};`;
    }

    setWebpackConfig(config);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography className={"typography"} variant="h2">
        Web Config Generator
      </Typography>

      <div className={classes.category}>
        <Typography className={"typography"} variant="h5">
          Rollup Config Generator
        </Typography>
        <Select
          value={rollupSubcategory}
          onChange={(e) => setRollupSubcategory(e.target.value)}
          className={classes.select}
        >
          <option value="">Select Subcategory</option>
          <option value="esModules">ES Modules</option>
          <option value="commonJS">CommonJS</option>
          <option value="umd">UMD</option>
          <option value="iife">IIFE</option>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={generateRollupConfig}
        >
          Generate Config
        </Button>
        {rollupConfig && (
          <SyntaxHighlighter
            language="javascript"
            style={darcula}
            className={classes.code}
          >
            {rollupConfig}
          </SyntaxHighlighter>
        )}
      </div>
      <div className={classes.category}>
        <Typography className={"typography"} variant="h5">
          tsconfig Generator
        </Typography>
        <Select
          value={tsConfigSubcategory}
          onChange={(e) => setTsConfigSubcategory(e.target.value)}
          className={classes.select}
        >
          <option value="">Select Subcategory</option>
          <option value="es6">ES6</option>
          <option value="es5">ES5</option>
          <option value="node">Node.js</option>
          <option value="browser">Browser</option>
        </Select>
        <Button variant="contained" color="primary" onClick={generateTsConfig}>
          Generate Config
        </Button>
        {tsConfig && (
          <SyntaxHighlighter
            language="json"
            style={darcula}
            className={classes.code}
          >
            {tsConfig}
          </SyntaxHighlighter>
        )}
      </div>
      <div className={classes.category}>
        <Typography className={"typography"} variant="h5">
          .npmrc Generator
        </Typography>
        <Select
          value={npmrcSubcategory}
          onChange={(e) => setNpmrcSubcategory(e.target.value)}
          className={classes.select}
        >
          <option value="">Select Subcategory</option>
          <option value="publicRegistry">Public Registry</option>
          <option value="privateRegistry">Private Registry</option>
          <option value="scopedPackages">Scoped Packages</option>
          <option value="registryMirror">Registry Mirror</option>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={generateNpmrcConfig}
        >
          Generate Config
        </Button>
        {npmrcConfig && (
          <SyntaxHighlighter
            language="plaintext"
            style={darcula}
            className={classes.code}
          >
            {npmrcConfig}
          </SyntaxHighlighter>
        )}
      </div>
      <div className={classes.category}>
        <Typography className={"typography"} variant="h5">
          Webpack Config Generator
        </Typography>
        <Select
          value={webpackSubcategory}
          onChange={(e) => setWebpackSubcategory(e.target.value)}
          className={classes.select}
        >
          <option value="">Select Subcategory</option>
          <option value="babel">Babel</option>
          <option value="sass">Sass</option>
          <option value="imageOptimization">Image Optimization</option>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={generateWebpackConfig}
        >
          Generate Config
        </Button>
        {webpackConfig && (
          <SyntaxHighlighter
            language="javascript"
            style={darcula}
            className={classes.code}
          >
            {webpackConfig}
          </SyntaxHighlighter>
        )}
      </div>
    </Container>
  );
};

export default ConfigGenerator;
