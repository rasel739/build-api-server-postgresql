# Build Api Application

Build Api web app. This app use users and others person name ,phone,image, add and save database. This web app has a functional. 1.Signup,2.Login,3.Reset Password, 4.Add data,5.Update data,6.Delete data.

## Getting Started This application

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```
git clone https://github.com/rasel-helios/build-api-server-side.git

```

## Folder structure

#### `build-api-server-side` - Holds the server application

- #### `config` - This holds our configuration files, like config,db
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `Middleware` - This holds our middleware functions
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `utils` - This holds all of our common functions
- #### `views` - This holds all template engine file

- #### `env` - All of our environment variables are accessible

- #### `.gitignore` - Tells git which files to ignore

- #### `app` - This holds all of our application configuration

- #### `package.json` - This holds all of our package.json configuration

- #### `swagger-outputfile` - This holds all of our swagger output files

- #### `swagger`- This holds all of our swagger configuration

- #### `README` - This file!

## Environment Variables

```
DB_USER
DB_PASS

SECRET_KEY

DB_URL

NODE_MAILER_SERVICE

NODE_MAILER_USER

NODE_MAILER_PASS

NODE_MAILER_FROM

```

### Prerequisites

The things you need before installing the software.

- [Install node js for your local machine](https://nodejs.org/en/).
- [Install git for your local machine](https://git-scm.com/).

### Installation

```
npm install
```

```
npm run  start-dev
```

Runs the server app in development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view the client in the browser.

### Swagger Auto Generated Documentation

```
npm run swagger
```

Again run the server

```
npm run start-dev
```

Go to the url and show the generated documentation
.<br>
Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) to view the client in the browser.

## Deployment

Additional notes on how to deploy this on a live or release system. Explaining the most important branches, what pipelines they trigger and how to update the database (if anything special).

### Server

- Live:
- Release:
- Development:

### Branches

- Main:
- Feature:
- Bugfix:
