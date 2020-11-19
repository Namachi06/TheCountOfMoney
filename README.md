# The Count Of Money

## Installation
* Clone and change directory
    ```
    git clone git@github.com:Namachi06/TheCountOfMoney.git

    cd TheCountOfMoney
    ```

## Usage

* Export the following environment variables in order to create the root user and password for mongo:
    * For **Linux**
        ```
        export MONGO_INITDB_ROOT_USERNAME=EnterYourRootUserHere
        export MONGO_INITDB_ROOT_PASSWORD=EnterYourRootPasswordHere
        export MONGO_INITDB_DATABASE=DatabaseName
        ```

* Use and compile the application using docker:
    ```
    docker-compose build

    docker-compose up
    ```

* You should be able to access the following local links:
    * [Web application](http://localhost:3000 "Web App")
    * [REST Server](http://localhost:5000 "REST Server API")

## Working with Visual Studio Code

* Don't forget to install needed extensions:
    * [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    * [EditorConfig for VS code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
