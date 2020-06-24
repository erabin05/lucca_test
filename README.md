# Lucca

Test project for Lucca.


To use add a **proxy.conf.json** file in the root folder  : 
```
// proxy.conf.json
{
  "/api/*": {
    "target": "https://mobile.ilucca-dev.net",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "headers": {"Authorization": "Bearer {TOKEN}"}
  }
}
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.
