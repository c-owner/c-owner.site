export default defineNuxtConfig({
    // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/
    app: {
        head: {
            charset: "utf8",
            viewport: "width=500, initial-scale=1",
            title: "www.n-todo.com",
            meta: [
                { name: "description", content: "n-todo" }
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/img/logo_clear_fsj.png" }
            ],
            script: []
        }

    },
    // As of RC12 Nuxt 3 supports Hybrid rendering mode
    // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
    // routeRules: {
    //     "/pages/**": { ssr: true }
    // },

    css: [

    ],
    //     "@/assets/styles/tailwind.css"

    modules: [
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "@nuxt/content",
        // https://pinia.esm.dev
    ],
    tailwindcss: {
        cssPath: "@/assets/styles/tailwind.css",
        configPath: "tailwind.config.js",
        exposeConfig: false,
        injectPosition: 0,
        viewer: true
    },


    runtimeConfig: {
        public: {
            directusUrl: process.env.DIRECTUS_URL
        }
    },

    postcss: {
        plugins: {
            "postcss-import": {},
            "tailwindcss/nesting": {},
            "tailwindcss": {},
            "autoprefixer": {}
        }
    },

    experimental: {
        writeEarlyHints: false
    },

    //   Currently still needed
    build: {}
});
