# flipper-ui

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

## docker

Build it with

```
docker build --pull --rm --build-arg VUE_APP_API_URL=http://flipper.example.com/api -t flipperui:latest .
```

Run it with

```
docker run --name flipperui -p 8080:8080 flipperui
```
