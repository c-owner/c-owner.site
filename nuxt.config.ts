import * as fs from "fs";
import path from "path";

console.log(process.env.NODE_ENV === 'development');
console.log(process.env.NODE_ENV);

const ssl_key_path = process.env.SSL_KEY_PATH ? process.env.SSL_KEY_PATH : "cert/server.key";
const ssl_cert_path = process.env.SSL_CERT_PATH ? process.env.SSL_CERT_PATH : "cert/server_crt.pem";

export default defineNuxtConfig({
    // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/
    // As of RC12 Nuxt 3 supports Hybrid rendering mode
    // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
    // routeRules: {
    //     "/pages/**": { ssr: true }
    // },
    hooks: {
    },

    css: [
        "@/assets/styles/tailwind.css",
        "@/assets/styles/index.scss",
        "@/assets/styles/global.scss"
    ],

    plugins: [
        "@/plugins/dayjs.ts",
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
        classSuffix: "",
        storageKey: "nuxt-color-mode"
    },
    content: {
        highlight: {
            theme: "github-dark",
            preload: [
                "vue"
            ]
        },
        navigation: {
            fields: ["author", "subject", "position"]
        }
    },

    runtimeConfig: {
        public: {
            DATABASE_URL: process.env.DATABASE_URL ? process.env.DATABASE_URL : "mysql://admin:Rodtmxj.123@develop-corner.com:3306/corner",
        },
        https: {
            key: fs.readFileSync(path.resolve(__dirname, ssl_key_path), "utf-8"),
            cert: fs.readFileSync(path.resolve(__dirname, ssl_cert_path), "utf-8")
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
        },
        server: {
            https: {
                key: fs.readFileSync(path.resolve(__dirname, ssl_key_path), "utf-8"),
                cert: fs.readFileSync(path.resolve(__dirname, ssl_cert_path), "utf-8")
            }
        }
    },

    experimental: {
        writeEarlyHints: false
    },

    //   Currently still needed
    build: {
        transpile: ["@headlessui/vue"]
    }
});
