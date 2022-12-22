export default defineNuxtConfig({
    // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/
    // As of RC12 Nuxt 3 supports Hybrid rendering mode
    // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
    // routeRules: {
    //     "/pages/**": { ssr: true }
    // },

    css: [
        "@/assets/styles/tailwind.css",
        "@/assets/styles/index.scss"
    ],

    plugins: [
        "@/plugins/error.ts"
    ],

    modules: [
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "@nuxt/content",
        "nuxt-icon"
        // https://pinia.esm.dev
    ],
    tailwindcss: {
        cssPath: "@/assets/styles/tailwind.css",
        configPath: "tailwind.config.js",
        exposeConfig: false,
        injectPosition: 0,
        viewer: true
    },

    colorMode: {
        preference: "system", // default value of $colorMode.preference
        fallback: "light", // fallback value if not system preference found
        hid: "nuxt-color-mode-script",
        globalName: "__NUXT_COLOR_MODE__",
        componentName: "ColorScheme",
        classPrefix: "",
        classSuffix: "-mode",
        storageKey: "nuxt-color-mode"
    },


    runtimeConfig: {
        public: {
            DATABASE_URL: process.env.production ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV,
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

    vite: {
        optimizeDeps: {
            include: [
                "@headlessui/vue"
            ]
        }
    },

    experimental: {
        writeEarlyHints: false
    },

    //   Currently still needed
    build: {
        transpile: ["@headlessui/vue"],
    }
});
