<font color="#F49A32"> 
<center> <h1>CMPE451 <br> Milestone 2 Report <br> The Game Community Platform <br> 2023 - Group 7</h1> </center>
</font>


## 👤 Contributors
- [*Fatma Sena Alçı*](https://github.com/bounswe/bounswe2023group7/wiki/Fatma-Sena-Al%C3%A7%C4%B1)
- [*Yunus Emre Altuğ*](https://github.com/bounswe/bounswe2023group7/wiki/Yunus-Emre-Altu%C4%9F)
- [*Ömer Şafak Bebek*](https://github.com/bounswe/bounswe2023group7/wiki/%C3%96mer-%C5%9Eafak-Bebek)
- [*Kardelen Erdal*](https://github.com/bounswe/bounswe2023group7/wiki/Kardelen-Erdal)
- [*Hatice Erk*](https://github.com/bounswe/bounswe2023group7/wiki/Hatice-Erk)
- [*Melih Gezer*](https://github.com/bounswe/bounswe2023group7/wiki/Melih-Gezer)
- [*Muhammet Tayyip Kamiloğlu*](https://github.com/bounswe/bounswe2023group7/wiki/Muhammet-Tayyip-Kamilo%C4%9Flu)
- [*Hakan Karakuş*](https://github.com/bounswe/bounswe2023group7/wiki/Hakan-Karaku%C5%9F)
- [*Elif Kızılkaya*](https://github.com/bounswe/bounswe2023group7/wiki/Elif-K%C4%B1z%C4%B1lkaya)
- [*Furkan Ülke*](https://github.com/bounswe/bounswe2023group7/wiki/Furkan-%C3%9Clke)
- [*Tacettin Burak Eren*](https://github.com/bounswe/bounswe2023group7/wiki/Tacettin-Burak-Eren)



## Table of Contents

* [1. Status of the Project](#status-of-project)

* [2. Customer Feedback and Reflections ](#customer-feedback-and-reflections)

* [3. Changes since Milestone #1](#changes-since-milestone-1) 

* [4. List and Status of Deliverables ](#list-and-status-of-deliverables)

* [5. Progress According to Requirements ](#progress-according-to-requirements)
    * [5.1 Functional Requirements](#functional-requirements)
    * [5.2 System Requirements](#system-requirements)

* [6.API Endpoints](#api-endpoints)

* [7. Unit Test Reports](#unit-test-reports)

    * [7.1 For Backend](#for-backend)
    * [7.2 For Frontend](#for-frontend)
    * [7.3 For Mobile](#for-mobile)

* [8. General Test Plan](#general-test-plan)

* [9. The Status of the Features for Annotation](#the-status-of-the-features-for-annotation)

* [10. Plans for Implementing Functionalities Associated with Annotations](#implement-functions-annotations)

* [11. Individual Contribution Reports](#individual-contribution-reports)


# **1. Status of Project**<a name="status-of-project" />

Our project has successfully completed Milestone 2, building on the accomplishments of Milestone 1. In Milestone 1, crucial features like user login, registration, and logout were integrated for web and mobile platforms. The web platform developed mock pages for the game, forum, and home. The mobile version included essential user functions and a basic home page.

In Milestone 2, we focused on expanding the user interface by adding key pages such as Home, Create Game, Edit Game, Create Entity, Forgot Password, Change Password, Games, indvidual Game, Forum, and User Profile. These additions improve navigation for users. Responding to user feedback, the Home page underwent refinement for better aesthetics and functionality. The design is now more responsive and visually pleasing across devices.

In Milestone 2, we introduced essential functionalities, allowing users to follow/unfollow games, submit, view, like, dislike, delete, and update game reviews. The platform enables exploration of game properties, engaging forum discussions with comments and threads, and efficient searches. Users can actively participate in the community by rating and reviewing games, expressing opinions in the forum, and editing profiles. The inclusion of gameplay duration information enhances user engagement.

Overall, Milestone 2 represents significant progress in creating a feature-rich and user-friendly game review platform. We will focus on refining existing features, addressing user feedback, and adding functionalities outlined in the project roadmap like annotations, recommendations, and entities. The next milestone aims to strengthen and complete the platform as a dynamic and game-centric community. We are enthusiastic about the project's journey ahead.

# **2. Customer Feedback and Reflections**<a name="customer-feedback-and-reflections" />

In response to the feedback received during our first milestone, we made additions to our project's requirements. These additions focused on game-specific elements such as characters, items, environments, and packages. When we shared these changes with the customer, we received positive reactions. We implemented these features on the backend and demonstrated how they would be incorporated into the game page on both the frontend and mobile platforms during the second milestone demos. (They will be in the game under the information tabs.)

The overall response from the customer and the audience during the Milestone 2 demos was quite positive. When the customer inquired about displaying game-specific items and characters, we explained that we could utilize our entity feature to achieve this, receiving a positive response.

Viewers suggested a filtering feature based on system specifications, while the customer recommended filtering for team games (2-player, 3-player, etc.). There were questions about how game creations were allocated among different types of users. We clarified that on our platform, every user could create a game, highlighting the need for additional considerations.

Suggestions included filtering games based on user favorites and recommending games similar to the user's preferences. We were advised to focus on game recommendation and entity features as they were deemed important for our platform. We took notes on how to incorporate these features and improve our platform accordingly.

Aside from the milestone presentation, we received positive feedback from our weekly lab reports. Reviewers requested more detailed and meaningful descriptions of the risks encountered during the project. We made adjustments accordingly in our subsequent reports.

In summary, based on the weekly lab reports and the Milestone 2 presentation, we can say that our project is aligned with the customer's expectations and has been further improved based on the received suggestions.


# **3.Changes Since Milestone 1**<a name="changes-since-milestone-1"/>

In the first milestone, our customers gave us the feedback that they wanted our homepage to focus more on games rather than looking like a forum. They also suggested making the whole platform more game-specific. 

In response, we changed the design of our homepage for both the frontend and mobile versions. Now, instead of showing forum threads, our homepage highlights favorite games and trending topics. Even though these changes didn't affect our long-term plans, they did bring some unexpected work. 

Entities are crucial to better represent the game-domain in our platform. Our original plan was to integrate entities to our platform by the end of the last milestone. Although to meet the second feedback, we decided to finish this in this milestone and move annotations to the final milestone, which we planned for the second milestone. 

Unfortunately, despite our efforts, we couldn't finish adding entities in the second milestone. We did manage to set up the necessary API endpoints for entities, create a "create-entity" page on the mobile platform, and add a section for entities on the game page in the regular version. The rest of the work will be finished in the next stages of development.


# **4. List and Status of Deliverables**<a name="list-and-status-of-deliverables" />

 |Deliverable | Status | Description |
|-------------|---------|---------------|
|[Weekly Reports ](https://github.com/bounswe/bounswe2023group7/tree/development/reports)|Delivered|Weekly reports are completed.|
|[Milestone Review](#milestone-review)|Delivered|Milestone review is completed.|
|[A Pre-release Version of Our Project](https://github.com/bounswe/bounswe2023group7/releases/tag/customer-milestone-2)|Delivered|The pre-release version of the project's mobile, frontend and backend has been deployed.|
|[Individual Contributions](#individual-contribution-reports)|Delivered|Individual contributions are completed.|
  


# **5. Progress According to Requirements**<a name="progress-according-to-requirements" />

<details>
<summary><strong>5.1 Functional Requirements<a name="functional-requirements" /></strong></summary>
    
- 1.1 User Requirements
    - 1.1.1 Account 
        - 1.1.1.1 Register
            - 1.1.1.1.1. (Completed) Guests shall be able to register to the platform.     
            - 1.1.1.1.2. (Completed) Users should verify their accounts via e-mails, which proves mail address belongs to user.
            - 1.1.1.1.3. (Not Started) Famous developers, professional e-sports players, famous streamers, famous video producers should be able to get official accounts.
        - 1.1.1.2. Login
            - 1.1.1.2.1. (Completed) Users shall be able to login the platform with username and password.
            - 1.1.1.2.2. (Completed) Users shall be able to logout.
            - 1.1.1.2.5. Password
                - 1.1.1.2.5.1. (Completed) Users shall be able to change their password.
                - 1.1.1.2.5.2. (Completed) Users shall be able to reset their password.
        - 1.1.1.3. Account Management
            - 1.1.1.3.1. (Not Started) Users shall be able to delete their accounts.
    - 1.1.2 Profile Page
        - 1.1.2.1 (Completed) Users shall have a profile page.
        - 1.1.2.2 (Completed) Users shall be able to edit their profile page.
        - 1.1.2.3 (Completed) Users shall be able to add a profile photo to their profiles.
        - 1.1.2.4 (Not Started) Users should be able to share their game achievements on their profiles.
        - 1.1.2.5 (Not Started) Users should be able to get and share badges on their profiles for experiences in the platform.
        - 1.1.2.6 Personal Information
            - 1.1.2.6.1 (Completed) Users shall be able to have and display their username on their profile page.
            - 1.1.2.6.2 (Completed) Users shall have a bio in their profile pages.
            - 1.1.2.6.3 (In Progress) Users shall be able to add tags related to their favorite genre to their profiles.
            - 1.1.2.6.4 (In Progress) Users shall be able to add their favorite games on their profiles.
            - 1.1.2.6.5 (Completed) Users shall be able to share the number of comments on the forum, the number of posts on the forum, and the number of reviews they published on their profiles.
            - 1.1.2.6.6 (Not Started) Developers and e-sports players shall be able to add their associated titles/teams/companies to their profiles.
            - 1.1.2.6.7 (Not Started) Users shall be able to share their gaming platform profiles, including Steam, Epic, IndieGala, Humble Bundle, Ubisoft Connect, GOG, Origins, Xbox Live, itch.io, Google Play Games, on their profiles.
            - 1.1.2.6.8 (Not Started) Users shall be able to display their user types, that are gamer, developer, and e-sports player.
        - 1.1.2.7 Activity Tracking
            - 1.1.2.7.1 (Not Started) Users’ last activities shall be seen on their profiles.
        - 1.1.2.8 Forum
            - 1.1.2.8.1 (Not Started) Users should be able to display previews for posts which they created on their profiles.
            - 1.1.2.8.2 (Completed) Users shall be able to display their comments on other users’ posts.
        - 1.1.2.9 Games
            - 1.1.2.9.1 (Completed) Users shall be able to display their reviews of the games.
            - 1.1.2.9.2 (Not Started) Developers shall be able to display their upcoming titles on their profile page.
        - 1.1.2.10 Actions
            - 1.1.2.10.1 (Completed) Users shall be able to view the other user’s profiles.
            - 1.1.2.10.2 (Not Started) Users should be able to follow the other users.
            - 1.1.2.10.3 (Not Started) Users should be able to unfollow the other users.
            - 1.1.2.10.4 (Not Started) Users should be able to block some users.
            - 1.1.2.10.5 (Not Started) Users should be able to unblock some users which they blocked.
    - 1.1.3 Game
        - 1.1.3.1 (Completed) Users shall be able to create a page for a game.
        - 1.1.3.1 (Completed) Users and guests shall be able to view game profiles, reviews, and average ratings of the game.
        - 1.1.3.2 (Completed) Users shall be able to rate a game out of 5.
        - 1.1.3.3 (Completed) Users shall be able to write reviews for the game.
        - 1.1.3.4 (Completed) Users shall be able to edit their reviews.
        - 1.1.3.5 (Completed) Users shall be able to like or dislike the other reviews.
        - 1.1.3.6 (Completed) Users shall be able to share their rating on their reviews.
        - 1.1.3.7 (Completed) Users shall be able to delete their reviews.
        - 1.1.3.8 (Completed) Users should be able to follow the game.
        - 1.1.3.9 (Completed) Users shall be able to see the number of followers of the game.
        - 1.1.3.10 (Completed) Users should be able to see the system requirements of the game.
        - 1.1.3.11 (Completed) Users should be able to see if his/her computer can run the game or not.
        - 1.1.3.12 (Completed) Users should be able to add his/her game completion duration.
        - 1.1.3.13 (Completed) Users should be able to see the average completion duration of the game.
        - 1.1.3.14 (Completed) Users should be able to see predecessors and successors of the game if it has.
        - 1.1.3.15(Completed)  Users should be able to add and modify a guide for the game.
        - 1.1.3.16 (Completed) Users should be able to see the platforms that the game is downloadable.
        - 1.1.3.17 (Completed) Users should be able to see the age restrictions (PEGI).
        - 1.1.3.18 (Completed) Users shall be able to add tag or tags to a game.
        - 1.1.3.19 Entity Page
            - 1.1.3.19.1 (In Progress) Users shall be able to create a page for game entities.
            - 1.1.3.19.2 (In Progress) Users and guests shall be able to view game entities.
            - 1.1.3.19.3 (Completed) Game entities are characters, packages, items, and environments.
            - 1.1.3.19.4 (In Progress) Users shall be able to reach the entity pages from game pages.
    - 1.1.4. (Not Started) Upcoming Titles
    - 1.1.5 Forum
        - 1.1.5.1 (Completed) Guests and users shall be able to visit the forum.
        - 1.1.5.2 (Completed) Users shall be able to open a thread.
        - 1.1.5.3 (Completed) Users shall be able to cite and comment on posts.
        - 1.1.5.4 (Not Started) Users shall be able to mention other users in the forum.
        - 1.1.5.5 (Completed) Users shall be able to like or dislike posts and comments.
        - 1.1.5.6 (Completed) Users shall be able to cite and comment on other comments.
        - 1.1.5.7 (Completed) Users shall be able to edit their comments.
        - 1.1.5.8 (Completed) Users shall be able to delete their comments on the post.
        - 1.1.5.9 (Completed) The post owners shall be able to edit their posts.
        - 1.1.5.10 (Completed) The post owners shall be able to tag their threads.
        - 1.1.5.11 (Not Started) Users should be able to screen image links.
    - 1.1.6. (Not Started) Group
    - 1.1.7. (Not Started) Administration
- 1.2. System Requirements
    - 1.2.1 Forum/Review
        - (Not Started) 1.2.1.1 System should censor inappropriate words.
        - (Completed) 1.2.1.2 System shall include a timestamp for each forum and review entry.
        - (Completed) 1.2.1.3 System should direct to the user owner of the content’s name, directing to that user’s profile page.
        - (Completed) 1.2.1.4 System shall calculate the average rating of the game.
        - (Completed) 1.2.1.5 System shall calculate the average completion duration of the game.
    - 1.2.2 Search
        - (In Progress) 1.2.2.1. System shall allow users to search for forum thread, subforum, forum comment, upcoming titles, gaming communities-groups, users, and games.
        - (In Progress) 1.2.2.2. System shall allow the user to filter the search for the users, games, and tags.
        - (Not Started) 1.2.2.3. System shall allow users to use sorting features ascending or descending.
        - (Not Started) 1.2.2.4. System shall allow users to sort the threads, alphabetically, by first post date, by last post date,by number of comments in threads.
        - (Not Started) 1.2.2.5. System shall allow users to sort the comments by date, number of replies and difference of upvotes and downvotes for the comment.
        - (Not Started) 1.2.2.6. System shall allow users to sort upcoming titles by post date or launch date.
    - 1.2.4 (Not Started) Annotations
    - 1.2.5 (Not Started) Recommendations
    - 1.2.6 User Data
        - 1.2.6.1 (Completed) The data and content about the deleted accounts should be deleted from the system.
    
</details>
    
<details>
<summary><strong>5.2 System Requirements <a name="system-requirements" /></strong></summary>

- 2.1 Performance & Reliability
    - (Not Started) 2.1.1 The platform should strive to have a Largest Contentful Paint (LCP) of 2.5 seconds or less, excluding external image and video sources, for at least 75% of page visits for both the mobile application and web page.
    - (Not Started) 2.1.2 The platform should strive to have a First Input Delay (FID) of 100 milliseconds or less, except external image and video sources, for at least 75% of page visits for both the mobile application and web page.
    - (Not Started) 2.1.3 The platform should strive to have a Cumulative Layout Shift (CLS) score of 0.1 or less, except external image and video sources, for at least 75% of page visits for both the mobile application and web page.
    - (Not Started) 2.1.4 The platform should strive to have a First Contentful Paint (FCP) of 1.8 seconds or less, except external image and video sources, for at least 75% of page visits for both the mobile application and web page.
    - (Not Started) 2.1.5 The platform should strive to have an Interaction to Next Paint (INP) of 200 milliseconds or less, except external image and video sources, for at least 75% of page visits for both the mobile application and web page.
    - (Not Started) 2.1.6 The platform should strive to have a Time to First Byte (TTFB) of 0.8 seconds or less, except external image and video sources, for at least 75% of page visits for both the mobile application and web page.
    - (Not Started) 2.1.7 The platform should meet these 1-6 requirements for at most 10,000 users at the same time.
    - (Not Started) 2.1.8 The platform shall have a basic response time of at most 4 seconds with more than 10,000 users at the same time.
    - (Completed) 2.1.9 The platform shall back up content every day.
- 2.2 Privacy
    - (Completed) 2.2.1 The rules defined by GDPR/KVKK shall be followed.
    - (Completed) 2.2.2 Personal information and contact information shall be protected according to GDPR.
    - (Not Started) 2.2.3 Privacy policy shall be accepted by the user to be registered.
    - (Completed) 2.2.4 All information about users should be encrypted.
    - (Completed) 2.2.5 Emails shall be unique and valid.
- 2.3 Security
    - (Not Started) 2.3.1 Bot accounts should be eliminated.
    - (Not Started) 2.3.2 Passwords shall contain at least one number and one capital letter.
    - (Not Started) 2.3.3 Verification code should be sent when logging in from a different device.
    - (Not Started) 2.3.4 Users should be able to enable two-factor authentication for security concerns.
    - (Not Started) 2.3.5 Users who disturb other users or violate the rules shall be banned for a period or permanently.
    - (Not Started) 2.3.6 Annotations should be scanned to avoid any malware.
- 2.4 Compatibility
    - (Completed) 2.4.1 The mobile application of the platform shall run on Android 7.93.4 and above.
    - (Completed) 2.4.2 The website shall support at least one of the following browsers: Edge, Safari, Chrome, Firefox, any browser based on Webkit/Chromium engines, and Tor network.
- 2.5 Availability and Accessibility
    - (Completed) 2.5.1 The platform shall support the English language.
    - (Completed) 2.5.2 The platform shall support UTF-8 character encoding.
    - (Completed) 2.5.3 The platform shall be accessible at least 98% of the day.
    
</details>





#  **6. API Endpoints**<a name="api-endpoints" />

##  **6.1. The API Documentation**<a name="the-api-documentation" />
http://3.125.225.39:8080/api

##  **6.2. The Link to the API.**<a name="the-link-to-the-api." />
http://3.125.225.39:8080
##  **6.3. Example API Calls**<a name="example-api-calls" />
* We have examples in our [API Documentation](http://3.125.225.39:8080/api) for other endpoints. 
### 6.3.1 Search Endpoints
#### 6.3.1.1 /search/{searchKey}
`/search/Foot` <br/>
> Method: GET <br/>
> URI: http://3.125.225.39:8080/search/foot <br/>
> Response: <br/>
>> Status: 200 <br/>
>> Body: <br/>
```
{
  "users": [],
  "games": [
    {
      "id": "56ed6f8b-7a5f-4e83-a204-f3b3b9a71057",
      "title": "Football Manager 2024",
      "coverLink": "https://cdn.akamai.steamstatic.com/steam/apps/2252570/header.jpg?t=1699889206",
      "averageRating": 4.5,
      "platforms": [
        "Windows",
        "macOS",
        "PlayStation",
        "Xbox",
        "Nintendo Switch"
      ],
      "tags": [
        "Action",
        "Sports",
        "Strategy",
        "Simulation"
      ],
      "followers": 6,
      "developer": "Sports Interactive",
      "publisher": "SEGA",
      "ageRestriction": "18+",
      "averageCompletionDuration": 100000000,
      "gameStory": "Step into the shoes of a real boss and write your own football story in Football Manager 2024, the most complete edition in the series yet.\n",
      "gameBio": "Build a world-class team ready to dominate your rivals in football’s most prestigious competitions. Progress never stops when you’re pursuing footballing greatness."
    }
  ],
  "posts": []
}
```
### 6.3.2 Game Endpoints
#### 6.3.2.1 /game
`/game` <br/>
> Method: GET <br/>
> URI: http://3.125.225.39:8080/game <br/>
> Response: <br/>
>> Status: 200 <br/>
>> Body: <br/>
```
{
  "items": [
    {
      "id": "0453db9b-7086-4228-9a8f-38db68ed4181",
      "title": "The Sims 2",
      "coverLink": "https://hwp.com.tr/wp-content/uploads/2014/07/the_sims2-800x500.jpg",
      "averageRating": 3,
      "platforms": [
        "Android",
        "iOS",
        "Windows",
        "macOS",
        "Xbox"
      ],
      "tags": [
        "Action",
        "Adventure",
        "RPG",
        "Simulation"
      ],
      "followers": 4,
      "developer": "Maxis",
      "publisher": "Electronic Arts",
      "ageRestriction": "12+",
      "averageCompletionDuration": 100,
      "gameStory": "The player creates virtual people called \"Sims\", places them in houses, and helps direct their moods and satisfy their desires.",
      "gameBio": "Play with life and discover the possibilities. Unleash your imagination and create a world of Sims that's wholly unique."
    },
    {
      "id": "0fe0ca96-7b62-4b63-9f30-4f7ae4b39825",
      "title": "Exploding Kittens 2",
      "coverLink": "https://www.explodingkittens.com/cdn/shop/products/ekcb-box-front-left_1600x.png?v=1678405044",
      "averageRating": 3,
      "platforms": [
        "Board Game"
      ],
      "tags": [],
      "followers": 4,
      "developer": "kardelenerdal",
      "publisher": "",
      "ageRestriction": "3+",
      "averageCompletionDuration": null,
      "gameStory": "If you draw exploding kitten, you die! ",
      "gameBio": "Race against the other players to match misfit pancake toppings as fast as possible–everyone plays at the exact same time. "
    },
    {
      "id": "20a93509-957f-447b-afe0-bc448438017d",
      "title": "God of War (2018)",
      "coverLink": "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
      "averageRating": 3,
      "platforms": [
        "Windows",
        "macOS"
      ],
      "tags": [
        "Action",
        "Adventure",
        "Strategy"
      ],
      "followers": 3,
      "developer": "Santa Monica Studio",
      "publisher": "Sony Interactive Entertainment",
      "ageRestriction": "3+",
      "averageCompletionDuration": null,
      "gameStory": "An epic adventure set in Norse mythology...",
      "gameBio": "God of War is an action-adventure game..."
    },
    {
      "id": "32c78a69-3af0-4189-8357-c94d80b8786b",
      "title": "Merge Mansion ",
      "coverLink": "https://scontent.fesb7-1.fna.fbcdn.net/v/t39.30808-6/404318899_860518922748978_4746247590545805169_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jc7Sa9ESUXMAX9N1Kd7&_nc_ht=scontent.fesb7-1.fna&oh=00_AfAkERQCUxECLsS32jGUw3wjHthoSKiBm9eWCJFPGLFotQ&oe=65666E4F",
      "averageRating": null,
      "platforms": [
        "iOS",
        "Android"
      ],
      "tags": [
        "Action",
        "Simulation",
        "Puzzle"
      ],
      "followers": 0,
      "developer": "Metacore",
      "publisher": "Metacore",
      "ageRestriction": "7+",
      "averageCompletionDuration": null,
      "gameStory": "Merge Mansion is a puzzle game where the player completes tasks as the character, Maddie, whose grandmother (Grandma Ursula) owns the mansion.",
      "gameBio": "Merge Mansion is a puzzle game where the player completes tasks as the character, Maddie, whose grandmother (Grandma Ursula) owns the mansion."
    },
    {
      "id": "463efa18-2184-474a-9e0e-f3c175ad167e",
      "title": "Pokemon Blue",
      "coverLink": "https://m.media-amazon.com/images/I/71tFts8ENbL.jpg",
      "averageRating": 3.5782132136609412,
      "platforms": [
        "Nintendo Switch"
      ],
      "tags": [
        "RPG"
      ],
      "followers": 5,
      "developer": "Game Freak",
      "publisher": "Nintendo",
      "ageRestriction": "3+",
      "averageCompletionDuration": 26,
      "gameStory": "The player begins in their hometown of Pallet Town. After venturing alone into the tall grass, the player is stopped by Professor Oak, a famous Pokémon researcher. Professor Oak explains to the player that wild Pokémon may be living there and encountering them alone can be very dangerous.",
      "gameBio": "Pokémon Blue Version are 1996 role-playing video games developed by Game Freak and published by Nintendo for the Game Boy. It is the first installment of the Pokémon video game series."
    },
    {
      "id": "54559867-d6c2-4fc4-a1a9-39987e3d30d3",
      "title": "Temple Run",
      "coverLink": "image",
      "averageRating": null,
      "platforms": [
        "Android"
      ],
      "tags": [
        "Adventure"
      ],
      "followers": 1,
      "developer": "Dunno",
      "publisher": "Dunno",
      "ageRestriction": "7+",
      "averageCompletionDuration": null,
      "gameStory": "Just Run dude!",
      "gameBio": "Running away from a monster"
    },
    {
      "id": "56ed6f8b-7a5f-4e83-a204-f3b3b9a71057",
      "title": "Football Manager 2024",
      "coverLink": "https://cdn.akamai.steamstatic.com/steam/apps/2252570/header.jpg?t=1699889206",
      "averageRating": 4.5,
      "platforms": [
        "Windows",
        "macOS",
        "PlayStation",
        "Xbox",
        "Nintendo Switch"
      ],
      "tags": [
        "Action",
        "Sports",
        "Strategy",
        "Simulation"
      ],
      "followers": 6,
      "developer": "Sports Interactive",
      "publisher": "SEGA",
      "ageRestriction": "18+",
      "averageCompletionDuration": 100000000,
      "gameStory": "Step into the shoes of a real boss and write your own football story in Football Manager 2024, the most complete edition in the series yet.\n",
      "gameBio": "Build a world-class team ready to dominate your rivals in football’s most prestigious competitions. Progress never stops when you’re pursuing footballing greatness."
    },
    {
      "id": "72463626-6d27-4868-a86e-919eda7b9529",
      "title": "Stardew Valley",
      "coverLink": "https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg?t=1666917466",
      "averageRating": null,
      "platforms": [
        "Windows",
        "macOS"
      ],
      "tags": [
        "Multiplayer",
        "Farming",
        "Life-Sim",
        "Pixel"
      ],
      "followers": 1,
      "developer": "ConcernedApe",
      "publisher": "ConcernedApe",
      "ageRestriction": "Everyone",
      "averageCompletionDuration": null,
      "gameStory": "Ever since Joja Corporation came to town, the old ways of life have all but disappeared. The community center, once the town's most vibrant hub of activity, now lies in shambles. But the valley seems full of opportunity. With a little dedication, you might just be the one to restore Stardew Valley to greatness!",
      "gameBio": "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?"
    },
    {
      "id": "73d02f31-f1b3-4866-8a53-871388ffc3fd",
      "title": "Exploding Kittens",
      "coverLink": "https://www.explodingkittens.com/cdn/shop/products/ekcb-box-front-left_1600x.png?v=1678405044",
      "averageRating": 4,
      "platforms": [
        "Board Game"
      ],
      "tags": [
        "cards",
        "chaos"
      ],
      "followers": 1,
      "developer": "None",
      "publisher": "Matthew Inman",
      "ageRestriction": "Mature",
      "averageCompletionDuration": null,
      "gameStory": "Exploding Kittens is a highly-strategic, kitty powered version of Russian Roulette.",
      "gameBio": "Race against the other players to match misfit pancake toppings as fast as possible–everyone plays at the exact same time. "
    },
    {
      "id": "73d2ef39-0852-4f43-9d07-90a80fa5002f",
      "title": "Sims 4",
      "coverLink": "https://cdn1.epicgames.com/offer/2a14cf8a83b149919a2399504e5686a6/EGS_TheSims4_ElectronicArts_S2_1200x1600-ceadc3bd1e6f885ad64d9f115f51f5c0",
      "averageRating": null,
      "platforms": [
        "Windows",
        "macOS",
        "Xbox",
        "PlayStation"
      ],
      "tags": [
        "Simulation"
      ],
      "followers": 0,
      "developer": "Maxis",
      "publisher": "Electronic Arts",
      "ageRestriction": "12+",
      "averageCompletionDuration": 20,
      "gameStory": "The game provides open-ended gameplay, allowing players to create Sims, build homes, develop relationships, pursue careers, and explore various life situations without a specific linear story.",
      "gameBio": "The Sims 4 is a life simulation game developed by Maxis and published by Electronic Arts. It allows players to create and control simulated characters (Sims) and customize their lives, relationships, homes, and neighborhoods."
    }
  ],
  "meta": {
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 2,
    "currentPage": 1
  }
}
```
### 6.3.3 Post Endpoints
#### 6.3.3.1 /post
`/post` <br/>
> Method: POST <br/>
> URI: http://3.125.225.39:8080/post <br/>
> Request Body: <br/>
```
{
  "title": "Which stadium is the best?",
  "body": "I could not sleep, I wanna start a discussion. I wonder which stadium do you like most?",
  "gameId": "56ed6f8b-7a5f-4e83-a204-f3b3b9a71057",
  "media": [],
  "tags": [
    "stadium",
    "fm24"
  ]
}
```
> Response: <br/>
>> Status: 200 <br/>
>> Body: <br/>
```
{
  "id": "17ac5cbb-43f3-437e-9622-c2c8139d0381",
  "title": "Which stadium is the best?",
  "body": "I could not sleep, I wanna start a discussion. I wonder which stadium do you like most?",
  "media": [],
  "tags": [
    "stadium",
    "fm24"
],
  "createdAt": "2023-11-29T07:22:27.565Z"
}
```
`/post?page=1&limit=5&isLiked=false&isDisliked=false&order=ASC` <br/>
> Method: GET <br/>
> URI: http://3.125.225.39:8080/post?page=1&limit=5&isLiked=false&isDisliked=false&order=ASC <br/>

> Response: <br/>
>> Status: 200 <br/>
>> Body: <br/>
```
{
  "items": [
    {
      "id": "a948aed2-d9b0-44c7-af2a-309cde427064",
      "title": "The Sims 2 Nostalgia Thread: Reliving Virtual Lives and Building Dreams",
      "game": {
        "id": "0453db9b-7086-4228-9a8f-38db68ed4181",
        "title": "The Sims 2",
        "coverLink": "https://hwp.com.tr/wp-content/uploads/2014/07/the_sims2-800x500.jpg",
        "gameBio": "Play with life and discover the possibilities. Unleash your imagination and create a world of Sims that's wholly unique.",
        "releaseDate": "2004-10-24",
        "developer": "Maxis",
        "averageCompletionDuration": 100
      },
      "user": {
        "id": "1a3d4071-b494-4d58-ad56-37df21e81e33",
        "username": "haticerk",
        "email": "haticeeerk@gmail.com",
        "avatar": "https://ludos.s3.us-east-2.amazonaws.com/1701110988361Unbenanntes%20Bild.png",
        "fullName": "Hatice Erk"
      },
      "body": "Hey Simmers!Welcome to \"The Sims 2 Nostalgia Thread,\" a space dedicated to the beloved classic that captured our hearts and sparked our creativity - The Sims 2! Whether you're a seasoned player who's been building virtual lives since its release in 2004 or a newcomer curious about the roots of the Sims franchise, this thread is for you.🏡 Share Your Stories: Dive into the memories of your favorite Sims, the epic love stories, and the unexpected plot twists that unfolded in your gameplay. Don't forget to tell us about the iconic families you created and the challenges you conquered.",
      "media": [
        ""
      ],
      "numberOfLikes": 1,
      "numberOfDislikes": 1,
      "tags": [
        "sims2",
        "nostalgia"
      ],
      "createdAt": "2023-11-24T21:50:42.525Z",
      "isLiked": false,
      "isDisliked": false
    },
    {
      "id": "9c0f9740-102c-4f09-8382-2b76af2b6486",
      "title": "Can a 9-year-old play sims 3",
      "game": {
        "id": "c0f8c359-2ae2-4892-be01-32d9cb41f4dc",
        "title": "Sims 3",
        "coverLink": "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
        "gameBio": "God of War is an action-adventure game...",
        "releaseDate": "2018-04-20",
        "developer": "Santa Monica Studio",
        "averageCompletionDuration": null
      },
      "user": {
        "id": "428d8c2d-2cbf-4d20-97ba-474dae097e49",
        "username": "elif",
        "email": "elifkizilkaya@hotmail.com",
        "avatar": "https://ludos.s3.us-east-2.amazonaws.com/170103210912267d14cb02e8f993653f9cfcce10f5924.jpg",
        "fullName": "elif kizilkaya"
      },
      "body": "I bought a new computer. My daughter wants to play sims 3 but i dont know that game is ok for her? What do you think???",
      "media": [
        "{\"url\":\"https://ludos.s3.us-east-2.amazonaws.com/914c08980786a6124310a2799c10e432\"}"
      ],
      "numberOfLikes": 0,
      "numberOfDislikes": 0,
      "tags": [
        "sims3",
        "life",
        "question"
      ],
      "createdAt": "2023-11-24T23:23:01.866Z",
      "isLiked": false,
      "isDisliked": false
    },
    {
      "id": "0817cedc-89af-4445-8ba8-4c008dcdb71c",
      "title": "Is worth playing?",
      "game": {
        "id": "0453db9b-7086-4228-9a8f-38db68ed4181",
        "title": "The Sims 2",
        "coverLink": "https://hwp.com.tr/wp-content/uploads/2014/07/the_sims2-800x500.jpg",
        "gameBio": "Play with life and discover the possibilities. Unleash your imagination and create a world of Sims that's wholly unique.",
        "releaseDate": "2004-10-24",
        "developer": "Maxis",
        "averageCompletionDuration": 100
      },
      "user": {
        "id": "1a3d4071-b494-4d58-ad56-37df21e81e33",
        "username": "haticerk",
        "email": "haticeeerk@gmail.com",
        "avatar": "https://ludos.s3.us-east-2.amazonaws.com/1701110988361Unbenanntes%20Bild.png",
        "fullName": "Hatice Erk"
      },
      "body": "Hello, I am new in gaming. Is it worth to buy?",
      "media": [
        ""
      ],
      "numberOfLikes": 0,
      "numberOfDislikes": 1,
      "tags": [],
      "createdAt": "2023-11-25T11:07:43.642Z",
      "isLiked": false,
      "isDisliked": false
    },
    {
      "id": "5de04ad4-9967-4b1b-b40a-4c80ff9f3918",
      "title": "download link",
      "game": {
        "id": "463efa18-2184-474a-9e0e-f3c175ad167e",
        "title": "Pokemon Blue",
        "coverLink": "https://m.media-amazon.com/images/I/71tFts8ENbL.jpg",
        "gameBio": "Pokémon Blue Version are 1996 role-playing video games developed by Game Freak and published by Nintendo for the Game Boy. It is the first installment of the Pokémon video game series.",
        "releaseDate": "1998-09-28",
        "developer": "Game Freak",
        "averageCompletionDuration": 26
      },
      "user": {
        "id": "e9216980-7ddb-4744-a87c-853a0c38d96c",
        "username": "kardelenerdal19",
        "email": "kardelenerdal19@gmail.com",
        "avatar": " ",
        "fullName": "Kardelen Erdal"
      },
      "body": "how can I download Pokemon pls help it's urgent ",
      "media": [
        ""
      ],
      "numberOfLikes": 0,
      "numberOfDislikes": 0,
      "tags": [
        "download",
        "link",
        "help",
        "me"
      ],
      "createdAt": "2023-11-25T18:54:26.194Z",
      "isLiked": false,
      "isDisliked": false
    },
    {
      "id": "c108b0f2-ddfa-41c4-93b8-ddb6dca439b1",
      "title": "Strategy Question",
      "game": {
        "id": "0fe0ca96-7b62-4b63-9f30-4f7ae4b39825",
        "title": "Exploding Kittens 2",
        "coverLink": "https://www.explodingkittens.com/cdn/shop/products/ekcb-box-front-left_1600x.png?v=1678405044",
        "gameBio": "Race against the other players to match misfit pancake toppings as fast as possible–everyone plays at the exact same time. ",
        "releaseDate": "2016-10-24",
        "developer": "kardelenerdal",
        "averageCompletionDuration": null
      },
      "user": {
        "id": "e9216980-7ddb-4744-a87c-853a0c38d96c",
        "username": "kardelenerdal19",
        "email": "kardelenerdal19@gmail.com",
        "avatar": " ",
        "fullName": "Kardelen Erdal"
      },
      "body": "Do I use my See the Future to try to predict where the Exploding Kitten is and strategically skip it, or do I hold onto it in hopes of using it defensively if someone targets me with an attack card?",
      "media": [
        "data:image/jpeg;base64,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"
      ],
      "numberOfLikes": 0,
      "numberOfDislikes": 1,
      "tags": [
        "future",
        "card"
      ],
      "createdAt": "2023-11-26T08:30:48.429Z",
      "isLiked": false,
      "isDisliked": false
    }
  ],
  "meta": {
    "itemCount": 5,
    "itemsPerPage": 5,
    "totalPages": 4,
    "currentPage": 1
  }
}
```
#  **7. Unit Test Reports**<a name="unit-test-reports" />

##  **7.1. For Backend**<a name="for-backend" />
* We have created unit tests for some of the controller functions. The tests may be run with the ```npm test``` command. The results of the tests can be found in the picture below.
![Screenshot 2023-12-01 at 11.09.03](https://hackmd.io/_uploads/rJxdrfDHT.png)

##  **7.2. For Frontend**<a name="for-frontend" />

 Given the nature of frontend development, we prioritized manual testing approaches to ensure the functionality, usability, and overall user experience of our pages and components.Each frontend component was tested both individually and by reviewer to verify its functionality and responsiveness. This included testing buttons, input fields, navigation elements, and other interactive features. When we opened a pull request reviewer of the pull request tested newly added functionalities on his/her own local development environment.
Scenarios imitating typical user interactions were executed to test the flow and usability of the application. This included tasks like form submissions, navigation between pages, and handling of user inputs.
**Functionality:** All components and pages functioned as expected. Interactive elements responded correctly to user inputs, and data flow between the frontend and backend was smooth.
**Usability:** The application proved to be user-friendly. Navigation was intuitive, and the interface elements were accessible and easy to understand.
**Responsiveness:** The application displayed some issues about responsiveness. Some components and our main layout can be improved to be more compatible with smaller screens and tablets.
**Issues Identified:** In additions to a few responsiveness problems as I mentioned above, we may make some improvements to our UI/UX designs with respect to topics that are discussed in lectures and slides.


##  **7.3. For Mobile**<a name="for-mobile" />
* Functional Testing: Our app's core functions have been thoroughly examined, confirming that it operates precisely as specified in the requirements.

* Usability Testing: The user-friendliness and intuitiveness of our app have been meticulously evaluated, resulting in an interface that is not only easy to navigate but also enhances overall customer experience.

* Performance Testing: Our app has demonstrated optimal behavior under diverse loads, assuring users of consistent and reliable performance even during peak usage.

* Installation Testing: The installation and uninstallation processes of our app have been thoroughly scrutinized, ensuring a smooth experience for users. Additionally, updates are seamlessly implemented, contributing to a hassle-free user journey.

* Exploratory Testing: Our app has undergone extensive exploration of functionalities and usability, uncovering potential issues and ensuring that it functions precisely as intended.

In summary, the successful completion of these tests attests to the quality and dependability of our mobile app, providing users with a seamless and enjoyable experience while meeting the highest standards of performance, functionality, compatibility, usability, and installation processes

# **8. General Test Plan**<a name="general-test-plan" />

* Our general test plan for the backend is based on creating unit tests for our API functions. We are using the jest framework for unit testing. We are mocking our repository layer functions so that we do not need a database connection while running the tests. We have created a GitHub Actions workflow that runs unit tests when a pull request that includes changes in the backend folder is created. This workflow also runs ```npm run build``` and ```npm run lint``` commands to check build errors and format errors.
* Our general test plan for the frontend is is to continue with the manual testing approach we have been using so far. This is the fastest and easiest way of testing the frontend. Since we are testing on both local and dockerized environment catching errors is not hard for us. Mimmicking the user scenarios every week is also make it easier for us to see errors beforehand. However we may also make research about frontend testing tools and we can use it in future if we find any suitable with our team.
* Our general test plan for the mobile is to systematically test our mobile app for functionality, compatibility, usability, and performance. This includes defining test cases for functional, compatibility, usability, performance, installation, and exploratory testing. Tools and technologies will be employed as needed, and sign-off criteria will guide the approval process. The plan will undergo a review and approval before execution to ensure a structured approach and guarantee the app's quality and reliability.


# **9. The Status of the Features for Annotation**<a name="the-status-of-the-features-for-annotation" />

We have developed several pages, and the significance of annotation technology is particularly notable, especially in the context of game, entity and forum sections. However, we have not started to implement this functionality on our project. We researched and discussed about which pages are able to represent annotation.  

# **10. Plans for Implementing Functionalities Associated with Annotations**<a name="implement-functions-annotations" />

The annotations are planned to be implemented especially in the context of game, entity and forum sections. As we planned, annotation technology plays a crucial role by allowing users to add tags, notes, or comments to various content. In the context of game pages, this functionality enables users to engage more deeply with information related to games. For instance, users can contribute game reviews, share tips, or provide their own insights by adding notes, creating a more enriched interaction among the user community. For instance, if there is a wrong information related to game, user can annotate for wrong text.

In the entity pages, user can be able to annotate and leave a note for related information about the characters, dlc's, characters, environments and items.  

In the forum sections, annotation technology enhances user interactions by enabling features such as marking topics, participating in discussions, and adding personal thoughts to content. The integration of annotation technology is aimed at reaching a stronger sense of community and facilitating closer engagement among users.


According to our research, we aim to update all text elements within our Flutter mobile application to utilize the SelectableText widget. This enhancement will enable users to select and annotate text of varying lengths within the application.

The addition of annotation technology is anticipated to significantly enhance user participation and overall user experience on both game and forum pages.

#  **11. Individual Contribution Reports**<a name="individual-contribution-reports" />

While preparing your report, provide the necessary references to your work (e.g., pull requests, issues, etc.) on GitHub. This section should only include your personal contributions between Customer Milestone 1 and Customer Milestone 2. Each member should add a subsection under the individual contributions section in the following format.

* ###  **Member:** (name)
* ### **Responsibilities:** 

The overall description of responsibilities assigned to you.

* ###  **Main contributions:** 

The overall description of your contributions to the project until Customer Milestone 1.

* ###  **Code-related significant issues:**

 Your issues (that you have resolved or reviewed significantly) that contribute to the code base demonstrated during the demo.

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| ---            | ---            |


*  ###  **Management-related significant issues:** 

Your issues (that you have resolved or reviewed significantly) that contribute to the management of the project.

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| ---            | ---            |


* ### **Pull requests:** 
You have created, merged, and reviewed. Please also briefly summarize what the conflict was (if you had any) and how it was resolved regarding the pull requests you have reviewed.

| Created PR | Conflict | How It Resolved |
| ---        | ---      | ----            |
| ---        | ---      | ----            |

| Merged/Reviewed PR | Conflict | How It Resolved |
| ---                | ---      |  ----           |
| ---                | ---      |   ----          |

* ### **Additional information:** 

Mention any additional task you have performed that is not listed above.

### <ins>Fatma Sena Alçı</ins><a name="fatma-sena-alci"/>
- **Member**: Fatma Sena Alçı - 2019400045 - Group 7 - Mobile Team
- **Responsibilities**:  I have been assigned to work on game page and game related pages. Other than that, I created change password page. Also, I connected them to our backend service.
- **Main contributions**: 
  - I implemented change password page and connected it to the backend with token control. 
  - I created game page with mock data to argue with my sub-teammates.
  - According to our feedbacks, I revised game page, I converted it to a generic type, deleted mock data and connected it to the backend.
  - I implemented tags and platforms scrollable in game and games pages.
  - I created a new page for game properties because the properties does not fit in our game page and it doesn't look nice.
  - I handled games with unavailable photos to improve appearance.
  - I implemented edit user profile page functionality and connect it to the backend.
  - I attended a meeting for milestone scenario preparation. 
  - I created two games in database.
 * ###  **Code-related significant issues:**


| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#416](https://github.com/bounswe/bounswe2023group7/issues/416) [#420](https://github.com/bounswe/bounswe2023group7/issues/420) [#467](https://github.com/bounswe/bounswe2023group7/issues/467) [#535](https://github.com/bounswe/bounswe2023group7/issues/535) [#536](https://github.com/bounswe/bounswe2023group7/issues/536) [#537](https://github.com/bounswe/bounswe2023group7/issues/537) [#538](https://github.com/bounswe/bounswe2023group7/issues/538)            | [#466](https://github.com/bounswe/bounswe2023group7/issues/466) [#524](https://github.com/bounswe/bounswe2023group7/issues/524) [#531](https://github.com/bounswe/bounswe2023group7/issues/531) [#532](https://github.com/bounswe/bounswe2023group7/issues/532) [#522](https://github.com/bounswe/bounswe2023group7/issues/522) [#605](https://github.com/bounswe/bounswe2023group7/issues/605)           | 

*  ###  **Management-related significant issues:** 

Your issues (that you have resolved or reviewed significantly) that contribute to the management of the project.

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#509](https://github.com/bounswe/bounswe2023group7/issues/509) [#600](https://github.com/bounswe/bounswe2023group7/issues/600)            | [#543](https://github.com/bounswe/bounswe2023group7/issues/543) [#616](https://github.com/bounswe/bounswe2023group7/issues/616)           |
- **Reviewed Issues and PRs**:

| Created PR | Conflict | How It Resolved |
| ---        | ---      | ----            |
| [#446](https://github.com/bounswe/bounswe2023group7/pull/446)        | ---      | No conflict            |
| [#465](https://github.com/bounswe/bounswe2023group7/pull/465)        | ---      | No conflict            |
| [#496](https://github.com/bounswe/bounswe2023group7/pull/496)        | ---      | No conflict            |
| [#563](https://github.com/bounswe/bounswe2023group7/pull/563)        | One import line was missing. | Dev merged into my branch.
| [#567](https://github.com/bounswe/bounswe2023group7/pull/567)        | Space difference caused conflict.    | New change is prioritized.|
| [#576](https://github.com/bounswe/bounswe2023group7/pull/576)        | ---      | No conflict    |
| [#599](https://github.com/bounswe/bounswe2023group7/pull/599)        | A function is missing.      | Dev merged into my branch. |


| Merged/Reviewed PR | Conflict | How It Resolved |
| ---                | ---      |  ----           |
| [#493](https://github.com/bounswe/bounswe2023group7/pull/493)                | ---     |   No conflict           |
| [#580](https://github.com/bounswe/bounswe2023group7/pull/580)                | ---     |   No conflict           |
| [#588](https://github.com/bounswe/bounswe2023group7/pull/588)                | ---     |   No conflict           |
| [#589](https://github.com/bounswe/bounswe2023group7/pull/589)                | ---     |   No conflict           |
| [#606](https://github.com/bounswe/bounswe2023group7/pull/606)                | ---     |   No conflict           |
| [#607](https://github.com/bounswe/bounswe2023group7/pull/607)                | ---     |   No conflict           |
- **Additional information**: As the mobile team, we worked very coordinated. In the code related reviewed issues section, I added the issues that were closed via the PR's that I merged, not the ones I am a reviewer for because their PR's sometimes approved another teammate.

--------------------------  

### <ins>Yunus Emre Altuğ</ins><a name="yunus-emre-altug" />
-  **Member**: Yunus Emre Altuğ - 2019400057 - Group 7 - Frontend Team
- **Responsibilities**: I have been assigned to work on game page functionalities, review functionalities and profile page of the users at this milestone.
- **Main contributions**: 
  - I revised the design of the game page after milestone 1. This revisions include the basic information box of the game and tabs.
      - I added submit duration functionality to game page.
      - I added follow-unfollow functionality to game page.
      - I added backend connection of the game page.
      - I added backend connection of the reviews.
      - I added like dislike functionality for the reviews.
      - I added create review functionality for the game page.
      - I added edit review functionality for the game page.
      - I added delete review functionality for the game page.
      - I added the display of the posts to the game page.
  - I created profile page for the game page after milestone 2. These implementations include the design and backend connection of the profile page.
      - I designed the profile page of a user.
      - I added profile information to the profile page.
      - I added favorite games section to the profile page.
      - I added edit profile modal to the profile page.
      - I added upload profile photo functionality.
      - I arranged the profile page's visibility for owner of the profile, users and guests.
   - I researched about annotation with Kardelen Erdal.
- **Code related significant issues assigned**: [#421](https://github.com/bounswe/bounswe2023group7/issues/421), [#422](https://github.com/bounswe/bounswe2023group7/issues/422), [#423](https://github.com/bounswe/bounswe2023group7/issues/423), [#462](https://github.com/bounswe/bounswe2023group7/issues/462), [#464](https://github.com/bounswe/bounswe2023group7/issues/464), [#508](https://github.com/bounswe/bounswe2023group7/issues/508), [#510](https://github.com/bounswe/bounswe2023group7/issues/510), 
[#545](https://github.com/bounswe/bounswe2023group7/issues/545), [#609](https://github.com/bounswe/bounswe2023group7/issues/609), 
- **Management related significant issues assigned**: [#463](https://github.com/bounswe/bounswe2023group7/issues/463), [#618](https://github.com/bounswe/bounswe2023group7/issues/618), 
- **Code related significant issues reviewed**:[#429](https://github.com/bounswe/bounswe2023group7/issues/429), [#434](https://github.com/bounswe/bounswe2023group7/issues/434), [#471](https://github.com/bounswe/bounswe2023group7/issues/471), [#472](https://github.com/bounswe/bounswe2023group7/issues/472), [#475](https://github.com/bounswe/bounswe2023group7/issues/475), [#506](https://github.com/bounswe/bounswe2023group7/issues/506), [#514](https://github.com/bounswe/bounswe2023group7/issues/514), [#554](https://github.com/bounswe/bounswe2023group7/issues/554), [#573](https://github.com/bounswe/bounswe2023group7/issues/573), [#575](https://github.com/bounswe/bounswe2023group7/issues/575),        
- **Management related significant issues reviewed**:[#509](https://github.com/bounswe/bounswe2023group7/issues/509),
- **Pull requests assigned**: [#439](https://github.com/bounswe/bounswe2023group7/issues/439), [#449](https://github.com/bounswe/bounswe2023group7/issues/449), [#455](https://github.com/bounswe/bounswe2023group7/issues/455), [#485](https://github.com/bounswe/bounswe2023group7/issues/485), [#494](https://github.com/bounswe/bounswe2023group7/issues/494), [#550](https://github.com/bounswe/bounswe2023group7/issues/550), [#584](https://github.com/bounswe/bounswe2023group7/issues/584), [#597](https://github.com/bounswe/bounswe2023group7/issues/597), [#611](https://github.com/bounswe/bounswe2023group7/issues/611), [#612](https://github.com/bounswe/bounswe2023group7/issues/612)  
- **Pull requests reviewed**: [#438](https://github.com/bounswe/bounswe2023group7/issues/438), [#447](https://github.com/bounswe/bounswe2023group7/issues/447), [#453](https://github.com/bounswe/bounswe2023group7/issues/453), [#495](https://github.com/bounswe/bounswe2023group7/issues/495), [#516](https://github.com/bounswe/bounswe2023group7/issues/516), [#541](https://github.com/bounswe/bounswe2023group7/issues/541), [#554](https://github.com/bounswe/bounswe2023group7/issues/554), [#568](https://github.com/bounswe/bounswe2023group7/issues/568), [#572](https://github.com/bounswe/bounswe2023group7/issues/572), [#579](https://github.com/bounswe/bounswe2023group7/issues/579), [#583](https://github.com/bounswe/bounswe2023group7/issues/583), [#608](https://github.com/bounswe/bounswe2023group7/issues/608),
- **Additional information**:

--------------------------  

### <ins>Ömer Şafak Bebek</ins><a name="omer-safak-bebek" />

-  **Member**: Ömer Şafak Bebek - 2019400180 - Group 7 - Backend Team
- **Responsibilities**: My main responsibilities were creating endpoints for post, entity, and completion duration features. 
- **Main contributions**: 
  - I created list games endpoint.
  - I updated fields of the user entity according to the class diagram.
  - I fixed the memory issue that is caused by aws-sdk package.
  - I created endpoints for post feature.
  - I created a search endpoint that searches users, posts and games in our database.
  - I created endpoints for entity feature.
  - I revisioned the upload endpoint.
  - I created endpoints for game completion duration feature.
- **Code related significant issues**: [#425](https://github.com/bounswe/bounswe2023group7/issues/425), [#426](https://github.com/bounswe/bounswe2023group7/issues/426), [#448](https://github.com/bounswe/bounswe2023group7/issues/448), [#474](https://github.com/bounswe/bounswe2023group7/issues/474), [#477](https://github.com/bounswe/bounswe2023group7/issues/477), [#525](https://github.com/bounswe/bounswe2023group7/issues/525), [#526](https://github.com/bounswe/bounswe2023group7/issues/526), [#527](https://github.com/bounswe/bounswe2023group7/issues/527), [#528](https://github.com/bounswe/bounswe2023group7/issues/528)
- **Pull requests**: [#441](https://github.com/bounswe/bounswe2023group7/pull/441), [#442](https://github.com/bounswe/bounswe2023group7/pull/442), [#443](https://github.com/bounswe/bounswe2023group7/pull/443), [#445](https://github.com/bounswe/bounswe2023group7/pull/445), [#450](https://github.com/bounswe/bounswe2023group7/pull/450), [#480](https://github.com/bounswe/bounswe2023group7/pull/480), [#492](https://github.com/bounswe/bounswe2023group7/pull/492), [#498](https://github.com/bounswe/bounswe2023group7/pull/498), [#499](https://github.com/bounswe/bounswe2023group7/pull/499), [#547](https://github.com/bounswe/bounswe2023group7/pull/547), [#551](https://github.com/bounswe/bounswe2023group7/pull/551), [#552](https://github.com/bounswe/bounswe2023group7/pull/552), [#556](https://github.com/bounswe/bounswe2023group7/pull/556), [#558](https://github.com/bounswe/bounswe2023group7/pull/558), [#559](https://github.com/bounswe/bounswe2023group7/pull/559), [#560](https://github.com/bounswe/bounswe2023group7/pull/560), [#564](https://github.com/bounswe/bounswe2023group7/pull/564), [#574](https://github.com/bounswe/bounswe2023group7/pull/574)
- **Additional information**: 
--------------------------  

### [Kardelen Erdal](https://github.com/bounswe/bounswe2023group7/wiki/Milestone%E2%80%902-Individual-Contributions-%E2%80%90-Kardelen-Erdal) <a name="kardelen-erdal" />
-  **Member**: Kardelen Erdal - 2018400024 - Group 7 - Mobile Team
* **Responsibilities:** 
I was assigned the task of Create Game and Edit Game pages. I implemented them from scratch and made revisions according to feedbacks and discussions. I connected the Forgot Password page to the backend endpoints. I was assigned to implement Entity related pages. I resolved some UI issues and missing fields that I saw in other pages like Games page, Search Game page, etc. I was assigned to make research on Annotation on Mobile Apps. I was responsible for removing the test data from the database. Also, I created .apk file with Hatice Erk and I was responsible for the mobile application part in the milestone presentation. 
* **Main contributions:** 
    - I implemented the Forgot Password Page with the backend connection using verifyCode and changePassword endpoints.
    - I implemented Create Game Pages. Firstly, I implemented all fields of a game in the same page, but according to the feedbacks and the discussion with Elif Kızılkaya (Frontend), I divided Create Game into two pages for a better user experience.
    - I changed the location of Create Game button so that user can see it even if the page is scrolled.
    - In Login and Signup pages, the user was not able to see their password. I implemented a show/hide password button for those pages.
    - I added a default image for the games that have no coverlink.
    - I implemented Edit Game Pages and connected it to editGame endpoint. 
    - I implemented Create Entity Page with a backend connection, where user can access from the game page.
    - After the discussion with Elif Kızılkaya (frontend), I made changes on the options in Create Game and Edit Game pages.
    - I and Hatice Erk, implemented the navigation to the user profile when clicked from threads, comments and reviews.
    - While testing our buttons and endpoints, we created lots of test data in our database. And those were seen in our mobile application. For the customer presentation, I removed all the dumb data from the database.
    - I and Hatice Erk created .apk file for the milestone report.
    - I added the average rating with a rating icon, in game pages and game summaries.
    - In Games page, I changed the default Game Story field with the reply that we get from the endpoint.
    - I and Yunus Emre Altuğ made research on how to use annotation in our mobile application and on website.
    - I attended the Preparation of User Scenario for Milestone 2 meeting (Meeting #6). We prepared the scenario and the presentation.
    - I wrote the Meeting Notes #6.
    - I and Elif Kızılkaya had a discussion on resolving the inconsistency in some fields of game.
    - In the milestone presentation, I presented the mobile application part.

* **Code-related significant issues:**

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#414](https://github.com/bounswe/bounswe2023group7/issues/414), [#417](https://github.com/bounswe/bounswe2023group7/issues/417), [#459](https://github.com/bounswe/bounswe2023group7/issues/459), [#460](https://github.com/bounswe/bounswe2023group7/issues/460), [#461](https://github.com/bounswe/bounswe2023group7/issues/461),  [#521](https://github.com/bounswe/bounswe2023group7/issues/521),[#522](https://github.com/bounswe/bounswe2023group7/issues/522),   [#523](https://github.com/bounswe/bounswe2023group7/issues/523), [#524](https://github.com/bounswe/bounswe2023group7/issues/524), [#594](https://github.com/bounswe/bounswe2023group7/issues/594), [#595](https://github.com/bounswe/bounswe2023group7/issues/595), [#596](https://github.com/bounswe/bounswe2023group7/issues/596), [#603](https://github.com/bounswe/bounswe2023group7/issues/603) | [#420](https://github.com/bounswe/bounswe2023group7/issues/420), [#530](https://github.com/bounswe/bounswe2023group7/issues/530), [#533](https://github.com/bounswe/bounswe2023group7/issues/533), [#535](https://github.com/bounswe/bounswe2023group7/issues/535), [#570](https://github.com/bounswe/bounswe2023group7/issues/570) |



* **Management-related significant issues:** 

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#463](https://github.com/bounswe/bounswe2023group7/issues/463), [#509](https://github.com/bounswe/bounswe2023group7/issues/509), [#513](https://github.com/bounswe/bounswe2023group7/issues/513), [#542](https://github.com/bounswe/bounswe2023group7/issues/542), [#618](https://github.com/bounswe/bounswe2023group7/issues/618)            | [#436](https://github.com/bounswe/bounswe2023group7/issues/436), [#613](https://github.com/bounswe/bounswe2023group7/issues/613)  |

* **Pull requests:** 

| Created PR | Conflict | How It Resolved |
| ---            | ---            | --- |
| [#440](https://github.com/bounswe/bounswe2023group7/pull/440) | Some functions in API Service was missing. | Merged the development to my branch. |
| [#444](https://github.com/bounswe/bounswe2023group7/pull/444) | No Conflict | No Conflict |
| [#470](https://github.com/bounswe/bounswe2023group7/pull/470) | No Conflict | No Conflict |
| [#484](https://github.com/bounswe/bounswe2023group7/pull/484) | No Conflict | No Conflict |
| [#539](https://github.com/bounswe/bounswe2023group7/pull/539) | No Conflict | No Conflict |
| [#580](https://github.com/bounswe/bounswe2023group7/pull/580) | No Conflict | No Conflict |
| [#581](https://github.com/bounswe/bounswe2023group7/pull/581) | No Conflict | No Conflict |
| [#598](https://github.com/bounswe/bounswe2023group7/pull/598) | No Conflict | No Conflict |
| [#604](https://github.com/bounswe/bounswe2023group7/pull/604) | No Conflict | No Conflict |
| [#606](https://github.com/bounswe/bounswe2023group7/pull/606) | No Conflict | No Conflict |



| Merged/Reviewed PR | Conflict | How It Resolved |
| ---            | ---            | --- |
| [#419](https://github.com/bounswe/bounswe2023group7/pull/419) | No Conflict | No Conflict |
| [#437](https://github.com/bounswe/bounswe2023group7/pull/437) | No Conflict | No Conflict |
| [#451](https://github.com/bounswe/bounswe2023group7/pull/451) |No Conflict | No Conflict |
| [#465](https://github.com/bounswe/bounswe2023group7/pull/465) | No Conflict | No Conflict |
| [#496](https://github.com/bounswe/bounswe2023group7/pull/496) | No Conflict | No Conflict |
| [#500](https://github.com/bounswe/bounswe2023group7/pull/500) | No Conflict | No Conflict |
| [#561](https://github.com/bounswe/bounswe2023group7/pull/561) |  When navigating to the *Create Game* page from the *Games* page, if the user is not logged in, we show a message and a button to navigate the user to *Log in* page. It is a merge conflict. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/561/commits/fd4a90ccd32b28f2a68d0f54cf53f11f42460eda) |
| [#567](https://github.com/bounswe/bounswe2023group7/pull/567) | Token and UserProvider was missing in fetchData in Games page. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/567/commits/476e2361fe7a9719e3279fa2bf8e460a82d4cacc) |
| [#569](https://github.com/bounswe/bounswe2023group7/pull/569) | Some functions were missing in API Service|[Related Commit](https://github.com/bounswe/bounswe2023group7/pull/569/commits/66ad3d6318089d052b6ad9277acae0545d19ddf8) |
| [#577](https://github.com/bounswe/bounswe2023group7/pull/577) | No Conflict | No Conflict |
| [#582](https://github.com/bounswe/bounswe2023group7/pull/582) | Edit Game request function was not added to this branch, so it gave merge error.  |  [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/582/commits/b7a6c64702b2e2ce9e393a221c660fe7024947b9) |
| [#602](https://github.com/bounswe/bounswe2023group7/pull/602) | No Conflict | No Conflict |


- **Additional information**: I took notes and wrote Meeting #6 notes. I presented the mobile part in milestone presentation and answered questions from the audience. I conducted research on how to make annotations in a mobile application. I reviewed and tested the tasks done by the mobile team. I attended all lectures, labs, mobile and general team meetings. On 27.11.2023, we checked everything and created the tag customer-milestone-2 with Elif Kızılkaya and Hatice Erk. I wrote the milestone summary.
--------------------------  

### <ins>Hatice Erk</ins><a name="hatice-erk"/>

- **Member**: Hatice Erk - 2018400090 - Group 7 - Mobile Team
- **Responsibilities**: 
I had important tasks in my role, the forum for games by connecting the backend for the forum page, thread pages, and reviews. I also improved the Android app icon and name on the screen. I updated the home page for better, added a search option to the forum, and improved the user profile navigation. I fixed issues like the like/dislike bug and updated folders' README's with new .apk links.
- **Main Contributions**:
    - I contributed the lab reports [#5](https://github.com/bounswe/bounswe2023group7/blob/development/reports/lab_report_5.md) and [#6](https://github.com/bounswe/bounswe2023group7/blob/development/reports/lab_report_6.md).
    - I updated android app icon and the name shown in the screen.
    - I created the forum page for the games with backend connections.
        - I implemented the create thread page.
        - I implemented the forum page.
        - I implemented the individual thread pages.
    - I added the review functionality to the games with backend connections.
        - I implemented the create review section with rating.
        - I implemented the reviews part in a game page.
        - I implemented the all reviews page.
    - I added the comments of the threads with backend connections.
        - I implemented the add comment section.
        - I implemented listing of the comments under the threads.
    - I reorganized the home page, which lists the favorite games and trending topics.
    - I added search funtionality to the forum.
    - I updated navigations with the user profile. 
    - I partly solved the like/dislike bug.
    - I updated the mobile and Ludos folders with new .apk link. 
    - I was the driver of the customer presentation.

- **Code related significant issues**: 

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#306](https://github.com/bounswe/bounswe2023group7/issues/306) [#427](https://github.com/bounswe/bounswe2023group7/issues/427) [#479](https://github.com/bounswe/bounswe2023group7/issues/479) [#531](https://github.com/bounswe/bounswe2023group7/issues/531) [#532](https://github.com/bounswe/bounswe2023group7/issues/532) [#533](https://github.com/bounswe/bounswe2023group7/issues/533) [#570](https://github.com/bounswe/bounswe2023group7/issues/570) [#594](https://github.com/bounswe/bounswe2023group7/issues/594) [#596](https://github.com/bounswe/bounswe2023group7/issues/596) [#605](https://github.com/bounswe/bounswe2023group7/issues/605)| [#416](https://github.com/bounswe/bounswe2023group7/issues/416) [#417](https://github.com/bounswe/bounswe2023group7/issues/417) [#424](https://github.com/bounswe/bounswe2023group7/issues/424) [#460](https://github.com/bounswe/bounswe2023group7/issues/460) [#468](https://github.com/bounswe/bounswe2023group7/issues/468) [#469](https://github.com/bounswe/bounswe2023group7/issues/469) [#513](https://github.com/bounswe/bounswe2023group7/issues/513) [#522](https://github.com/bounswe/bounswe2023group7/issues/522) [#524](https://github.com/bounswe/bounswe2023group7/issues/524) [#529](https://github.com/bounswe/bounswe2023group7/issues/529) [#536](https://github.com/bounswe/bounswe2023group7/issues/536) [#549](https://github.com/bounswe/bounswe2023group7/issues/549) [#595](https://github.com/bounswe/bounswe2023group7/issues/595)|

- **Management related significant issues**: 

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#418](https://github.com/bounswe/bounswe2023group7/issues/418) [#456](https://github.com/bounswe/bounswe2023group7/issues/456) [#509](https://github.com/bounswe/bounswe2023group7/issues/509) [#591](https://github.com/bounswe/bounswe2023group7/issues/591) [#590](https://github.com/bounswe/bounswe2023group7/issues/590) [#613](https://github.com/bounswe/bounswe2023group7/issues/613) [#592](https://github.com/bounswe/bounswe2023group7/issues/592)| [#542](https://github.com/bounswe/bounswe2023group7/issues/542) [#618](https://github.com/bounswe/bounswe2023group7/issues/618) |

- **Pull requests**: 

| Created PR | Conflict | How It Resolved |
| ---        | ---      | ----            |
| [#419](https://github.com/bounswe/bounswe2023group7/pull/419)| --- | --- |
| [#457](https://github.com/bounswe/bounswe2023group7/pull/457)| --- | --- |
| [#500](https://github.com/bounswe/bounswe2023group7/pull/500)| --- | --- |
| [#561](https://github.com/bounswe/bounswe2023group7/pull/561)| No direct conflict. Missing part is added. |[Related Commit](https://github.com/bounswe/bounswe2023group7/pull/561/commits/fd4a90ccd32b28f2a68d0f54cf53f11f42460eda)|
| [#569](https://github.com/bounswe/bounswe2023group7/pull/569)| No direct conflict. Missing part is added. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/569/commits/66ad3d6318089d052b6ad9277acae0545d19ddf8) |
| [#577](https://github.com/bounswe/bounswe2023group7/pull/577)| --- | --- |
| [#582](https://github.com/bounswe/bounswe2023group7/pull/582)| No direct conflict. Missing part is added. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/582/commits/b7a6c64702b2e2ce9e393a221c660fe7024947b9) |
| [#588](https://github.com/bounswe/bounswe2023group7/pull/588)| --- | --- |
| [#589](https://github.com/bounswe/bounswe2023group7/pull/589)| --- | --- |
| [#598](https://github.com/bounswe/bounswe2023group7/pull/598)| --- | --- |
| [#607](https://github.com/bounswe/bounswe2023group7/pull/607)| --- | --- |
| [#610](https://github.com/bounswe/bounswe2023group7/pull/610)| --- | --- |
| [#614](https://github.com/bounswe/bounswe2023group7/pull/614)| --- | --- |

| Merged/Reviewed PR | Conflict | How It Resolved |
| ---                | ---      |  ----           |
| [#515](https://github.com/bounswe/bounswe2023group7/pull/515)| --- | --- |
| [#553](https://github.com/bounswe/bounswe2023group7/pull/553)| --- | --- |
| [#578](https://github.com/bounswe/bounswe2023group7/pull/578)| Added necessary variables to call GamePage. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/578/commits/be3568c513b1f32d2269962c6f4adfc8521b2c0a) |
| [#446](https://github.com/bounswe/bounswe2023group7/pull/446)| --- | --- |
| [#563](https://github.com/bounswe/bounswe2023group7/pull/563)| No direct conflict. Missing part is added. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/563/commits/e94cc43e4adb20731d507c84b1b31659e76bf63b) |
| [#576](https://github.com/bounswe/bounswe2023group7/pull/576)| --- | --- |
| [#599](https://github.com/bounswe/bounswe2023group7/pull/599)| No direct conflict. Missing part is added. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/599/commits/b07c217ed3df8c7d0e4c726a0ed14b94cb7dba21)|
| [#440](https://github.com/bounswe/bounswe2023group7/pull/440)| No direct conflict. Missing part is added. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/440/commits/44be2b7efde074232dc836d7bbcc8d591d3e4957) |
| [#484](https://github.com/bounswe/bounswe2023group7/pull/484)| --- | --- |
| [#539](https://github.com/bounswe/bounswe2023group7/pull/539)| Added necessary variables to call GamePage. | [Related Commit](https://github.com/bounswe/bounswe2023group7/pull/539/commits/3038881535a12af0eece97de3964b4e0dc21b495) |
| [#581](https://github.com/bounswe/bounswe2023group7/pull/581)| --- | --- |
| [#604](https://github.com/bounswe/bounswe2023group7/pull/604)| --- | --- |

- **Additional information**: I contributed to Lab Reports #5, #6, and #7. I took part as the driver in the customer presentation and answered questions from the audience. I reviewed and tested the tasks done by the mobile team. I attended all lectures, labs, mobile and general team meetings. We checked everything and created the pre-release tag customer-milestone-2 with Elif Kızılkaya and Kardelen Erdal.

--------------------------  

### <ins>Melih Gezer</ins> <a name="melih-gezer" />

-  **Member**: Melih Gezer - 2020400156 - Group 7 - Backend Team
- **Responsibilities**:  I was assigned to mainly creating Review endpoints. I create the all necessary flows of the review feature. Collaboratively with my teammates, I was tasked with crucial endpoints for our second milestone. Moreover, I contributed to the pre-release phase.
- **Main contributions**: 
  - I created the Review entity in our database.
  - I create 'Create Review' endpoint.
  - I create 'Like Review' endpoint.
  - I create 'Dislike Review' endpoint.
  - I create 'Delete Review' endpoint.
  - I create 'Edit Review' endpoint.
  - I create 'Get Review By Id' endpoint.
  - I create 'Get Reviews By Game Id' endpoint.
  - In addition to these endpoints, I was also responsible for revising and making additions and deletions according to the wishes of our teammates.
- **Code related significant issues**: [412](https://github.com/bounswe/bounswe2023group7/issues/412), [483](https://github.com/bounswe/bounswe2023group7/issues/483), [490](https://github.com/bounswe/bounswe2023group7/issues/490), [564](https://github.com/bounswe/bounswe2023group7/issues/564), [482](https://github.com/bounswe/bounswe2023group7/issues/482), [486](https://github.com/bounswe/bounswe2023group7/issues/486), [487](https://github.com/bounswe/bounswe2023group7/issues/487), [488](https://github.com/bounswe/bounswe2023group7/issues/488), [489](https://github.com/bounswe/bounswe2023group7/issues/489), [517](https://github.com/bounswe/bounswe2023group7/issues/517), [518](https://github.com/bounswe/bounswe2023group7/issues/518), [519](https://github.com/bounswe/bounswe2023group7/issues/519), [520](https://github.com/bounswe/bounswe2023group7/issues/520), [562](https://github.com/bounswe/bounswe2023group7/issues/562), [425](https://github.com/bounswe/bounswe2023group7/issues/425), [448](https://github.com/bounswe/bounswe2023group7/issues/448), [458](https://github.com/bounswe/bounswe2023group7/issues/458), [477](https://github.com/bounswe/bounswe2023group7/issues/478), [525](https://github.com/bounswe/bounswe2023group7/issues/525), [528](https://github.com/bounswe/bounswe2023group7/issues/528), [573](https://github.com/bounswe/bounswe2023group7/issues/573)
- **Management related significant issues**: [565](https://github.com/bounswe/bounswe2023group7/issues/565), [544](https://github.com/bounswe/bounswe2023group7/issues/544)
- **Pull requests**: 
[564](https://github.com/bounswe/bounswe2023group7/pull/564), [490](https://github.com/bounswe/bounswe2023group7/pull/490), [441](https://github.com/bounswe/bounswe2023group7/pull/441), [498](https://github.com/bounswe/bounswe2023group7/pull/498), [551](https://github.com/bounswe/bounswe2023group7/pull/551)
- **Additional information**: Asked questions and got feedback from the assistants for backend during the lab. I contributed our online meetings.

--------------------------  

### <ins>Muhammet Tayyip Kamiloğlu</ins>
-  **Member**: Muhammet Tayyip Kamiloğlu - 2019400111 - Group 7 - Frontend Team
- **Responsibilities**: I have responsibility of developing Games page, change password page, create entity page and create thread page. I also designed them before implementing by using Figma.
- **Main contributions**: 
  - I designed and implemented change password page. 
  - I updated and finalized our lab 5 report and submitted it to Github by opening a pull request.
  -  I designed and implemented the create thread page for to create forum threads.
  - Added show password feature to the login, signup, forgot password and change password pages. 
  - I designed and implemented create entity page, but didn't connect it with backend.
- **Code related significant issues**:

| Resolved Issue | Reviewed Issue |
| --- | --- |
| [#434](https://github.com/bounswe/bounswe2023group7/issues/434)   | [#421](https://github.com/bounswe/bounswe2023group7/issues/421) |
| [#471](https://github.com/bounswe/bounswe2023group7/issues/471)            | [#428](https://github.com/bounswe/bounswe2023group7/issues/428)            |
| [#476](https://github.com/bounswe/bounswe2023group7/issues/476)            | [#430](https://github.com/bounswe/bounswe2023group7/issues/430)            |
| [#506](https://github.com/bounswe/bounswe2023group7/issues/506)            | [#431](https://github.com/bounswe/bounswe2023group7/issues/431)            |
| [#507](https://github.com/bounswe/bounswe2023group7/issues/507)            | [#449](https://github.com/bounswe/bounswe2023group7/issues/449)            |
| [#505](https://github.com/bounswe/bounswe2023group7/issues/505)            | [#462](https://github.com/bounswe/bounswe2023group7/issues/462)            |
||[#473](https://github.com/bounswe/bounswe2023group7/issues/473) |
||[#510](https://github.com/bounswe/bounswe2023group7/issues/510)|
||[#511](https://github.com/bounswe/bounswe2023group7/issues/511)|
||[#546](https://github.com/bounswe/bounswe2023group7/issues/546)|
||[#555](https://github.com/bounswe/bounswe2023group7/issues/555)|
||[#571](https://github.com/bounswe/bounswe2023group7/issues/571)|
||[#593](https://github.com/bounswe/bounswe2023group7/issues/593)|

- **Management related significant issues**: 

| Resolved Issue | Reviewed Issue |
| -- | -- |
|[#434](https://github.com/bounswe/bounswe2023group7/issues/434) | [#548](https://github.com/bounswe/bounswe2023group7/issues/548) |
|[#436](https://github.com/bounswe/bounswe2023group7/issues/436) | [#481](https://github.com/bounswe/bounswe2023group7/issues/481) |
|[#622](https://github.com/bounswe/bounswe2023group7/issues/622) | |
|[#623](https://github.com/bounswe/bounswe2023group7/issues/623) | |
|[#626](https://github.com/bounswe/bounswe2023group7/issues/626) | |
 
- **Pull requests**:

| Created PR | Conflict | How It Resolved |
| ---        | ---      | ----            |
| [#437](https://github.com/bounswe/bounswe2023group7/pull/608)        | no conflict     | -           |
| [#438](https://github.com/bounswe/bounswe2023group7/pull/583)        | no conflict     | -           |
| [#453](https://github.com/bounswe/bounswe2023group7/pull/579)        | no conflict    | - |
| [#497](https://github.com/bounswe/bounswe2023group7/pull/608)        | no conflict     | -           |
| [#554](https://github.com/bounswe/bounswe2023group7/pull/608)        | no conflict     | -           |
| [#601](https://github.com/bounswe/bounswe2023group7/pull/608)        | no conflict     | -           |

- **Additional information**: 


--------------------------  

### <ins>Hakan Karakuş</ins><a name="hakan-karakus" />

-  **Member**: Hakan Karakuş - 2019400126 - Group 7 - Backend Team
- **Responsibilities**: I was responsible for creating new endpoints for our application. I was also mainly responsible for setting up S3 bucket for storing image objects.
- **Main contributions**: 
  - setting up an email for our application to send emails
  - setting up an AWS S3 Bucket for storing image objects
  - creating endpoint for forgetting password
  - creating endpoint for editing user information
  - adding comment feature
  - creating endpoint for editing game information
- **Code related significant issues**: [#319](https://github.com/bounswe/bounswe2023group7/issues/319), [#432](https://github.com/bounswe/bounswe2023group7/issues/432), [#433](https://github.com/bounswe/bounswe2023group7/issues/433), [#448](https://github.com/bounswe/bounswe2023group7/issues/448), [#478](https://github.com/bounswe/bounswe2023group7/issues/478), [#540](https://github.com/bounswe/bounswe2023group7/issues/540)
- **Pull requests**: [#364](https://github.com/bounswe/bounswe2023group7/pull/364), [#454](https://github.com/bounswe/bounswe2023group7/pull/454), [#443](https://github.com/bounswe/bounswe2023group7/pull/443), [#450](https://github.com/bounswe/bounswe2023group7/pull/450), [#491](https://github.com/bounswe/bounswe2023group7/pull/491), [#558](https://github.com/bounswe/bounswe2023group7/pull/558)
- **Additional information**: .

--------------------------  

### <ins>Elif Kızılkaya</ins><a name="elif-kizilkaya" />

* ###  **Member:** Elif Kızılkaya
* ### **Responsibilities:** 

One of my tasks was to design and implement the *"Create Game"* page, including linking it to the backend. I created a form for this purpose. I was also assigned the task to design and implement the *Forums* page, where all forums can be searched, and trending/latest topics are displayed. This involved adding a "Forums" tab in the sidebar. Additionally, after creating a game on the "Create Game" forum, I was tasked with generating the related game page and redirecting to it.

I took responsibility for designing our *homepage* in Figma based on the feedback received. Subsequently, I undertook the implementation of the homepage design. I had previously added and activated buttons like "My Games," "My Groups," "Change Password," and "Create Game" in the header and sidebar. In the second milestone, I participated in creating and executing *user scenarios* with our team for the *presentation and demo*. I took part of explaining our Frontend in the milestone presentation. I took on the design and implementation of the *Forum (thread)* page, connected it to the backend, and further enhanced and integrated forum/thread-related sections on the platform. I took the responsibility of commenting to thread as well.


* ###  **Main contributions:** 

    * I designed and implemented the forum (thread) page layout in Figma.
        * Created a 'thread' component for this purpose to display each single thread.
    *  I developed 'topic' components for displaying condensed versions of threads on the forums and home pages.
    * I added features to allow commenting on threads (reply to thread) and displaying all comments in the thread page. (get all comments)
    * To enhance user experience based on feedback, I made improvements:
        *  adding a homepage link to the logo
        *  increasing the font size of game names in the content.
    * In response to received feedback, I redesigned the Home Page layout from scratch in Figma and then implemented the design. 
        * I implemented slider component for further usage for UI design.
    * For the Milestone 2 demo, I collaborated with Kardelen Erdal and Hatice Erk to create user scenario.
        * Attended meeting #6.
    * I presented the frontend part in the demo.
    * I designed and implemented a Forums page in Figma, where all forums are displayed and searchable. 
        * I utilized thread topics on this page
        * Added a 'Forums' tab in the sidebar.
    * I created a 'Create Game' page that includes a five-step form to allow game creation on our platform. 
        * I added a 'Create Game' tab in the sidebar for easy access. 
        * Using useParams, I automatically generated game pages upon game creation.
    * I added 'My Games' and 'My Groups' buttons to the header for user convenience.
        * I designed each of them and added images to the button
    * I crafted the template for the Milestone 2 report.
    * I updated the Individual Contribution Report according to instructions provided.
    * In the Milestone 2 report, I wrote the summary of customer feedback and reflections. 
    * I participated in tagging for the Milestone 2 release. 
    * Before the release, I worked with Yunus Emre to resolve frontend issues, fixed wrong links.
    * To improve the actions mentioned in our user scenario on the Home Page and Forums page, I made enhancements:
        * redirecting to their profile pages to avatars in the threads and thread topics
        * adding mock data to the latest and trending topics.
    * With Kardelen Erdal, I synced the game platforms and tags with the mobile and frontend team.
    * I added a default image for the profile pages that have no avatar.
    * While writing the code, I and my teammates created dumb datas, I removed some of those from database.
    * I created game pages, users, and threads to display in the milestone demo.


* ###  **Code-related significant issues:**


| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#593](https://github.com/bounswe/bounswe2023group7/issues/593), [#575](https://github.com/bounswe/bounswe2023group7/issues/575), [#571](https://github.com/bounswe/bounswe2023group7/issues/571), [#555](https://github.com/bounswe/bounswe2023group7/issues/555), [#514](https://github.com/bounswe/bounswe2023group7/issues/514), [#511](https://github.com/bounswe/bounswe2023group7/issues/511), [#475](https://github.com/bounswe/bounswe2023group7/issues/475), [#431](https://github.com/bounswe/bounswe2023group7/issues/431), [#428](https://github.com/bounswe/bounswe2023group7/issues/428), [#430](https://github.com/bounswe/bounswe2023group7/issues/430), [#429](https://github.com/bounswe/bounswe2023group7/issues/429), [#472](https://github.com/bounswe/bounswe2023group7/issues/472), [#473](https://github.com/bounswe/bounswe2023group7/issues/473), [#548](https://github.com/bounswe/bounswe2023group7/issues/548), [#609](https://github.com/bounswe/bounswe2023group7/issues/609)| [#545](https://github.com/bounswe/bounswe2023group7/issues/545), [#508](https://github.com/bounswe/bounswe2023group7/issues/508), [#507 ](https://github.com/bounswe/bounswe2023group7/issues/507), [#476](https://github.com/bounswe/bounswe2023group7/issues/476), [#464](https://github.com/bounswe/bounswe2023group7/issues/464), [#463](https://github.com/bounswe/bounswe2023group7/issues/463), [#435](https://github.com/bounswe/bounswe2023group7/issues/435), [#423](https://github.com/bounswe/bounswe2023group7/issues/423), [#422](https://github.com/bounswe/bounswe2023group7/issues/422)            |


*  ###  **Management-related significant issues:** 

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#544](https://github.com/bounswe/bounswe2023group7/issues/544), [#616](https://github.com/bounswe/bounswe2023group7/issues/616), [#543](https://github.com/bounswe/bounswe2023group7/issues/543), [#513](https://github.com/bounswe/bounswe2023group7/issues/513), [#509](https://github.com/bounswe/bounswe2023group7/issues/509)  | [#627 ](https://github.com/bounswe/bounswe2023group7/issues/627), [#623](https://github.com/bounswe/bounswe2023group7/issues/623),[#617](https://github.com/bounswe/bounswe2023group7/issues/617), [#590 ](https://github.com/bounswe/bounswe2023group7/issues/590), [#534](https://github.com/bounswe/bounswe2023group7/issues/534)        |


* ### **Pull requests:** 

| Created PR | Conflict | How It Resolved |
| ---        | ---      | ----            |
| [#608](https://github.com/bounswe/bounswe2023group7/pull/608)        | no conflict     | -           |
| [#583](https://github.com/bounswe/bounswe2023group7/pull/583)        | no conflict     | -           |
| [#579](https://github.com/bounswe/bounswe2023group7/pull/579)        | New feature on development    | [Merged development to my branch](https://github.com/bounswe/bounswe2023group7/pull/579/commits/2a4201f260f43443c2f07a8c616c36053093a3ad) |
| [#572](https://github.com/bounswe/bounswe2023group7/pull/572)        | no conflict     | -           |
| [#568](https://github.com/bounswe/bounswe2023group7/pull/568)        | update on backend user service gave conflict   |[ merged development to my branch](https://github.com/bounswe/bounswe2023group7/pull/568/commits/6612193c3fd41f7d69ac145a6e9abda79ccdf4a7)           |
| [#557](https://github.com/bounswe/bounswe2023group7/pull/557)        | no conflict     | -           |
| [#541](https://github.com/bounswe/bounswe2023group7/pull/541)        | no conflict     | -           |
| [#516](https://github.com/bounswe/bounswe2023group7/pull/516)        | change in request game link    | [merged development to my branch](https://github.com/bounswe/bounswe2023group7/pull/516/commits/c406e934eb83692018ad8618b51290e1e1eb58d6)           |
| [#495](https://github.com/bounswe/bounswe2023group7/pull/495)        | new feature on development in app.js    | [merged development to my branch](https://github.com/bounswe/bounswe2023group7/pull/495/commits/97680b88e5a96927d453643aa1d576a96c8a9fd9)          |
| [#452](https://github.com/bounswe/bounswe2023group7/pull/452)        | no conflict     | -           |
| [#447](https://github.com/bounswe/bounswe2023group7/pull/447)        | no conflict     | -           |



| Merged/Reviewed PR | Conflict | How It Resolved |
| ---                | ---      |  ----           |
| [#597](https://github.com/bounswe/bounswe2023group7/pull/597)               | resolved by PR owner    |   [merged development to branch](https://github.com/bounswe/bounswe2023group7/pull/597/commits/f8b7d1481014e7195f664a94763a6c7fa537fcde)          |
| [#550](https://github.com/bounswe/bounswe2023group7/pull/550)               | no conflict      |  -           |
| [#497](https://github.com/bounswe/bounswe2023group7/pull/497)               | no conflict      |  -           |
| [#449](https://github.com/bounswe/bounswe2023group7/pull/449)               | no conflict      |  -           |
| [#494](https://github.com/bounswe/bounswe2023group7/pull/494)               | no conflict      |  -           |
| [#584](https://github.com/bounswe/bounswe2023group7/pull/584)               | no conflict      |  -           |
| [#611](https://github.com/bounswe/bounswe2023group7/pull/611)               | no conflict      |  -           |
| [#612](https://github.com/bounswe/bounswe2023group7/pull/612)               | no conflict      |  -           |


* ### **Additional information:** 

I held discussions with customers to check whether we are aligned our not in terms of the requirements. I took part in for weekly task distribution among the teams. Also, I, Hatice Erk and Kardelen Erdal always discussed about the mobile and frontend side of the project to be aligned and synced.


--------------------------  

### [Furkan Ülke](https://github.com/bounswe/bounswe2023group7/wiki/Milestone%E2%80%902--Individual-Contributions-%E2%80%90-Furkan-Ülke) <a name="furkan-ülke" />
* ###  **Member:** Furkan Ülke - 2018400054 - Group 7 - Mobile Team
* ### **Responsibilities:** 

As part of my role, I am tasked with a diverse set of responsibilities spanning mobile app development and backend connectivity. Key among these is the implementation of mobile follow/unfollow functionality and the establishment of a robust backend connection. Security is a paramount concern, and I actively contribute by adding tokenization to API requests from the mobile app.

In the realm of user engagement, I play a central role in crafting a seamless experience, creating a user profile page and enhancing game visibility for unregistered users. Addressing UI/UX concerns, I ensure a visually polished interface, tackling issues like pixel overflow in the pages.

As a reviewer, I provide insights for refining game stories, average ratings, and contribute to milestone achievements like creating .apk files. Navigational features, such as drawers for game pages and forum searches, fall within my purview. I also contribute to the meticulous revision of game pages in the mobile environment, ensuring accuracy and visual appeal. My responsibilities reflect a holistic approach to mobile app development, prioritizing functionality, security, and user satisfaction.

* ### **Main Contributions:**

<details>
  <summary>Mobile Follow/Unfollow Implementation and Backend Connection</summary>

  * Spearheading the development of mobile follow/unfollow functionality for games, a crucial feature for enhancing user engagement.
  * Establishing a robust backend connection to ensure the responsiveness and efficiency of the mobile application.
</details>

<details>
  <summary>Security Enhancement with API Tokenization</summary>

  * Actively contributing to fortifying the security posture of the mobile application by implementing tokenization into API requests, elevating data security.
</details>

<details>
  <summary>User Profile Page Creation</summary>

  * Crafting a comprehensive user profile page within the mobile app to provide users with a seamless display of information and an intuitive interface for enhanced interaction and personalization.
</details>

<details>
  <summary>Game Visibility and User Accessibility</summary>

  * Implementing updates to expand game visibility to unregistered users, enticing potential users to explore further and register.
  * Enhancing the search functionality within the app to ensure users can effortlessly discover and engage with their preferred games.
</details>

<details>
  <summary>UI/UX Enhancement - Pixel Overflow Resolution</summary>

  * Addressing nuanced UI/UX concerns, specifically resolving pixel overflow in the pages of mobile app.
</details>

<details>
  <summary>Review and Insight Contributions</summary>

  * Contributing insights and enhancements to refine game stories and average ratings on game pages.
  * Reviewer role in the generation of .apk files for project milestones, streamlining the deployment process.
</details>

* ###  **Code-related significant issues:**

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| [#424](https://github.com/bounswe/bounswe2023group7/issues/424) | [#427](https://github.com/bounswe/bounswe2023group7/issues/427) |
| [#466](https://github.com/bounswe/bounswe2023group7/issues/466) | [#461](https://github.com/bounswe/bounswe2023group7/issues/461) |
| [#469](https://github.com/bounswe/bounswe2023group7/issues/469) | [#467](https://github.com/bounswe/bounswe2023group7/issues/467) |
| [#529](https://github.com/bounswe/bounswe2023group7/issues/529) | [#479](https://github.com/bounswe/bounswe2023group7/issues/479) |
| [#530](https://github.com/bounswe/bounswe2023group7/issues/530) | [#521](https://github.com/bounswe/bounswe2023group7/issues/521) |
| ---            | [#531](https://github.com/bounswe/bounswe2023group7/issues/531) |
| ---            | [#537](https://github.com/bounswe/bounswe2023group7/issues/537) |
| ---            | [#538](https://github.com/bounswe/bounswe2023group7/issues/538) |
| ---            | [#596](https://github.com/bounswe/bounswe2023group7/issues/596) |
| ---            | [#603](https://github.com/bounswe/bounswe2023group7/issues/603) |

*  ###  **Management-related significant issues:** 

| Resolved Issue | Reviewed Issue |
| ---            | ---            |
| ---            | ---            |

* ### **Pull requests:** 

| Created PR | Conflict | How It Resolved |
| ---        | ---      | ----            |
| [#515](https://github.com/bounswe/bounswe2023group7/pull/515) | No Conflict Occurred | ----            |
| [#493](https://github.com/bounswe/bounswe2023group7/pull/493) | No Conflict Occurred | ----            |
| [#553](https://github.com/bounswe/bounswe2023group7/pull/553) | No Conflict Occurred | ----            |
| [#578](https://github.com/bounswe/bounswe2023group7/pull/578) | No Conflict Occurred | ----            |
| [#602](https://github.com/bounswe/bounswe2023group7/pull/602) | No Conflict Occurred | ----            |

| Merged/Reviewed PR | Conflict | How It Resolved |
| ---                | ---      |  ----           |
| [#444](https://github.com/bounswe/bounswe2023group7/pull/444) | No Conflict Occurred |   ----          |
| [#470](https://github.com/bounswe/bounswe2023group7/pull/470) | No Conflict Occurred |  ----           |
| [#567](https://github.com/bounswe/bounswe2023group7/pull/567) | No Conflict Occurred |  ----           |
| [#598](https://github.com/bounswe/bounswe2023group7/pull/598) | No Conflict Occurred |  ----           |

* ### **Additional information:** 
--

--------------------------  
### <ins>Tacettin Burak Eren</ins><a name="Tacettin Burak Eren" />

-  **Member**: Tacettin Burak Eren - 2019400336 - Group 7 - Backend Team
- **Responsibilities**: I was assigned multiple responsibilities within the backend team, which included creating the folder structure, connecting the database, setting up Docker, managing deployment processes, creating the unit tests pipeline, and overseeing structural planning. Additionally, I was responsible for developing crucial backend features. Collaboratively with my teammates, I was tasked with crucial endpoints for our first milestone. Moreover, I contributed to the pre-release phase.
- **Main contributions**: 
  - I have reviewed a couple of the requirements.
  - I have implemented a the /changepassword endpoint create and get flows.
  - I wrote evaluation of processes part of the milestone report for the team.
  - I have created get user information endpoint.
  - I have created get user information by id endpoint.
  - I have created rating endpoint.
  - I have made the groups RAM.
- **Code related significant issues**: 
[#501](https://github.com/bounswe/bounswe2023group7/issues/501)
[#458](https://github.com/bounswe/bounswe2023group7/issues/458)
[#415](https://github.com/bounswe/bounswe2023group7/issues/415)
[#340](https://github.com/bounswe/bounswe2023group7/issues/340),[#262](https://github.com/bounswe/bounswe2023group7/issues/262), [#266](https://github.com/bounswe/bounswe2023group7/issues/266), [#270](https://github.com/bounswe/bounswe2023group7/issues/270), [#280](https://github.com/bounswe/bounswe2023group7/issues/280), [#283](https://github.com/bounswe/bounswe2023group7/issues/283), [#284](https://github.com/bounswe/bounswe2023group7/issues/284), [#285](https://github.com/bounswe/bounswe2023group7/issues/285), [#245](https://github.com/bounswe/bounswe2023group7/issues/245), [#349](https://github.com/bounswe/bounswe2023group7/issues/349)
- **Management related significant issues**:
[#481](https://github.com/bounswe/bounswe2023group7/issues/481)
[#402](https://github.com/bounsw/bounswe2023group7/issues/402), [#310](https://github.com/bounswe/bounswe2023group7/issues/310), [#245](https://github.com/bounswe/bounswe2023group7/issues/245)
- **Pull requests**: 
[#547](https://github.com/bounswe/bounswe2023group7/pull/547)[#499](https://githib.com/bounswe/bounswe2023group7/pull/499)[#441](https://github.com/bounswe/bounswe2023group7/pull/441)
[#349](https://github.com/bounswe/bounswe2023group7/pull/349)
- **Additional information**: Additionally, Before lab sections, I reviewed our project plan and also asked many questions to my teammates during the lab.I have tried to attribute the backend team.

