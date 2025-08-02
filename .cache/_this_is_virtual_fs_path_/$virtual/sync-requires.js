
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-affirmation-demo-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/affirmation-demo.js")),
  "component---src-pages-cosmic-tab-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/cosmic-tab.js")),
  "component---src-pages-demos-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/demos.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/index.js")),
  "component---src-pages-roadmap-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/roadmap.js")),
  "component---src-pages-settings-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/settings.js")),
  "component---src-pages-themes-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/themes.js")),
  "component---src-pages-upgrade-js": preferDefault(require("/Users/jessehenson/Desktop/Projects/alyssa-extension/src/pages/upgrade.js"))
}

