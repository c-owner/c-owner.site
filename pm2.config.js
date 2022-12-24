module.exports = {
    apps : [{
        name   : "Nuxt SSR",
        script : "npm",
        args: "start",
        env_production: {
            PORT: 443,
            NODE_ENV: "production"
        }
    }]
}
