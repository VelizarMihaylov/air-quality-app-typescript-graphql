A simple app that uses Open AQ Air Quality API to allow you to compare the quality of the air across cities in the UK.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
Or simply use the `make up` command set in the `Makefile` in the root folder

```bash
make up
```

Both of those commands will start a docker image that will run the GraphQL server on port `4444` If this port is not available on your machine feel free to modify the ports property in the  docker-compose.yml file in the root folder.

Once you get the docker image up and running try hitting `http://localhost:4444/graphql` you should see the GraphQL playground.

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

### `yarn lint:typescript`

Start the EsLint runner and checks the typescript code

### `yarn lint:styles`

Start the EsLint runner and checks the css styles. 
### `yarn test:unit`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:integration`

Starts the integration test that will use puppeteer to run the app in headless mode against a mocked endpoint and will use [jest image snapshot](https://github.com/americanexpress/jest-image-snapshot) to make screenshots and flags any style differences

### `yarn test:e2e`

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

Starts Storybook on port 6066


## Styling The Components

Styling the React components is done with the [styled components](https://styled-components.com/). Try to avoid global class names and keep the styles scoped to the react components.

**NOTE**
A global styles reset is provided with the global styles component. You can find the component definition in `./src/components/global-styles`. This component will be set at the top of the React App and will set some default styles. The components uses [normalize](https://necolas.github.io/normalize.css/) as a base but you can tweak it further if needed.

---

### Theming

The project use a custom theming solution to allow managing all the main design elements such as colours, type, break points etc. in single place.

The source code for the theme generator can be find in `./src/theme`. This folder has a default export `generateTheme` that can be used with the `styled-components` ThemeProvider to set a theme for all wrapped components:

```javascript
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { generateTheme } from 'lmel-components/core/theme'
import App from './App'

React.render(
    <ThemeProvider theme={generateTheme()}>
      <App>
    </ThemeProvider>,
)
```

You can pass options to the `generateTheme` function like that:

```javascript
//...
    <ThemeProvider theme={generateTheme({baseSize: 1 })}>
//...
```

The following options are available:

| Option    | Type              | Default Value     |
| --------- | ----------------- | ----------------- |
| baseUnits | 'px', 'rem'       | 'rem'             |
| baseSize  | Number            | 16                |
| themeType | 'light', 'dark'   | 'light'           |



**NOTE**
In the current version of the app dark theme is still to be implemented so changing the `themeType` prop will not have any effect.

---
#### Using the theme

You can use the theme inside styled-components like so:

```javascript
import styled from 'styled-components';

export const CardComponent = styled.div`
	background: ${({ theme }) => theme.colors.white};
`;
```

Please make sure you always use the theme values if those are available and avoid hard coding values in your CSS.

#### The spacing helper method

The theme provides a conversion helper method that will automatically convert pixel values to rems (or whatever the baseUnit of the theme being used is). 

The conversion is done as follow:

* if baseUint is set to 'px' the value passed will not be changed despite what the base size is set to and the spacing method will return the same number

```javascript
import styled from 'styled-components';

// const theme = generateTheme({baseUnit: 'px', baseSize: 16 })

export const NavigationContainer = styled.div`
	display: flex;
	height: ${({ theme }) => theme.spacing(80)}; // returns 80px
	background: ${({ theme }) => theme.colors.white};
`;
```

* if baseUnit is set to 'rem' the value passed to the spacing method will be divided by the baseSize. 

```javascript
import styled from 'styled-components';

// Assuming the top level theme in the ThemeProvider is set as
// const theme = generateTheme({baseUnit: 'rem', baseSize: 16 })

export const NavigationContainer = styled.div`
	display: flex;
	height: ${({ theme }) => theme.spacing(80)}; // returns 5rem
	background: ${({ theme }) => theme.colors.white};
`;
```

```javascript
import styled from 'styled-components';

// Assuming the top level theme in the ThemeProvider is set as
// const theme = generateTheme({baseUnit: 'rem', baseSize: 1 })

export const NavigationContainer = styled.div`
	display: flex;
	height: ${({ theme }) => theme.spacing(5)}; // returns 5rem
	background: ${({ theme }) => theme.colors.white};
`;
```

You can also pass an object for shorthand values:

```javascript
import styled from 'styled-components';

// Assuming the top level theme in the ThemeProvider is set as
// const theme = generateTheme({baseUnit: 'rem', baseSize: 16 })

export const NavigationContainer = styled.div`
	display: flex;
	height: ${({ theme }) => theme.px(80)}; // returns 5rem
	background: ${({ theme }) => theme.colors.primary[100]};
	margin: ${({ theme }) =>
		theme.px({
			top: 80,
			left: 0,
			bottom: 24,
			right: 0,
		})}; // returns 1.5rem 0 1.5rem 0
`;
```

#### The space helper method

Spacing between elements should be in multiples of 26px. A helper method has been provided to the theme object to aid with this:

```javascript
import styled from 'styled-components';

export const Element = styled.div`
	display: block;
	margin-bottom: ${({ theme }) => theme.space()} // returns 1.625rem (26px)
	margin-right: ${({ theme }) => theme.space(2)} // returns 3.25rem (52px)
`;
```



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
