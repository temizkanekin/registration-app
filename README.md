## Live version on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/8f281a99-8650-4fa8-93f1-1a89c0ed7b6b/deploy-status)](https://app.netlify.com/sites/inspiring-davinci-84395e/deploys)

https://inspiring-davinci-84395e.netlify.app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description about app
- This registration application consists of three main views. These are:
    - Registration Selection view to select registration type and user information details.
    - Workshops view to select workshop or workshops.
    - Summary view to display registration type, user information,  workshop type and amount information, payment type selection. User can also add another participant or edit/remove registrated participants from the summary view.
- You can click Toolbar header to return registration selection view.
- Formik is used to create and validate user information details form.
- Redux is used for managing the state throughout the application flow.
- Registration types are fetched from [registration-form-setup-information.json](src/assets/registration-form-setup-information.json). Multiple registration types are supported. (More registration types can be added to registration-form-setup-information.json with unique id)
- Workshop details are fetched from [registration-form-setup-information.json](src/assets/registration-form-setup-information.json). Multiple workshops are supported. (More workshops can be added to registration-form-setup-information.json)
- Currency symbol is fetched from [registration-form-setup-information.json](src/assets/registration-form-setup-information.json). Currently "USD" and "TRY" are supported. (Can be editable at registration-form-setup-information.json)
- There is a custom snackbar component to inform the user about the request that logged in the console when user pressed the next step button in the summary view
- App has responsive UI.
- [Styled components](https://styled-components.com/) used to style components to use the new custom styled components across the app.

## Technologies/Libraries Used

- React Router Dom : To wrap all views into router in App.js.
- [Tailwind CSS](https://tailwindcss.com/) : Highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.
- [react-redux](https://react-redux.js.org/): Official React bindings for Redux
- [styled components](https://styled-components.com/): styled-components utilises tagged template literals to style your components.
- [formik](https://formik.org/): Formik is the world's most popular open source form library for React and React Native.
- [font awesome icons](https://fontawesome.com/): Font Awesome, the web's most popular icon set and toolkit.



## Available Scripts

In the project directory, you can run:

#### `yarn install`

Install the node dependencies before run the app.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
