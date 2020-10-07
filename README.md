# SALAD ORDER TRACKER APPLICATION
  - A real time application to track orders online. Users can order Salads, view cart, and check the delivery status.
  - Part of 100 days of code challenge.

## Technology Stack
  1. JavaScript - NodeJS Framework
  2. ExpressJS
  3. EJS Template
  4. YARN (package manager)
  5. MongoDB
  6. Laravel Mix
  7. Tailwind CSS
  8. Socket.io
  9. ES6
  10. SCSS
  
## Project Structure - MVC pattern
  1. `Model` is the Database part of the application. It represents the structure of data, the format and the constraints with which it is stored.
  2. `View` is the User Interface part. It utilizes the Model(using controllers) and presents data as static/dynamic pages to the user for further tasks.
  3. `Controller` is the request-response handler. The user interacts with the View, which in turn generates a request, that will be handled by a controller. The controller renders the appropriate view with the model data as a response.

## Installations
  1. Download & Install [NodeJS](https://nodejs.org/en/download/)
  2. Download & Install [YARN](https://classic.yarnpkg.com/en/docs/install#windows-stable)
  3. Download & Install [GIT](https://git-scm.com/downloads)
  4. Steps for Installing [Laravel](https://laravel-mix.com/docs/5.0/installation#stand-alone-project)
  5. [Using Tailwind CSS via CDN](https://tailwindcss.com/docs/installation#using-tailwind-via-cdn) (No need to install complete framework)
  6. [MongoDB for Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
  7. [MongoDB Compass](https://www.mongodb.com/try/download/compass)
  
## YARN Commands
  1. `yarn -v` (check version of YARN)
  2. `cd realtime-salad-app` (to work in the project folder)
  3. `yarn init` (Initializes package.json file in root of project)
  4. `yarn add express ejs express-ejs-layouts` (The above command performs 4 tasks-) 
      - Writes dependencies to package.json,
      - Downloads express, ejs and express-ejs-layouts dependencies from there respective repositories on the Cloud,
      - Adds node_modules folder, which contains all the dependencies like a Tree structure, and
      - Creates yarn.lock file, which locks down the versions of the dependencies specified in the package.json file.
  5. `yarn add nodemon -D` (downloads nodemon that automatically restarts the server on any changes in the project & adds nodemon to devDependencies in package.json)
  6. `yarn dev` (runs the server)
  7. `yarn add laravel-mix -D` (downloads Laravel Mix, updates node_modules & adds laravel to devDependencies in package.json)
  8. `yarn add cross-env --save-dev` (to handle different environments)
  9. `yarn watch` (performs the following tasks -)
      - installs sass, sass-loader & resolve-url-loader dependencies when executed first time, and saves to package.json.
      - compiles SCSS & JS files using laravel-mix, and stores the compiled code to public folder i.e. CSS & JS.
  10. `yarn add mongoose` (helps in interaction of JS code with MongoDB)
  11. `yarn add express-session` (helps in storing sessions in key-value form)
  12. `yarn add dotenv` (a zero-dependency module that loads environment variables from a .env file into process.env)
  13. `yarn add express-flash` (used to flash messages for the application)
  14. `yarn add axios` (promise based HTTP client for the browser and node.js)
  15. `yarn add noty` (notification library that makes it easy to create alert, success, error, warning, information and confirmation messages)
  16. `yarn add bcrypt` (A library which helps in hashing passwords)
  17. `yarn add passport passport-local` (Authentication)
  18. `yarn add moment` (A JavaScript date library for parsing, validating, manipulating, and formatting dates.)

## NPM Commands
  *NPM package manager is automatically downloaded with NodeJS, and it can be used as an **alternative to YARN**. Since NPM has a drawback that it works quite slow when compared with YARN (as YARN installs dependencies simultaneously), I will be using YARN in this project. However, I am providing NPM commands as well for reference.*
  1. npm -v
  2. cd realtime-salad-app
  3. npm init
  4. npm install express ejs express-ejs-layouts
  5. npm install nodemon --save-dev
  6. npm run dev
  7. npm install laravel-mix --save-dev
  8. npm install cross-env --save-dev
  9. npm run watch
  10. npm install mongoose
  11. npm install express-session
  12. npm install dotenv
  13. npm install express-flash
  14. npm install axios
  15. npm install noty
  16. npm install bcrypt
  17. npm install passport passport-local
  18. npm install moment

## GIT Commands
```
  1. git --version (checks version)
  2. git init (creates .git file )
  3. git status (to check if files are committed or not)
  4. git add . (adds all files, ready to commit)
  5. git commit -m "commit message here"
  6. git push origin master -f (pushing all changes to github; -f stands for forced push)
  7. git status (recheck files)
  8. [.gitignore commands](https://stackoverflow.com/questions/12501324/how-to-use-gitignore-command-in-git)
  9. [.gitignore for NodeJS guide](https://github.com/github/gitignore/blob/master/Node.gitignore)
```
  
## Why use Laravel Mix?
  - A tool used to compile resources like modern JavaScript and SCSS code and store it to the public folder in JS and CSS format. 
  - Advantage over other tools - avoids manual configuration (internally uses WebPack).
  - Works inside Laravel framework usually, but has an benefit that it can be used in Stand Alone projects like this one.
  - [Laravel Guide](https://laravel.com/docs/7.x/mix)

## webpack.mix.js
  - A configuration file downloaded to node_modules while installing Laravel Mix.
  - Copy this file from node_modules to the root of project directory using the command given below.
  - **cp** node_modules/laravel-mix/setup/webpack.mix.js ./ (use **copy** in case of Windows OS)
  - This file imports laravel-mix module, and uses the methods js() & sass() for compilation and then storing of the compiled files.
  
## Scripts in package.json
  - Update [scripts](https://laravel-mix.com/docs/5.0/installation#npm-scripts) in package.json file to compile these files.
  - The watch command automatically compiles the file everytime it is changed, eliminating the need to manually compile repeatedly.
  - cross-env : Runs Scripts that set and use environment variables across platforms (useful in production). 

## layout.ejs
  - An ejs file that serves the common content such as header, footer and nav bar to all the pages in the application.
  - Code in other ejs files like home, login and register, is simply embedded using `<%- body%>` after the nav bar.

## Session Configuration
  - Done using express-session module, needed to store Cart data in this project.
  - The server creates & stores a session ID (sid) when a new client Requests for the web page.
  - Then it sends a message in Response header, which has sid, asking the client to create a cookie using that session id.
  - For every next request header from client, the cookie will be send to server, so that the server can recognize the client as an existing one.
  
## Express Methods (Assets)
  *Built-in middleware functions in Express.*
  - [express.static()](https://expressjs.com/en/4x/api.html#express.static)
  - [express.json()](https://expressjs.com/en/api.html#express.json)
  - [express.urlencoded()](https://expressjs.com/en/4x/api.html#express.urlencoded)
  
## Database Connectivity - MongoDB, NodeJS & Mongoose
  - Mongoose is an Object Data Modeling library, that provides object mapping between MongoDB and NodeJS.
  - Connection is established using `mongoose.connect()` for single connection, or `mongoose.createConnection()` for multiple connections.
  - A Schema helps in defining the fields stored in each document along with their validation requirements and default values.
  - The timestamps parameter helps to add createdAt and updatedAt properties automatically to the particular document in the collection.
  - Schemas are then "compiled" into Models using the mongoose.model() method.
      - `const MyModel = mongoose.model('ModelName', mySchemaName);`
      - The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name. 
  - [Mongoose exists() method](https://kb.objectrocket.com/mongo-db/the-mongoose-exists-function-1022)
  - [Mongoose findById() method](https://kb.objectrocket.com/mongo-db/mongoose-findbyid-1415)
  - [Mongoose findOne() method](https://kb.objectrocket.com/mongo-db/mongoose-find-one-1409)
  - [Mongoose populate() method](https://mongoosejs.com/docs/populate.html)

## Hashing Passwords using bcrypt library
  *Using [bcrypt](https://www.npmjs.com/package/bcrypt) is a secured way to store passwords in a database regardless of whatever language the app’s backend is built in — PHP, Ruby, Python, Node.js.*
  ```
  const bcrpyt = require("bcrypt")
  const hashedPassword = await bcrpyt.hash(password, 10)
  ```
  
## Passport - authentication middleware for Node.js
  - **passport-local** is a passport strategy for authenticating with a username and password.
  - [Usage/Configuration](https://github.com/jaredhanson/passport-local/#usage)
  - [Middlewares](http://www.passportjs.org/docs/configure/)
      - passport.initialize()
      - passport.session()
  - Passport will serialize and deserialize user instances to and from the session using:
      - passport.serializeUser()
      - passport.deserializeUser()

## User-defined Middlewares for authentication
*Middlewares are methods that can be executed before calling other methods/functionalities, and can also pause further execution based on given logic in the middleware at the time of request. Hence it alters the response.*
  - 'guest' middleware ensures that user redirects to login/register page only when logged out.
  - 'auth' middleware ensures that user redirects to customer/orders page only when logged in.
  - 'admin' middleware ensures that only the admin has access to the admin/orders page once logged in.

## Resources
  - [Realtime Pizza App by Coder's Gyan](https://www.youtube.com/watch?v=RqiU5nzj_nU&list=PLXQpH_kZIxTVRmXQN9J0Az76te5mAreLV&ab_channel=Coder%27sGyan)
  - [Google Font Lato](https://fonts.google.com/specimen/Lato)
  - [ES6](https://www.javascripttutorial.net/es6/)
  - [Using Template Engines](https://expressjs.com/en/guide/using-template-engines.html)
  - [Building forms with Tailwind CSS](https://tailwindcss.com/components/forms)
  - [Factory Functions](https://www.youtube.com/watch?v=jpegXpQpb3o)
  - [Using DB with Mongoose MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
  - [Working of Mongoose](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)
  - [Why Axios](https://medium.com/@MinimalGhost/what-is-axios-js-and-why-should-i-care-7eb72b111dc0)
  - [Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
  - [res.locals](https://expressjs.com/en/api.html#res.locals)
  - [Object Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  - [bcrypt JS Working](https://medium.com/javascript-in-plain-english/how-bcryptjs-works-90ef4cb85bf4)
  - [Constructor Functions](https://www.youtube.com/watch?v=23AOrSN-wmI&ab_channel=ProgrammingwithMosh)
  - [Passport-local](http://www.passportjs.org/packages/passport-local/)
  - [Moment.js](https://momentjs.com/)
  - [req.xhr](https://expressjs.com/en/4x/api.html#req.xhr)
  - [Cache Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
