import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // Add this for React Hooks

export default [
  // Base JavaScript rules
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    ...js.configs.recommended, // Spread the recommended JS rules
  },
  // React-specific configuration
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks, // Add React Hooks plugin
    },
    settings: {
      react: {
        version: "19.0", // Specify React 19
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // Spread React recommended rules
      ...pluginReactHooks.configs.recommended.rules, // Spread React Hooks recommended rules
      "react/react-in-jsx-scope": "off", // Disable this rule for React 19
      "react/prop-types": "off", // Optional: Disable prop-types if you don't use it
      "no-unused-vars" : "warm"
    },
  },
];






// import js from "@eslint/js";
// import globals from "globals";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
//   {
//   "settings": {
//     "react": {
//       "version": "19.0"
//     }
//   },
//   "rules": {
//     "react/react-in-jsx-scope": "off"
//   }
// },
//   pluginReact.configs.flat.recommended,
// ]);
