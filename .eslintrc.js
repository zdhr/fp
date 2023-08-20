module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"jsx": true
		},
		"project": "tsconfig.json",
		"sourceType": "module"
	},
	"extends": [
		"plugin:react-hooks/recommended"
	],
	"plugins": [
		"@typescript-eslint",
		"react-hooks",
		"react"
	],
	"rules": {
		"react/button-has-type": "error",
		"react/jsx-key": ["warn", {
			"checkFragmentShorthand": true
		}],
		"react/no-unescaped-entities": "warn",
		"react/self-closing-comp": ["error", {
			"component": true,
			"html": true
		}],
		"@typescript-eslint/adjacent-overload-signatures": "warn",
		"@typescript-eslint/ban-types": "warn",
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/indent": [
			"warn",
			"tab"
		],
		"@typescript-eslint/no-empty-function": "warn",
		"@typescript-eslint/no-inferrable-types": [
			"error",
			{
				"ignoreProperties": true,
				"ignoreParameters": true
			}
		],
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-this-alias": [
			"error",
			{
				"allowDestructuring": true,
			}
		],
		"@typescript-eslint/quotes": [
			"error",
			"single",
			{
				"avoidEscape": true,
				"allowTemplateLiterals": true
			}
		],
		"@typescript-eslint/semi": [
			"error",
			"never"
		],
		"@typescript-eslint/type-annotation-spacing": "error",
		"array-callback-return": "warn",
		"arrow-parens": [
			"error",
			"always"
		],
		"comma-dangle": [
			"warn",
			{
				"arrays": "always-multiline",
				"objects": "always-multiline",
				"imports": "always-multiline",
				"exports": "always-multiline",
				"functions": "only-multiline"
			}
		],
		"complexity": [
			"error",
			{
				"max": 50
			}
		],
		"constructor-super": "error",
		"curly": "error",
		"default-case": "error",
		// disable the base rule as it can report incorrect errors
		"dot-notation": "off",
		"@typescript-eslint/dot-notation": ["error"],
		"eol-last": "error",
		"eqeqeq": [
			"error",
			"smart"
		],
		"guard-for-in": "error",
		"jsx-quotes": ["error", "prefer-double"],
		"linebreak-style": [
			"error",
			"unix"
		],
		"new-parens": "error",
		"no-bitwise": "error",
		"no-cond-assign": "error",
		"no-console": [
			"warn",
			{
				"allow": [
					"warn",
					"dir",
					"time",
					"timeEnd",
					"timeLog",
					"trace",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupEnd",
					"table",
					"debug",
					"info",
					"dirxml",
					"error",
					"groupCollapsed",
					"Console",
					"profile",
					"profileEnd",
					"timeStamp",
					"context"
				]
			}
		],
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-fallthrough": "error",
		"no-irregular-whitespace": "error",
		"no-new-wrappers": "error",
		"no-param-reassign": "error",
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "error",
		"no-unused-expressions": [
			"warn",
			{
				"allowShortCircuit": true,
				"allowTernary": true
			}
		],
		"no-var": "error",
		"operator-linebreak": [
			"warn",
			"after"
		],
		"padding-line-between-statements": [
			"error",
			{
				"blankLine": "always",
				"prev": "*",
				"next": "return"
			}
		],
		"prefer-const": "error",
		"prefer-object-spread": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react-hooks/rules-of-hooks": "error",
		"react/jsx-boolean-value": ["error", "always"],
		"space-before-function-paren": [
			"error",
			"never"
		],
		"use-isnan": "error",
	},
	"settings": {
		"react": {
			"version": 'detect',
		},
	},
};
