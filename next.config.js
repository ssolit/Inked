/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
}
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true }
});