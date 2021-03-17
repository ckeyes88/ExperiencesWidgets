import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import scss from "rollup-plugin-scss";
import typescript from "rollup-plugin-typescript3";
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from "rollup-plugin-json";
import dotenv from "dotenv";
import alias from '@rollup/plugin-alias';
import copy from "rollup-plugin-copy";
import scssSmartAsset from 'rollup-plugin-scss-smart-asset';

dotenv.config();

export default [
  {
    input: "src/widgets.ts",
    output: {
      file: "./dist/widgets.js",
      format: "iife",
      name: "widgetsMain",
    },
    treeshake: true,
    plugins: [
      replace({
        __NODE_ENV__: process.env.NODE_ENV,
        __ENV_NAME__: process.env.ENV_NAME,
        __BASE_URL__: process.env.BASE_WIDGET_URL
      }),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      typescript(),
      nodeResolve({browser: true, preferBuiltins: true}),
      json(),

      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
    ],
  },
  {
    input: 'src/expAppListView/index.tsx',
    output: {
      file: "./dist/expAppListView.js",
      format: 'iife',
      name: 'expAppListView',
    },
    treeshake: true,
    plugins: [
      replace({
        'process.env.NODE_ENV': process.env.NODE_ENV,
        __ENV_NAME__: process.env.ENV_NAME,
        __BASE_URL__: process.env.BASE_WIDGET_URL
      }),
      scss(),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      typescript(),
      nodeResolve({browser: true, preferBuiltins: true}),
      json(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
    ],
  },
  {
    input: 'src/calendarBookingForm/index.tsx',
    output: {
      file: "./dist/calendarBookingForm.js",
      format: 'iife',
      name: 'calendarBookingForm',
    },
    treeshake: true,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __ENV_NAME__: process.env.ENV_NAME,
        __BASE_URL__: process.env.BASE_WIDGET_URL
      }),
      scss(),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      typescript(),
      nodeResolve({browser: true, preferBuiltins: true}),
      json(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
    ],
  },
  {
    input: 'src/aggregateView/index.tsx',
    output: {
      file: "./dist/aggregateView.js",
      format: 'iife',
      name: 'aggregateView',
    },
    treeshake: true,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __ENV_NAME__: process.env.ENV_NAME,
        __BASE_URL__: process.env.BASE_WIDGET_URL
      }),
      scss(),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      typescript(),
      alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom', replacement: 'preact/compat' }
        ]
      }),
      nodeResolve({browser: true, preferBuiltins: true}),
      json(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
      copy({
        targets: [
          { src: 'src/assets/**/*', dest: 'dist/assets' }
        ],
      })
    ],
  },
  {
    input: 'src/fullPageBookingForm/index.ts',
    output: {
      file: "./dist/fullPageBookingForm.js",
      format: 'iife',
      name: 'fullPageBookingForm',
    },
    treeshake: true,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __ENV_NAME__: process.env.ENV_NAME,
        __BASE_URL__: process.env.BASE_WIDGET_URL
      }),
      scssSmartAsset({
        output: true,
        postcssUrlConfig: {
          url: "inline"
        }
      }),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      typescript(),
      alias({
        entries: [
          { find: 'react', replacement: 'preact/compat' },
          { find: 'react-dom', replacement: 'preact/compat' }
        ]
      }),
      nodeResolve({browser: true, preferBuiltins: true}),
      json(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
      
    ],
  },
];