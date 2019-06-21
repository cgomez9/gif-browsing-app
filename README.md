## About Gif Browsing App

This is the GIF Browsing app. This app is built with Angular 7 inside a Docker container. We use Docker Compose to set both production and development enviroments.

## Setting up the project

First you need the following software installed:

- Docker
- Docker Compose

Once you have installed the dependecies, open a terminal in the root folder of the project and run the following command:

`docker-compose -f docker-compose-prod.yml up -d --build`

The first time is going to download and build the containers so it's going to take a while. Once the process is finished you can check that everything went right with the following command:

`docker-compose ps`

You should have one container running. 

And this is it, if everything went right, you now have the app running in `localhost`. In order for this app to function, you need the [Core](https://github.com/cgomez9/gif-browsing-core).
