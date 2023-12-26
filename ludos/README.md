<p align="center">
 <img width="200" src="https://github.com/bounswe/bounswe2023group7/assets/47900788/abacbafe-f971-4233-be77-fe5167156730" alt="Material Bread logo">
</p>
<h1 align="center">
Welcome to Ludos!
</h1>

Ludos stands as a dynamic gaming community platform, serving as the hub for developers, gamers, and e-sports enthusiasts to foster social connections and collaborate on game-related matters. Our versatile application seamlessly attends to both video games and board games, providing a comprehensive space for diverse gaming interests. Additionally, our platform features robust group functionality, enabling like-minded individuals to connect and engage in shared gaming experiences. 

Elevate your gaming journey with Ludos – where community, collaboration, and fellowship converge.

## How to run frontend?

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)

### Steps to Deploy

1. **Clone the Repository:**
    ```bash
     git clone https://github.com/bounswe/bounswe2023group7.git
     ```
2. **Go to Directory:**
   ```bash
   cd ludos/frontend
   ```
3. **Ensure that you have docker installed and running.**
4. **Build the Docker Image and Run:**
    ```bash
    docker compose up --build
    ```
    
5. **Access Our Project**
 Now, it is available at *localhost:3000/*


### Deployed Version of frontend
Go to our website link which we shared via Discord channel of the course.

## How to run mobile app?
- You can download APK version of the app from [here](https://drive.google.com/file/d/1h2x1MLO_yyUC1Tq7dmDcOutZYBKyXXKt/view?usp=sharing) and directly run it in your Android device.
- If you want to use an emulator to open the application:
  - You can download an Android emulator with Android Studio through [this link](https://developer.android.com/studio?hl=tr).
  - Then you can easily run the application on Android Studio following [this guide](https://www.geeksforgeeks.org/how-to-import-existing-flutter-project-in-android-studio/).

## How to run backend application?
Deployed Swagger Documentation: http://164.92.195.35:8080/api

```WORKDIR=./ludos/backend```<br/>
1. Create a .env file for the environment variables. Please ask for the variables. The name of the variables are included in .env.example file. <br/>
2. Run ```docker compose up --build``` <br/>
3. Now, the api is available with localhost:8080 base url.
