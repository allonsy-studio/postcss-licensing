import { defineConfig } from "eslint/config";
import globals from "globals";

import jsonc from "eslint-plugin-jsonc";
import js from "@allons-y/opx-lint-js/eslint.config.js";
import json from "@allons-y/opx-lint-json/eslint.config.js";
import md from "@allons-y/opx-lint-md/eslint.config.js";

export default defineConfig([
	...js,
	// package.json is linted by the jsonc block below instead.
	...json.map((config) => (config.files ? { ...config, ignores: [...(config.ignores ?? []), "**/package.json"] } : config)),
	...md,
	{
		ignores: ["**/.cache/**", "docs/_site/**", "docs/_a11y/**"],
	},
	{
		files: ["**/*.js"],
		rules: {
			eqeqeq: ["error", "smart"],
			"no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrors: "none",
					ignoreRestSiblings: true,
				},
			],
			// Logs should be written through @actions/core & fails via
			// core.setFailed — never the raw console or a hard process exit.
			"no-console": "error",
			"no-process-exit": "error",
			// Don't let unfinished markers ride along into a published action.
			"no-warning-comments": [
				"warn",
				{ terms: ["todo", "fixme", "xxx"], location: "anywhere" },
			],
		},
	},
	{
		files: ["docs/cypress/**/*.js"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.mocha,
				cy: "readonly",
				Cypress: "readonly",
			},
		},
	},
	{
		files: ["docs/cypress.config.js"],
		rules: { "no-console": "off" },
	},
	{
		files: ["**/*.json"],
		ignores: ["**/package.json"],
		rules: {
			"json/sort-keys": [
				"warn",
				"asc",
				{
					natural: true,
				},
			],
		},
	},
	{
		files: ["package.json"],
		plugins: { jsonc },
		language: "jsonc/jsonc",
		extends: ["jsonc/recommended-with-json"],
		rules: {
			"jsonc/sort-keys": [
				"warn",
				{
					pathPattern: "^$",
					order: [
						"$schema",
						"private",
						"publishConfig",
						"name",
						"version",
						"description",
						"license",
						"author",
						"maintainers",
						"contributors",
						"homepage",
						"funding",
						"repository",
						"bugs",
						"type",
						"exports",
						"main",
						"module",
						"browser",
						"man",
						"preferGlobal",
						"bin",
						"files",
						"directories",
						"scripts",
						"config",
						"sideEffects",
						"types",
						"typings",
						"workspaces",
						"resolutions",
						"dependencies",
						"bundleDependencies",
						"bundledDependencies",
						"peerDependencies",
						"peerDependenciesMeta",
						"optionalDependencies",
						"devDependencies",
						"keywords",
						"engines",
						"engineStrict",
						"os",
						"cpu",
						"*",
						"packageManager",
					],
				},
				{ pathPattern: "^repository$", order: ["type", "url", "directory"] },
				{ pathPattern: "^vague$", order: { type: "asc" } },
				{ pathPattern: "^exports$", order: ["."] },
				{ pathPattern: ".*", order: { type: "asc" } },
			],
		},
	},
	{
		files: ["**/*.md"],
		language: "markdown/gfm",
	},
]);
