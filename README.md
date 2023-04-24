# Recipe Diary

## Table of Conents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Running the project](#runing-the-project)
4. [Core Dependencies](#core-dependencies)
5. [License](#license)



## Overview
This is a full-stack web application built using [MERN Stack](https://www.mongodb.com/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,MongoDB%20%E2%80%94%20document%20database). This objective of the project is to give users an experience of using a  highly interactive web interface where they can find and create, follow, and review saved and recently viewed recipes.

## Installation
In order to install this project on a local environment, it is necessary to clone the repository and install all the necessary dependencies.  

##### Steps:
1. Clone the repository locally using the following command using either HTTPS, SSH, GitHub Cli

2. Install the dependencies by running the following command:
    * For Frontend
        ```
        cd recipe-diary-frontend && npm i --save && cd ..
        ```
    * For Backend
        ```
        cd recipe-diary-backend && npm i --save && cd ..
        ```
## Runing the project
In order to get the project up and running locally, follow the steps below. Additionally, it is imperative to configure a backend server that is capable of handling requests.

##### Steps:
 1. Run your local mongodb server. Steps can be found [here](https://zellwk.com/blog/local-mongodb/#:~:text=To%20connect%20to%20your%20local,databases%20in%20your%20local%20MongoDB.)
 2. Run the server locally using the following code from the root of the project:
    ```
    cd recipe-diary-backend
    npm start
    ```
    By this step, the server should be running and connect to the local mongodb database.

 3. Run the website locally using the following code from the root of the project:
    ```
    cd recipe-diary-frontend
    npm start
    ```
    By this step, the website instance should be be loaded and hosted on localhost. Kindly check the url port on which the website is hosted and enter it in your browser to interact and explore the interface.
 

 ## Core Dependencies
 ##### Frontend
  * TypeScript
  * React.js
  * Redux
  * Bootstrap 4 / Reactstrap
  * Bootstrap Social
  * Font Awesome
  * React Simple Animations
 

 ##### Backend
  * JavaScript
  * Cors
  * Express.js
  * Passport
  * UUID
  * Multer
  * Mongoose



## License
This project is licensed under the terms of the MIT license.
