# Practice App of Group 7 2023 - Cmpe352

## Dependencies

In pre-run phase all you need is install [docker](https://docs.docker.com/engine/install/).

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
3. Create a `.env` file in the `client`. It should contain the following field:

    ```json
    API_URL =
    ```
    
    
    
4. To build the backend image run `sudo docker build -t practice-app-backend`, and to build the frontend image run `sudo docker build -t practice-app-frontend`,
5. Run `sudo docker run -d -p 8080:8080 practice-app-backend` for backend and `sudo docker run -d -p 3000:3000 practice-app-frontend` for frontend.
6. That is all.
