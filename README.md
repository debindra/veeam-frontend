# Frontend

See Nuxt js for more info

> UI frontend

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

Install pm2 and use the ecosysmte.config.js to start pm2 with this configuration.
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Coding Guideline

    1. Put all components in components folder
    2. The component related to layout will all go to component folder inside layout folder
    3. The SFC component defined inside pages directory should be lowercase
    4. All the SFC component defined inside pages directory should be PascalCase
    5. Always use kebab-case while using component
    6. Component names should prefer full words over abbreviations.
    7. Reusable function should be always moved to uitls folder section
    8. Always define apiURL as constant. (API URL INSIDE of store/constants.js)

## VS Code extensions

    code --install-extension 2gua.rainbow-brackets
    code --install-extension christian-kohler.npm-intellisense
    code --install-extension CoenraadS.bracket-pair-colorizer
    code --install-extension eamodio.gitlens
    code --install-extension esbenp.prettier-vscode
    code --install-extension octref.vetur
    code --install-extension sdras.night-owl
    code --install-extension sdras.vue-vscode-extensionpack
    code --install-extension sdras.vue-vscode-snippets

## Branch Guide

    Master branch should always contain the stable release of the project

    Apply [feature, bugfix] prefixes accordingly on every branch.
    1. feature/task-name for feature
    2. bugfix/task-title for bug fix
