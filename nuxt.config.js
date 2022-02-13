require("dotenv").config();
import { postTransformNode } from "./plugins/transform.js";
const Config = require("webpack-chain");

export default {
  ssr: false,
  server: {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST
  },
  head: {
    titleTemplate: `%s | BAAS System`,
    // title: process.env.npm_package_name || '',
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://use.typekit.net/oov2wcw.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#31aa00"
  },
  /*
   ** Global CSS
   */
  css: [
    "ant-design-vue/dist/antd.css",
    "~/assets/css/transition.css",
    "~/assets/css/master.scss"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/antd-ui",
    "@/plugins/vue-gates",
    "@/plugins/axios",
    "@/plugins/api",
    "@/plugins/v-idle",

  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [["@nuxtjs/dotenv", {}]],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/auth",
    "@nuxtjs/axios",

    "@/plugins/transform",
    "@nuxtjs/moment"
  ],
  auth: {
    plugins: ["~/plugins/auth.js"],
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/v1/auth/login",
            method: "post",
            propertyName: "access_token"
          },
          logout: {
            url: "/v1/auth/logout",
            method: "get"
          },
          user: {
            url: "/v1/users/me",
            method: "get",
            propertyName: "data"
          }
        }
      }
    }
  },

  axios: {
    baseURL: process.env.baseURL
  },
  proxy: {},
  router: {
    middleware: ["auth"]
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vue-echarts", "resize-detector"],
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "ant-design-vue",
            style: "css"
          }
        ]
      ]
    },
    extend(config, ctx) {
      let mainOption = config.module.rules.find(
        rule => rule.loader === "vue-loader"
      ).options;
      const chainedConfig = new Config();
      chainedConfig.module
        .rule("vue")
        .use("vue-loader")
        .tap(options => {
          return {
            ...mainOption,
            modules: postTransformNode
          };
        });
      // console.log('Final COnfig is ', JSON.stringify(chainedConfig.toConfig()))
      // console.log("Chained config",chainedConfig);
    }
  },
  loadingIndicator: {
    name: "~/assets/build_loader.html",
    color: "#000",
    background: "#fff"
  }
};
