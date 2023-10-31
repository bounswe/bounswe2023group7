<p align="center">
 <img width="200" src="https://github.com/bounswe/bounswe2023group7/assets/47900788/abacbafe-f971-4233-be77-fe5167156730" alt="Material Bread logo">
</p>
<h1 align="center">
Welcome to Frontend of Ludos!
</h1>

Ludos stands as a dynamic gaming community platform, serving as the hub for developers, gamers, and e-sports enthusiasts to foster social connections and collaborate on game-related matters. Our versatile application seamlessly attends to both video games and board games, providing a comprehensive space for diverse gaming interests. Additionally, our platform features robust group functionality, enabling like-minded individuals to connect and engage in shared gaming experiences. 

Elevate your gaming journey with Ludos – where community, collaboration, and fellowship converge.

## How to run?

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- Node.js and npm: You can download them from the [official website](https://nodejs.org/).

### Steps to Deploy

1. **Clone the Repository:**
    ```bash
     git clone https://github.com/bounswe/bounswe2023group7.git
     ```
2. **Go to Directory:**
   ```bash
   cd ludos/frontend
   ```
2. **Install Dependencies:**

    ```bash
    npm install
    ```
3. **Build the Docker Image:**
    ```bash
    docker compose up --build
    ```
    
4. **Access Our Project**
 Now, it is available at *localhost:3000/*


## How to use?
Go to our website link which is http://51.20.170.143:3000/. User can [register](http://51.20.170.143:3000/signup) to the platform and then [login](http://51.20.170.143:3000/login). In addition to that, for milestone 1, we provided mock pages for:
* Forum page about *Video Games*: [/forum](http://51.20.170.143:3000/forum)
*    Game Pages for:

      * *Red Dead Redemption 2* : [/game/Red-Dead-Redemption-2](http://51.20.170.143:3000/game/Red-Dead-Redemption-2)
      * *Witcher 3* : [/game/Witcher-3](http://51.20.170.143:3000/game/Witcher-3)
      * *God of War 2018*: [/game/God-of-War-2018](http://51.20.170.143:3000/game/God-of-War-2018)
* For home page, the link is [/](http://51.20.170.143:3000/home)
