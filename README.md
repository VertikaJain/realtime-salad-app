# SALAD ORDER TRACKER APPLICATION
  - A real time application to track orders online. Users can order Salads, view cart, and check the delivery status.
  - Part of 100 days of code challenge.

## TECHNOLOGY STACK
  1. JavaScript - NodeJS Framework
  2. Express JS
  3. EJS Template
  4. YARN (package manager)
  5. MongoDB
  6. Laravel Mix
  7. Tailwind CSS
  8. Socket.io
  9. ES6
  10. SCSS

## INSTALLATIONS
  1. Download & Install [NodeJS](https://nodejs.org/en/download/)
  2. Download & Install [YARN](https://classic.yarnpkg.com/en/docs/install#windows-stable)
  3. Download & Install [GIT](https://git-scm.com/downloads)
  4. Steps for Installing [Laravel](https://laravel-mix.com/docs/5.0/installation#stand-alone-project)
  5. [Using Tailwind CSS via CDN](https://tailwindcss.com/docs/installation#using-tailwind-via-cdn) (No need to install complete framework)
  
## YARN COMMANDS
  1. yarn -v (check version of YARN)
  2. cd realtime-salad-app (to work in the project folder)
  3. yarn init (Initializes package.json file in root of project)
  4. yarn add express ejs express-ejs-layouts (The above command performs 4 tasks-) 
      - Writes dependencies to package.json,
      - Downloads express, ejs and express-ejs-layouts dependencies from there respective repositories on the Cloud,
      - Adds node_modules folder, which contains all the dependencies like a Tree structure, and
      - Creates yarn.lock file, which locks down the versions of the dependencies specified in the package.json file.
  5. yarn add nodemon -D (downloads nodemon that automatically restarts the server on any changes in the project & adds nodemon to devDependencies in package.json)
  6. yarn dev (runs the server)
  7. yarn add laravel-mix -D (downloads Laravel Mix, updates node_modules & adds laravel to devDependencies in package.json)
  8. yarn add cross-env --save-dev (to handle different environments)
  9. yarn watch (performs the following tasks -)
      - installs sass, sass-loader & resolve-url-loader dependencies when executed first time, and saves to package.json.
      - compiles SCSS & JS files using laravel-mix, and stores the compiled code to public folder i.e. CSS & JS.

## NPM COMMANDS
  *NPM package manager is automatically downloaded with NodeJS, and it can be used as an alternative to YARN. Since NPM has a drawback that it works quite slow when compared with YARN (as YARN installs dependencies simultaneously), I will be using YARN in this project. However, I am providing NPM commands as well for reference.*
  1. npm -v
  2. cd realtime-salad-app
  3. npm init
  4. npm install express ejs express-ejs-layouts
  5. npm install nodemon --save-dev
  6. npm run dev
  7. npm install laravel-mix --save-dev
  8. npm install cross-env --save-dev
  9. npm run watch

## GIT COMMANDS
  1. git --version (checks version)
  2. git init (creates .git file )
  3. git status (to check if files are committed or not)
  4. git add . (adds all files, ready to commit)
  5. git commit -m "commit message here"
  6. git push origin master -f (pushing all changes to github; -f stands for forced push)
  7. git status (recheck files)
  8. [.gitignore commands](https://stackoverflow.com/questions/12501324/how-to-use-gitignore-command-in-git)
  9. [.gitignore for NodeJS guide](https://github.com/github/gitignore/blob/master/Node.gitignore)
  
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
  - Code in other ejs files like home, login and register, is simply embedded using **<%- body%>** after the nav bar.

## Resources
  - [Google Font Lato](https://fonts.google.com/specimen/Lato)
  - [ES6](https://www.javascripttutorial.net/es6/)
  - [Using Template Engines](https://expressjs.com/en/guide/using-template-engines.html)
  - [Building forms with Tailwind CSS](https://tailwindcss.com/components/forms)
