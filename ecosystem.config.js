module.exports = {
  apps: [
    {
      name: "FAT_ADMIN",
      script: "serve",
      args: "./build",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        LOG_LEVEL: "info",
        PORT: 8080
      },
      env_production: {
        NODE_ENV: "production",
        LOG_LEVEL: "debug",
        PORT: 8080
      }
    }
  ],
  deploy: {
    production: {
      user: "deploy",
      host: process.env.HOST,
      ref: "origin/master",
      repo: process.env.REPO,
      path: "/home/deploy/production_fat_admin",
      "post-deploy": "yarn --silent && yarn build --env production"
    }
  }
};
