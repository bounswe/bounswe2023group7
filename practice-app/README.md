# Practice App of Group 7 2023 - Cmpe352

## Dependencies

To install dependencies of the project, please go into both `client` and `server` directories and run `npm install` command in both directories.

If you cannot run `npm` command install [Node.js](https://nodejs.org/). LTS version is recommended.

After that, you can follow instructions provided in `README.md` files in `client` and `server` directories to run development servers for both `client` and `server`.

## Running the project
1. You need a MongoDB instance. Please copy the MongoDB URI.
2. Create a `.env` file in the `server`. It should contain the following fields:

    ```json
    PORT =
    API_URL =

    DB_URI = 

    GEOCODING_TOKEN = 
    SECRET_KEY = 
    LOCATION_TOKEN = 
    MOBY_API_KEY =  
    ```
    
3. After adding the .env file, you can run `docker-compose up --build -d` in `server` folder.
4. Run `docker-compose up --build -d` in `client` folder.
5. Some steps about AWS EC2
6. That is all.

    

