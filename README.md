This is a simple to-do React application which uses [FaunaDB](https://fauna.com/) as its persistence layer.

## Configuration and Setup

To configure FaunaDB to work in your local environment, create a file called `.env.local` in the root directory and add your generated secret key there:

```
REACT_APP_FAUNA_SECRET=fnADyQXd2UACE-AeaTHns0X-hYNf3HY6jTje-tjL
```

Then start your app with `yarn start` and open [http://localhost:3000](http://localhost:3000).
