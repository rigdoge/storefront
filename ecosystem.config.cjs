module.exports = {
  apps: [{
    name: "storefront",
    script: "pnpm",
    args: "start",
    interpreter: "none",
    env: {
      NODE_ENV: "production",
    }
  }]
}
