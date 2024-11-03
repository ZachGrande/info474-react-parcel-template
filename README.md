# INFO 474: Data Visualizations

Univeristy of Washington, Information School, Spring 2022

This project is a data visualization application built using React and Vite. It includes various visualizations and interactive demos of included data sets.

Visualizations are built with Vega and D3.

## Installation

To install project dependencies, run:

```bash
npm install
```

## Development

To start the development server, run:

```bash
npm run start
```

## Deployment

This application is automatically deployed to production upon PR merge to the default branch.

**Optional:** To build the application, run:

```bash
npm run build
```

Build files will be outputted to `/build`

**Optional:** To test the project in production mode, run:

```bash
npm run preview
```

Surprise! No Parcel to be found here. It was found that it had an issue with minifying dependency files (`fast-json-patch` specifically). Vite is better maintained and offers a nicer developer experience.
