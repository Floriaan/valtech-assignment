# Valtech-assignment

The goal of this assignment is to build a VueJs application where me as a candidate will present my knowledge and experiences with VueJs application structure, JavaScript language and its ecosystem.

## Description

This project is built with VueJs 3 SFC(Single File Component), composition api and TypeScript. It also uses the latest libraries such as: VUEX for centralizing data, Vue-Router for client side navigation, moment.js for formatting dates, masonry.js for the dashboard grid layout, UUID for assigning unique ids, SASS for a better styling experience, ESLint/Prettier for code consistency/formatting and vue-click-away for dropdowns.

Since there was no services provided for authentication/authorization, the dummy token is stored in the browser local storage. Also, the albums/images are stored in the VUEX store and remain only in runtime.

## Note

If you are using Vetur/Volar and you get a problem message like this: "Module "...." has no default export", this is because Vetur/Volar doesn't yet support SFC (Regarding to the forums).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
