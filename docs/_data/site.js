// Site facts, resolved from package.json when the scaffold ran: edit them here.

import project from "./project.json" with { type: "json" };

export default {
	name: "postcss-licensing",
	packageName: "@allons-y/postcss-licensing",
	tagline: project.tagline ?? "Prepends licensing information to CSS files",
	description: "Prepends licensing information to CSS files.",
	studio: true,
	license: "MPL-2.0",
	licenseUrl: "https://github.com/allonsy-studio/postcss-licensing/blob/main/LICENSE",
	repo: "https://github.com/allonsy-studio/postcss-licensing",
	repoName: "postcss-licensing",
	npm: "https://www.npmjs.com/package/@allons-y/postcss-licensing",
	node: "24+",
	url: (project.url ?? "https://projects.allons-y.studio/postcss-licensing/").replace(/\/?$/, "/"),
	issuesUrl: "https://github.com/allonsy-studio/postcss-licensing/issues",
	contributingUrl: "https://github.com/allonsy-studio/postcss-licensing/blob/main/.github/CONTRIBUTING.md",
	changelogUrl: "https://github.com/allonsy-studio/postcss-licensing/blob/main/CHANGELOG.md",
};
