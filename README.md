A simple app that uses Open AQ Air Quality API to allow you to compare the quality of the air across cities in the UK.

## Prerequisites

Before you run the app you will need to make sure that you have the following installed on your machine:

* [Node Js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/)

## Running the app locally


The app uses a simple GraphQL server as a backend service that will call the AQ Air API. You can find the repo [here](https://github.com/VelizarMihaylov/apollo-server-koa-starter). To get the GraphQL server locally you will need Docker. Once you have the docker client running you can either do:

```bash
docker compose up
```
Or simply use the `make` command

```bash
make up
```

Both of those commands will start a docker image that will run the GraphQL server on port `4444` If this port is not available on your machine feel free to modify the ports property in the  docker-compose.yml file in the root folder.

Once you the docker image is up and running try hitting `http://localhost:4444/graphql` you should see the GraphQL playground.

After you get the GraphQL server running install the dependencies:

```bash
yarn
```

And start the app:

```bash
yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test:unit`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:integration`

Starts the integration test that will user puppeteer to run the app in headless mode against a mocked endpoint and will use [jest image snapshot](https://github.com/americanexpress/jest-image-snapshot) to make screenshots and flags any style differences

### `yarn test:integration`

Starts the end to end tests. This command will use puppeteer to run the app against the actual backend service and test that the page is loading fine.

### `yarn test`

Runs the unit, integration and end to end test in sequence. Useful for CI/CD.


### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

A shorthand command that will run the tests and will build the project. A useful command if we want to deploy the app to JAM stack hosts such as Netlify.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### `yarn storybook`

Starts storybook on port 6066


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
