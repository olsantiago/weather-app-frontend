# Weather app frontend

This is the home for the weather app client side

## Yarn Workspaces

The top level `package.json` is a simple file primarily telling `yarn` to run the project

### Install packages
```sh
yarn install
```

### How to Run
```sh
yarn dev
```

### Build Production
```sh
yarn build
```

### Linter
```sh
yarn lint
```
### Notes
---------------
- any location that is available from [openweather](https://openweathermap.org/) will work
- US locations are the only auto suggested
- Current location will only work if location is allowed in browser

