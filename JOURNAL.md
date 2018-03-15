# Development Journal

## Monday March 12

I started the project today. Spent some time over the weekend getting a grasp of TypeScript in order to use it for the project.
Most of my time today was configuring and setting up TypeScript, Babel and Webpack.

Initially I wanted to the new Webpack v4, but after some time tinkering, I decided to downgrade to v3 as it doesn't seem like the typescript loaders for v4 are working properly.

Currently have Webpack setup with Hot-Module loading for React. Also used the `HtmlWebpackPlugin` and the `html-webpack-template` to auto-generate an `index.html` file instead of creating one myself.
The current set up should be fine, but if I have extra time I may tinker with it some more and create a production version.

## Tuesday March 13

Didn't have much time to work on the project today. I spent my time setting up React Router and Redux.
And built out the skeleton of the application.

## Wednesday March 14

Today I spent a several hours working on the project today. Starting to get the hang of TypeScript.
I'm really enjoying the development experience. Since I'm still learning a lot it's slowed me down somewhat, fixing compiler errors, but it is catching a lot of errors that I would have missed in regular JS.
Plus I'm really loving using `enums` with `redux` instead of string constants.

I refactored the Root component and added a `componentDidCatch` method to catch anything that may happen outside of the Redux state.

Speaking of state, I really dug into building out the state.
Created a `typeKeys` file with an `enum` for holding all the action constants.
The `actionTypes` file contains interfaces for all the action types.
Action creators live in `actionCreators` along with their type signatures.
The `initial` file holds the initial state for the reducers and state interfaces.
The `reducers` file is self-explanatory and the `index` file configures the middleware and sets up the redux store.

I could merge some of the files on a short project like this but I like tidy files and it's good habit to separate concerns, especially if this were the start of larger project where there would be dozens of actions.

Also created a service using `axios` to send HTTP requests. Tomorrow I'll write some `epics` for turning the requests into `Observables` and connect it to the `redux` store. As well as building out the UI.

The only really frustrating issue I encountered today is a compiler error on the redux connector for the `Ping` component.
The component is just for testing out `redux-observable` which I think I have set up properly.
But the compiler is complaining that:

`
Types of parameters 'state' and 'state' are incompatible. Type '{}' is not assignable to type 'IAppState'. Property 'routing' is missing in type '{}'.
`

I think I may be too specific with the types, but I'm not positive.
Going to sleep on it and figure it out tomorrow.

Lastly, if you're reading this you may be wondering why I haven't started working on the Search components yet.
Typically I'd start out building the key features first.
However completed a technical challenge a couple of weeks ago where I was asked to build a similar app with React, but for searching for SubReddits.

I like learning new things, so I decided to make this challenge more challenging by building it in TypeScript and using Observables.
