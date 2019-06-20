## About Gif Browsing CoAppre

This is the GIF Browsing app. This app is built with Angular 7 inside a Docker container. We use Docker Compose to set both production and development enviroments.

## Setting up the project

First you need the following softwares installed:

- Docker
- Docker Compose

Once you have installed the depencies, open a terminal in the root folder of the project and run the following command:

`docker-compose up -d`

The first time is going to download and build the containers so it's going to take a while. Once the process is finish you can check that everything went right with the following command:

`docker-compose ps`

You should have one container running. In the next step, you need to enter the container and install the javascript dependencies. Use the following command in project's root:

`docker-compose exec app bash`

Once inside the container, you need to run the following command:

`npm install`

This command it's going to install all project's dependencies. And this is it, if everything went right, you now have the app running in `localhost`. In order for this app to function, you need the Core [Core] (https://www.hola.com).
