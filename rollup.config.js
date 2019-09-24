import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import scss from "rollup-plugin-scss";
import typescript from "rollup-plugin-typescript3";
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from "rollup-plugin-json";
import {
  uglify
} from 'rollup-plugin-uglify';

export default [{
    input: "src/widgets.ts",
    output: {
      file: "./dist/widgets.js",
      format: "iife",
      name: "widgetsMain",
    },
    treeshake: true,
    plugins: [
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      nodeResolve({
        extensions: ['.ts'],
      }),
      json(),
      typescript(),

      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
      uglify({
        sourcemap: true
      }),
    ],
  },
  {
    input: 'src/expappListView/index.tsx',
    output: {
      file: "./dist/expappListView.js",
      format: 'iife',
      name: 'expappListView',
    },
    treeshake: true,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      scss(),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      nodeResolve({
        extensions: ['.ts', '.tsx'],
      }),
      json(),
      typescript(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
      uglify({
        sourcemap: true
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
      }),
      scss(),
      babel({
        exclude: [
          'node_modules/!(' +
          'google-map-react|preact|preact-compat|react-redux' +
          ')/**',
        ]
      }),
      nodeResolve({
        extensions: ['.ts', '.tsx'],
      }),
      json(),
      typescript(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
        },
      }),
      uglify({
        sourcemap: true
      }),
    ],
  }
];