module.exports = {
  '{src,apps,libs,test}/**/*.ts': (filenames) => [
    `tsc --noEmit`,
    `eslint --fix ${filenames.map((filename) => `"${filename}"`).join(' ')}`,
    `prettier --write ${filenames
      .map((filename) => `"${filename}"`)
      .join(' ')}`,
  ],
  '{src,apps,libs,test}/**/*.(json|md|ejs)': (filenames) =>
    `prettier --write ${filenames
      .map((filename) => `"${filename}"`)
      .join(' ')}`,
  'package.json': ['npx -y sort-package-json'],
};
