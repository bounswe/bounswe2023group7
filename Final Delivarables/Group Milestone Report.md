![FigJam basics](https://hackmd.io/_uploads/By4hh6tDT.png)

# **Cmpe451 Final Project Team Report**

### **Prepared by:** Group 7
### **Video:** [Youtube Video Link ](https://www.youtube.com/watch?v=x_eCsi_eU8Y)


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


## **Executive Summary**

Ludos is a platform dedicated to game domain. It serves as a community where gaming enthusiasts can gather to discuss everything related to games and get information about the games. Users have the ability to create discussion threads, respond to others’ threads and comments; and engage in lively conversations about various games. The platform also allows users to follow specific games, providing them with up-to-date information, including details about upcoming titles. This makes Ludos not just a forum for discussion, but also a valuable resource for gamers to stay informed about the latest in the gaming world. 
At the end of the term, we are delighted with the position we are as the whole team. We successfully deployed almost all important features of our project. We implemented the features we set as our aims and you mentioned as important since the beginning of the semester.

The most important features we have in our app for both mobile and web are the followings:
1. Annotation 
2. Detailed Search 
3. Game Recommendation 
    
We are glad that we have finished all of three features with full integration in the all teams (mobile, web, back-end).
We believe that our application is ready for use by real users in its initial version. In addition to the explained functionalities in later sections of our app, we've prioritized a user-friendly interface and overall user experience.

Here are the general overview of functionalities we support in our app:
1. Sign up
2. Log in
3. Change password
4. Forgot password
5. Create/View/Edit user profile page
6. View other users’ profiles
7. Create/View/Edit a group
8. Create a thread in groups
9. Follow/Unfollow games
10. Annotate texts
11. Thread/Game/User/Group search
12. Annotate images (only web)
13. Semantic search for games/threads/groups/users (Unoptimized) (only web)
14. View entities
15. Create entities
16. Create/View/Edit rate for the games
17. Comment on threads
18. Comment on comments (only mobile)
19. View other users’ text annotations
20. View other users’ image annotations (only web)
21. Create/View upcoming titles
22. View all comments for posts
23. View participants of groups
24. Join/Leave groups
25. View trending games
26. View recommended games for user
27. View recommended games for specific game
28. Last activities of users (only mobile)
29. Create/Edit Game
30. Like/Dislike/Delete/Edit comment/review/thread/upcoming title

Our final milestone demo went quite well overall. As in the previous milestone, we received positive comments from people regarding to our application and demo. We are proud of the final milestone demo and we believe that the customers were also satisfied with the presentation we did!


## **Summary of Project Status**
Provide a summary of your project status in terms of requirements.

## **Final release notes**

What we added to our application:

- Group functionality is added. Users can create a group and edit the group they managed. Groups are open to be member until its capacity is fulled. Group members can create a thread which is seen by only group members.
- Entity functionality is added. Users can create an entity from a game's page. These entities are, characters, items, areas and packages. Entities must have features such as description and image link.
- We added upcoming title feature for our application. Only developers are able to create the upcoming title for the game. They can basically, inform users about release date and share demo link.
- We added text annotations to our application. The text in game guide, game trivia, game story, entity description, posts and comments. Also upcoming title and group comments/posts can be annotated.
- We added image annotation to our application. The image of thread posts can be annotated.
- We improved our search functionalities. Users were able to search games in second release. In this release, users also can search forums, groups. These searchs have filtering and sorting also. Additionally, user both use autocomplete game search or filtered game search. Beyond, user can reach a general search for users, forums, games and groups on header.
- We added recommendations to our platform. Mainly, it suggests game based on user's activity on the site. It can be seen from the home page. Additionally to reach users which want to play similar games, we added suggested games content on related games of a game. One can see similar games of a game. 
- We revised our profile page. We introduced user types on user interface. As mentioned above, developers can create upcoming title posts. From their profile page they can share additionally their companies and edit them. Besides, user's groups can be seen from the profile page.
- User can edit the games which exist on the site. 
- Users can like or dislike comments and posts.
- The home page design also enhanced. Groups, forums and games dynamically connected.

### Known Bugs

Web:
* Users cannot give a relevant description for entities while creating it.
* Users cannot edit their comments.
* Users cannot see the area entities of the games.
* On the forums page, the forum topics does not a give profile photo and a nickname as desired.

Mobile:
* Users cannot upload file from their Android devices only provide a link.
* Users cannot delete their annotations from mobile app.
* When a thread is searched, the back button redirects to the game page of the thread, not the search page.

Backend:
* Semantic search struggles to find, so relevance score reduced from 0.5 to 0.3 in deployed server.

These bugs are fixed on deployed web server, but in release their bugs are stayed.



## **Status of Deliverables**

List all deliverables as links. Specify the version numbers whenever applicable.

|Deliverable | Status | Description |
|-------------|---------|---------------|
|[Group Milestone Report](https://github.com/bounswe/bounswe2023group7/tree/development/reports)|Delivered|Group Milestone Reports are completed.|
|[Progress based on teamwork](#milestone-review)|Delivered|Progress based on teamwork is completed.|
|[API Endpoints](https://github.com/bounswe/bounswe2023group7/tree/development/reports)|Delivered|API has been deployed. Here is [swagger link](http://164.92.195.35:8080/api) to the api and [UI](http://51.20.170.143:3000/) of the api. 
|[Individual Contributions](#individual-contribution-reports)|Delivered|Individual contributions are completed.|
|[User Interface / User Experience](#individual-contribution-reports)|Delivered|[User Interface](http://51.20.170.143:3000/) / User Experience are completed.|
|[Annotations](#individual-contribution-reports)|Delivered|[Annotations](http://51.20.170.143:3000/) are completed.|
|[Scenarios](#individual-contribution-reports)|Delivered|Scenarios are completed.|
|[Use and Maintanence](#individual-contribution-reports)|Delivered|User and system manuals are completed.|

## **Requirements Coverage**

(Status: One of: Not done , Completed , % completed )

<details>
<summary><strong>5.1 Functional Requirements<a name="functional-requirements" /></strong></summary>
    
- 1.1 User Requirements
    - 1.1.1 Account 
        - 1.1.1.1 Register
            - 1.1.1.1.1. (Completed) Guests shall be able to register to the platform.     
            - 1.1.1.1.2. (Completed) Users should verify their accounts via e-mails, which proves mail address belongs to user.
            - 1.1.1.1.3. (%50 Completed) Famous developers, professional e-sports players, famous streamers, famous video producers should be able to get official accounts.
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
            - 1.1.2.6.3 (Completed) Users shall be able to add tags related to their favorite genre to their profiles.
            - 1.1.2.6.4 (Completed) Users shall be able to add their favorite games on their profiles.
            - 1.1.2.6.5 (Completed) Users shall be able to share the number of comments on the forum, the number of posts on the forum, and the number of reviews they published on their profiles.
            - 1.1.2.6.6 (Completed) Developers and e-sports players shall be able to add their associated titles/teams/companies to their profiles.
            - 1.1.2.6.7 (Not Started) Users shall be able to share their gaming platform profiles, including Steam, Epic, IndieGala, Humble Bundle, Ubisoft Connect, GOG, Origins, Xbox Live, itch.io, Google Play Games, on their profiles.
            - 1.1.2.6.8 (Completed) Users shall be able to display their user types, that are gamer, developer, and e-sports player.
        - 1.1.2.7 Activity Tracking
            - 1.1.2.7.1 (Not Started) Users’ last activities shall be seen on their profiles.
        - 1.1.2.8 Forum
            - 1.1.2.8.1 (Not Started) Users should be able to display previews for posts which they created on their profiles.
            - 1.1.2.8.2 (Completed) Users shall be able to display their comments on other users’ posts.
        - 1.1.2.9 Games
            - 1.1.2.9.1 (Completed) Users shall be able to display their reviews of the games.
            - 1.1.2.9.2 (Completed) Developers shall be able to display their upcoming titles on their profile page.
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
    - 1.1.4. (Completed) Upcoming Titles
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
        - 1.1.5.11 (Completed) Users should be able to screen image links.
    - 1.1.6. (Completed) Group
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
        - (Completed) 1.2.2.3. System shall allow users to use sorting features ascending or descending.
        - (Completed) 1.2.2.4. System shall allow users to sort the threads, alphabetically, by first post date, by last post date,by number of comments in threads.
        - (%50 Completed) 1.2.2.5. System shall allow users to sort the comments by date, number of replies and difference of upvotes and downvotes for the comment.
        - (Completed) 1.2.2.6. System shall allow users to sort upcoming titles by post date or launch date.
    - 1.2.4 (Completed) Annotations
    - 1.2.5 (Completed) Recommendations
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

## **API**

* The API documentation: http://164.92.195.35:8080/api
* Link to the API: http://164.92.195.35:8080/
* Example Api Calls: [Postman Collection](https://api.postman.com/collections/22203914-3679a668-3f53-4a89-b53d-4cd8bcfabda3?access_key=PMAT-01HJVACJT8TMQX9FHP0G418ZSM)

## **User Interface / User Experience**

User Interface designs and the links to the source code in the project repository
* Login Page:
    * Web
        - Login Page
                    
        ![Ekran Resmi 2023-12-29 12.15.46](https://hackmd.io/_uploads/r1xLA-nPa.jpg)

        - Source code
            - [LoginPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/LoginPage.js)

    * Mobile
        - Login Page at start
        
        ![ludos_login](https://hackmd.io/_uploads/S1fP-acw6.png)
        
        - Login Page after entered username and password

        ![Ludos_login_with_input_hidden](https://hackmd.io/_uploads/BkudzpcPT.png)

        
        - Login Page if show password selected

        ![ludos_login_input_view](https://hackmd.io/_uploads/ByXAb6cPT.png)
        
        - Mobile source codes
            * [login_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/login_page.dart)
        
* Sign Up Page:
    * Web
        
        - Signup Page
        
         ![Ekran Resmi 2023-12-29 12.17.58](https://hackmd.io/_uploads/SkvARWnva.jpg)
         
         - Source Code
             - [SignupPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/SignupPage.js)

    * Mobile
        - Sign Up screen after user entered necessary information
        
        ![ludos_sign_up](https://hackmd.io/_uploads/SkOjQT5DT.png)
        
        - Mobile source codes
            * [sign_up_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/sign_up_page.dart)

* Forgot Password Page:
    * Web
        - Forgot password mail request for sending code
 
        ![Ekran Resmi 2023-12-29 12.20.31](https://hackmd.io/_uploads/ry0vJf3Pp.jpg)
        
        - Activation code screen and entering new password

        ![Ekran Resmi 2023-12-29 12.22.09](https://hackmd.io/_uploads/B1JAJf2Pa.jpg)

        
        
        
        
    * Mobile
        - Forgot Password (Request for activation code)

        ![ludos_forgot_password1](https://hackmd.io/_uploads/BJ52NpcwT.png)

        - Forgot Password (Changing Password)

        ![ludos_forgot_password2](https://hackmd.io/_uploads/SyP1Ha9DT.png)
        
        - Mobile source codes
            * [forgot_password.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/forgot_password.dart)
            * [activation_for_password_reset.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/activation_for_password_reset.dart)

* Home Page:
    * Web
        
        - Home page for registered user
        
        ![Ekran Resmi 2023-12-29 12.13.46](https://hackmd.io/_uploads/SyYC6ZnPT.jpg)
        
        ![Ekran Resmi 2023-12-29 12.14.22](https://hackmd.io/_uploads/Sy3lAWhwa.jpg)
        
        
        - Home page for non-registered user
        
        ![Ekran Resmi 2023-12-29 12.14.50](https://hackmd.io/_uploads/rkYzRb3Dp.jpg)
        
        ![Ekran Resmi 2023-12-29 12.23.03](https://hackmd.io/_uploads/Bkw-xf3vp.jpg)
        
        - Source Code:
            - [Homepage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/Homepage.js)


    * Mobile
        - Home Page for Registered User (Popular & Recommended Games)
        
        ![Ludos_home_1-min](https://hackmd.io/_uploads/H18LvT9vp.png)
        
        - Home Page for Registered User (Trending Topics & Upcoming Titles)

        ![ludos_home_2-min](https://hackmd.io/_uploads/rkz9vpqva.png)

        - Home Page Drawer for Registered User

        ![Ludos_drawer_for_registered](https://hackmd.io/_uploads/Sk4Zua5va.png)
        
        - Home Page for Nonregistered User(Popular Games, Recommended Games do not exist for nonregistered user)

        ![home_for_non_registered1](https://hackmd.io/_uploads/S1bnuT9D6.png)

        - Home Page for Nonregistered User(Trending Topics & Upcoming Titles)

        ![home_for_nonregistered_2](https://hackmd.io/_uploads/S1CXKp5vp.png)
        
        - Home Page Drawer for Nonregistered User
       
        ![home_page_drawer_nonregistered](https://hackmd.io/_uploads/HJOPu6cPa.png)
        
        - Mobile Source Codes:
            * [main.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/main.dart)
            * [upcoming_titles_post.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/upcoming_title_post.dart)
            * [recommended_games.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/rec_games.dart)
            * [home_game_sum.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/home_game_sum.dart)
            * [custom_navigation_bar.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/custom_navigation_bar.dart)

* Change Password:
    * Web
        - Click for changing password
        
        ![Ekran Resmi 2023-12-29 12.25.05](https://hackmd.io/_uploads/HyAFgGhva.jpg)
        
        - Enter the old and new passwords to change password
        
        ![Ekran Resmi 2023-12-29 12.25.56](https://hackmd.io/_uploads/HyQ2lGnwp.jpg)

        - Source code:
            - [ChangePasswordPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/ChangePasswordPage.js)


    * Mobile
        - Users can Change Their Passwords from Left Drawer by Giving Old Password and New Password Pair
        
        ![change_password_page](https://hackmd.io/_uploads/ByNHxeowT.png)
        
        - Mobile Source Code:
            * [change_password.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/change_password.dart)

* Owner User Profile Page(View & Edit):
    * Web
        - View profile of the owner user
        
        ![Ekran Resmi 2023-12-29 12.27.49](https://hackmd.io/_uploads/Hkb4-M2wp.jpg)

        - Edit profile page
    
        ![Ekran Resmi 2023-12-29 12.29.20](https://hackmd.io/_uploads/SJ6_bf2va.jpg)

        - Source code: 
            - [ProfilePage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/ProfilePage.js)
            - [EditProfilePage.js]()
        

    * Mobile

        - View Profile Page for Current User(General Informations)

        ![owner_user_profile_page1](https://hackmd.io/_uploads/ry5R569Da.png)
        
        - View Profile Page for Current User(Followed Games & Last Activities)
        
        ![owner_user_profile_page2](https://hackmd.io/_uploads/ry61iaqD6.png)
        
        - Edit Owned Profile Page

        ![Edit_profile_page](https://hackmd.io/_uploads/HkuDiTcP6.png)
        
        - Mobile Source Codes:
            * [user_profile_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/user_profile_page.dart)
            * [edit_profile_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/edit_profile_page.dart)
            * [last_activity_summary.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/last_activity_summary.dart)

* Groups Page:
    * Web
        - Users can see groups page
         
        ![Ekran Resmi 2023-12-29 12.30.59](https://hackmd.io/_uploads/BJV1fGnwT.jpg)
        
        ![Ekran Resmi 2023-12-29 12.31.53](https://hackmd.io/_uploads/HkOzff2vT.jpg)
        
        - User can search groups detailly

        ![Ekran Resmi 2023-12-29 12.37.49](https://hackmd.io/_uploads/Hy1KXf3P6.jpg)
        
        - Registered users can create groups
        
        ![Ekran Resmi 2023-12-29 12.32.30](https://hackmd.io/_uploads/r1fSMM2vT.jpg)

        - Users can see unjoined groups

        ![Ekran Resmi 2023-12-29 12.33.30](https://hackmd.io/_uploads/H1O_GG2v6.jpg)
        
        - Users can see joined groups

        ![Ekran Resmi 2023-12-29 12.34.21](https://hackmd.io/_uploads/BJojGGnDa.jpg)
        
        - Owner of the group can edit the group

        ![Ekran Resmi 2023-12-29 12.34.56](https://hackmd.io/_uploads/HJxApMGhvp.jpg)
        
        

        
        - Source code:
            - [GroupPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/GroupPage.js)
            - [GroupsPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/GroupsPage.js)
            - [EditGroupForm.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/components/EditGroupForm.js)


    * Mobile
        - Nonregistered User Tries to Create a Group

        ![nonregistered_try_to_create_group](https://hackmd.io/_uploads/H1ShppcDT.png)
        
        - Nonregisterd User Tries to Join a Group

        ![nonregistered_try_to_join_group](https://hackmd.io/_uploads/HyZJATqwT.png)
        
        - Search for a Group by Game Title

        ![Group_search](https://hackmd.io/_uploads/SJCB06cD6.png)
        
        - Registered User Creates Group

        ![ludos_create_group](https://hackmd.io/_uploads/By6qCa5Da.png)
        
        - Group View Before Joined


        ![Group_view_before_joined](https://hackmd.io/_uploads/Bys0Raqv6.png)
        
        - Group View After Joined

        ![group_view_after_join](https://hackmd.io/_uploads/SJMe1A9Pa.png)
        
        ![group_view_with_posts](https://hackmd.io/_uploads/BJYmyRcv6.png)
        
        - Drawer for Group Management

        ![group_management_drawer](https://hackmd.io/_uploads/HknRq0qD6.png)
        
        - Group Member Views the Posts of the Group

        ![group_post_view](https://hackmd.io/_uploads/BJN6sCqDa.png)
        
        - Group Member Creates a Post in the Group
   
        ![group_thread_create](https://hackmd.io/_uploads/SyBW2R5Da.png)
        
        - Mobile Source Code:
            * [groups.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/group/groups.dart)
            * [group_summary.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/group/group_summary.dart)
            * [create_group.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/group/create_group.dart)
            * [group_thread.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/group/create_group_thread.dart)
            * [group_forum.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/group/group_forum.dart)

* Games Page:
    * Web
        - Nonregistered & Registered Users View the Game Pages Created on the Ludos

        ![Ekran Resmi 2023-12-29 11.59.00](https://hackmd.io/_uploads/S1EPqW2vT.jpg)
    
        ![Ekran Resmi 2023-12-29 11.59.23](https://hackmd.io/_uploads/BJYuc-2Pp.jpg)
    
        - Registered Users Creates a New Game Page

        ![Ekran Resmi 2023-12-29 12.01.00](https://hackmd.io/_uploads/BJcA9-nDp.jpg)

        ![Ekran Resmi 2023-12-29 12.01.17](https://hackmd.io/_uploads/rJokoZ2wp.jpg)

        ![Ekran Resmi 2023-12-29 12.01.30](https://hackmd.io/_uploads/SyDgjZnw6.jpg)

        ![Ekran Resmi 2023-12-29 12.01.43](https://hackmd.io/_uploads/H1LWjWhv6.jpg)

        - Registered User Views a Game's Page, rates the game, share duration at the same page
        
        ![Ekran Resmi 2023-12-29 12.03.35](https://hackmd.io/_uploads/BJw_ob3DT.jpg)
        
        - Registered user can see reviews of the game and add review to the game

        ![Ekran Resmi 2023-12-29 12.05.39](https://hackmd.io/_uploads/rk-ln-3DT.jpg)

        - Registered user can see forums of the game

        ![Ekran Resmi 2023-12-29 12.06.28](https://hackmd.io/_uploads/HJGX2Znvp.jpg)
        
        - Registered user can see entities of the game
        
        ![Ekran Resmi 2023-12-29 12.06.47](https://hackmd.io/_uploads/BJrN3W3vp.jpg)

        - Registered user can see related and suggested games for the game
        
        ![Ekran Resmi 2023-12-29 12.07.23](https://hackmd.io/_uploads/B1iLhbhDT.jpg)
        
        - Registered user can create entity by clicking the button on entities tab of the game

        ![Ekran Resmi 2023-12-29 12.11.10](https://hackmd.io/_uploads/BJtS6bhva.jpg)

        - Registered user can see entity of the game (character, item, environment, and package)

        ![Ekran Resmi 2023-12-29 12.09.17](https://hackmd.io/_uploads/BJ903-2wT.jpg)
        
        - Source 
            - [GamePage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/GamePage.js)
            - [CreateEntityPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/CreateEntityPage.js)


    * Mobile
        - Nonregistered & Registered Users View the Game Pages Created on the Ludos

        ![ludos_games_page-min](https://hackmd.io/_uploads/Hkca60qv6.png)
        
        - Registered Users Creates a New Game Page

        ![ludos_create_game](https://hackmd.io/_uploads/BJXf0AqD6.png)
        
        - Registered User Views a Game's Page Before Following
        
        ![game_page_before_follow-min](https://hackmd.io/_uploads/S19LkkoPT.png)
        
        - Registered User Views a Game's Page After Following
        
        ![game_page_after_follow-min](https://hackmd.io/_uploads/Sk1okysva.png)
        
        ![game_page_2](https://hackmd.io/_uploads/ry1ugJswa.png)
        
        - User Views the Properties of the Game
        
        ![game_properties-min](https://hackmd.io/_uploads/BJ6Zekjwp.png)
        
        - Registered User Adds a Review for the Game

        ![game_add_review](https://hackmd.io/_uploads/H1geWkowT.png)
        
        ![game_review_success_popup](https://hackmd.io/_uploads/rknrb1iDp.png)
        
        - User Views All the Reviews for that Game

        ![game_all_reviews](https://hackmd.io/_uploads/rkOQZ1sPa.png)
        
        - Registered User can Edit the Game Page and Add Entities for the Game from Drawer

        ![game_page_add_entity_edit_game_drawer](https://hackmd.io/_uploads/Hyx0Z1jvp.png)
        
        ![edit_game_page](https://hackmd.io/_uploads/HJstXkoDT.png)
        
        ![create_entity_for_game](https://hackmd.io/_uploads/HyMsmysPT.png)
        
        ![game_entity_type_selection](https://hackmd.io/_uploads/B1k2XJoPT.png)

        - Registered User can Rate the Game via Star Icons directly

        ![game_page_high_rate-min](https://hackmd.io/_uploads/rJGjf1jwa.png)
        
        - User can View All the Entities of the Game

        ![game_page_all_entities](https://hackmd.io/_uploads/HJ0WXJiP6.png)
        
        - User can View a Specific Entity
        
            * Character Entity
        ![character_entity_example-min](https://hackmd.io/_uploads/HJNNVJivT.png)
        
            * Package Entity
        ![entity_package_example_sims2-min](https://hackmd.io/_uploads/ByVwNysD6.png)
        
            * Item Entity
        ![item_entity_ex_pokemon_blue-min](https://hackmd.io/_uploads/r18Y4Jjwa.png)
        
            * Environment Entity
        ![game_page_environment_entity_example_sims2-min](https://hackmd.io/_uploads/SyDqE1ovp.png)
        
        - Mobile Source Codes:
            * [entity_summary.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/entity_summary.dart)
            * [game_review.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/game_review.dart)
            * [game_summary.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/game_summary.dart)
            * [create_entity.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/create_entity.dart)
            * [create_game.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/create_game.dart)
            * [edit_game.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/edit_game.dart)
            * [entity_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/entity_page.dart)
            * [game_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/game_page.dart)
            * [game_properties.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/game_properties.dart)
            * [game_reviews_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/game_reviews_page.dart)
            * [games_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/games_page.dart)
            
* Upcoming Titles:
    * Web
        - Users can View Upcoming Titles on Games Page
        
        ![Ekran Resmi 2023-12-29 11.53.51](https://hackmd.io/_uploads/SkaQK-3DT.jpg)
        
        - Registered Users can Like, Dislike, or Comment on Upcoming Title Posts
         ![Ekran Resmi 2023-12-29 11.56.00](https://hackmd.io/_uploads/SyL2YW3P6.jpg)
         - Web Source Code
             - [GamesPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/GamesPage.js)
             - [ForumTopic.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/components/ForumTopic.js)

    * Mobile
        - Users can View Upcoming Titles on Main Page

        ![upcoming_titles_page](https://hackmd.io/_uploads/B1AcwJsD6.png)

        - Registered Users can Like, Dislike, or Comment on Upcoming Title Posts

        ![upcoming_titles_post_example](https://hackmd.io/_uploads/r1FWuJiw6.png)
        
        - Mobile Source Code:
            * [upcoming_title_thread_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/upcoming_title_thread_page.dart)
            * [upcoming_titles.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/upcoming_titles.dart)
            * [upcoming_title_post.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/upcoming_title_post.dart)
        
* Search Page:
    * Web
        - User can search from header for games, forums, and groups
  
         ![Ekran Resmi 2023-12-29 12.41.26](https://hackmd.io/_uploads/BJqvVf3Pp.jpg)
     
        - Users can search for games from the games page
    
         ![Ekran Resmi 2023-12-29 12.40.52](https://hackmd.io/_uploads/Hk7VVf2Da.jpg)

         - Users can search for the groups from groups page

    ![Ekran Resmi 2023-12-29 11.51.29](https://hackmd.io/_uploads/SkQj_WnvT.jpg)
    
    ![Ekran Resmi 2023-12-29 11.52.10](https://hackmd.io/_uploads/SyspOb2v6.jpg)





    * Mobile
        - Users can Search Games, Threads, and other Users

        ![search_landing_page-min](https://hackmd.io/_uploads/rJFBF1owT.png)
        
        - Users can Search Games by Their Titles, Tags, and Platforms They Supported. Also Users can Apply Further Filtering and Sorting

        ![red_game_search](https://hackmd.io/_uploads/ry0qtkiwa.png)
        
        ![search_results_for_title_red-min](https://hackmd.io/_uploads/SJvUcyow6.png)
        
        

        - Users can Search Posts by Their Titles, Bodies, Tags, Game They Belong, and User They Belong. Also users can Apply Further Filtering and Sorting on the Result. 
               
        ![sims_post](https://hackmd.io/_uploads/r1qEsysP6.png)

        ![search_post_results_for_game_sims](https://hackmd.io/_uploads/rkmPsJswa.png)
        
        - Users can Search Other Users by Their Usernames

        ![kard_search](https://hackmd.io/_uploads/BJUy31iDT.png)
        
        ![search_user_results_for_-kar-_keyword](https://hackmd.io/_uploads/ByvgnJovT.png)
        
        - Also Users can Visit Other Users' Profile Pages Directly Pushing on Desired Search Result

        ![visiting_another_users_profile](https://hackmd.io/_uploads/Bk_O3yjva.png)
        
        - Mobile Source Code:
            * [game_summary.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/game_summary.dart)
            * [user_summary.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/user_summary.dart)
            * [detailed_game_search.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/detailed_game_search.dart)
            * [detailed_post_search.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/detailed_post_search.dart)
            * [detailed_user_search.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/detailed_user_search.dart)
            * [search_landing_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/search_landing_page.dart)
            * [search_page_game.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/search_page_game.dart)
            * [search_page_post.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/search_page_post.dart)
            * [search_page_user.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/search_page_user.dart)


* Annotations:
    * Web
        * Users can View Annotations Previously Entered 
        <img width="1633" alt="Ekran Resmi 2023-12-29 11 41 26" src="https://github.com/bounswe/bounswe2023group7/assets/70536420/83a596d4-ceb1-42e8-863c-23feb0771b6b">
        <br>
            <img width="1633" alt="Ekran Resmi 2023-12-29 11 41 26" src="https://hackmd.io/_uploads/SkTKAt3vp.png">

        *  Registered Users can Select Any Phrase to Annotate by Selecting It and Holding until Annotate Option Appears and can write desired annotation here
        <img width="1030" alt="Ekran Resmi 2023-12-29 11 37 23" src="https://github.com/bounswe/bounswe2023group7/assets/70536420/d167be19-8f54-49b3-b185-f6c723e225da">
        * Source Code:
            - [GamePage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/GamePage.js) 
            - [EntityPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/EntityPage.js)
           - [ThreadPage.js](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/frontend/src/pages/ThreadPage.js)

    * Mobile
        - Users can View Annotations Previously Entered

        ![view_annotation_for_sims](https://hackmd.io/_uploads/HkrZA1owp.png)
        
        - Registered Users can Select Any Phrase to Annotate by Selecting It and Holding until Annotate Option Appears

        ![annotated_phrase_selection](https://hackmd.io/_uploads/BkDK01jvT.png)
        
        - Then User can Enter Desired Annotation for that Phrase

        ![creating_annotation](https://hackmd.io/_uploads/H15RRJjDT.png)
        
        - Mobile Source Code:
            * [entity_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/entity_page.dart)
            * [game_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/game_page.dart)
            * [thread_page.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/thread_page.dart)
            * [styledRange.dart](https://github.com/bounswe/bounswe2023group7/blob/development/ludos/mobile/lib/reusable_widgets/styledRange.dart)



---
* For each user of your user interface designs, provide the relevant links to the source code in your project repository
* Provide screenshots with meaningful content for the Web and Mobile user interfaces you have implemented.

## **Annotations**

### **Web:**
* ***Status:*** In our project, annotations have been successfully implemented across various sections, enhancing user interaction and content engagement. This includes *image annotations* for *thread images* and *text annotations* for game bios, stories, guides, trivia in the *game page*; entity descriptions in the *entity page*; thread texts, and comments in the *thread page*. This implementation has been tailored to foster a more interactive and informative experience for users, allowing them to add, view, and delete annotations in multiple pages within the platform.
* ***Compliance with W3C WADM:*** Our implementation strictly adheres to the W3C Web Annotation Data Model (WADM) standards. This compliance ensures that our annotation system is robust, interoperable, and aligns with global web standards. By following WADM, we've created a system where annotations are not only consistent across different parts of our platform but also potentially compatible with other systems using the same standards.
    * *According to W3C WADM, an annotation should consist of a body, a target, and context data. Here's how our implementation aligns with this:*
      ```
      // Format Annotation Data (example from your text annotation implementation)
        const formatAnnotationData = (annotation) => {
          return {
            "@context": "http://www.w3.org/ns/anno.jsonld",
            type: "Annotation",
            body: {
                type: "TextualBody",
                value: annotation.body[0].value,
                purpose: "commenting"
            },
            target: {
                source: window.location.href,
                selector: {
                    start: annotation.target.selector[1].start,
                    end: annotation.target.selector[1].end
                }
            }
            };
        };
        ```
            In this function:
            @context specifies the JSON-LD context for W3C WADM. 
            type is set to "Annotation".
            body contains the content of the annotation, its type, and purpose.
            target identifies where the annotation applies, including the source (URL) and the text selector (start and end positions).
                    
        * Our project uses RESTful API calls to interact with annotations. Here's an example that aligns with WADM standards:
         ```
        // Send Annotation Data to Server
        const sendAnnotationData = async (data, method) => {
            try {
            const url =`http://${process.env.REACT_APP_API_URL}/annotation/post/{threadId}`;
            const response = await axios.post(url, data);
            console.log(`Annotation ${method}d:`, response.data);
            } catch (error) {
            console.error(`Error ${method}ing annotation:`, error);
          }
      };
    ```
    In this function:
    Annotations are sent to the server using a POST request.
    The annotation data is structured in accordance with WADM, ensuring consistency and standardization.
    The server endpoint (/annotation/post/{threadId}) is designed to receive and process annotations in the WADM format.
* ***Implementation description***
1. **Image Annotations (Thread Page):** Implemented using the Annotorious library, we enabled users to annotate images in thread sections. Users can add comments to selected parts of an image and delete them, enhancing the visual content with interactive and informative notes.

2. **Text Annotations (Game Page & Entity Page):** For game-related content like bios, stories, guides, and trivia, as well as entity descriptions, we utilized the Recogito library. This feature allows users to highlight text segments and add and delete annotations, offering insights or additional information relevant to the selected text.

3. **Thread and Comment Annotations (Thread Page):** The thread and comments sections of the project are equipped with text annotation capabilities. This feature enhances user engagement, allowing users to create and delete annotations.

    **Technical Details:**

    * For initializing annotations, we ensured the DOM elements were available and used *useEffect* hooks for setup.
    * *useRef* was employed to manage the annotation instances, ensuring they are correctly initialized and destroyed based on the component lifecycle.
    * We included functions such as *onAnnotationCreated* and *onAnnotationDeleted* to handle annotation interactions.
    * AJAX calls via axios were used to interact with our backend, adhering to the WADM structure in our API requests and responses.

### **Mobile:**
* ***Status:*** In our mobile application, we have successfully integrated annotations into various content sections, including *Thread content, Comment content, Entity Description, and Game Bio content*. Currently, text annotations are available for all these sections, except for image annotation, which has not been implemented. It's important to note that since we only show *Game Bio* field in Game Pages, annotation is applicable for that field only within the context of games. Users of any type have the ability to contribute annotations to these fields. Upon visiting a page that has at least one annotation, users will encounter the annotated text. A simple click on the annotated text triggers a pop-up, showing additional details about the annotation.
* ***Compliance with W3C WADM:*** As mobile team, we stick to the rules of the W3C Web Annotation Data Model (WADM) to make sure our annotation system works well. This means our system is strong, can work with other systems, and follows the same rules as the entire web. The annotations in mobile and frontend work compatible thanks to this system.
* ***Implementation description:*** In Flutter, we didn't use any library to handle the annotation functionalities. The text annotation in specified pages and fields are very similar to each other. So, I will use Game Bio for example.
For any annotatable field, we used *SelectableText.rich* property. We added an *Annotate* button to the context menu, which is the menu that shows up when you long press some text. When you click it and type the your annotation, you can click the *Create Annotation* button in the popup. When this button is pressed, the related function in our API Service is called, for example: 
```
apiService.createAnnotationGameBio(
                              widget.token,
                              widget.id,
                              annotatedText,
                              start,
                              end,
                              annotationText);
```
This sends a POST request to our backend server. 
```
 Future<http.Response> createAnnotationGameBio(
      String? authToken,
      String gameID,
      String source,
      int start,
      int end,
      String annotationBody) async {
    var uri = Uri.parse("$baseURL/annotation/gamebio/$gameID");

    final body = jsonEncode(<String, Object>{
      '@context': "",
      'type': "Annotation",
      'body': annotationBody,
      'target': {
        'source': source,
        'selector': {'start': start, 'end': end}
      }
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }
```
For building a page that includes annotation, in the *initState()* function of that page, we send a GET request to the backend server to get the annotations in that page. After getting the annotations, we build the field with the annotated texts in a different background color. When the user clicks an annotated text, a box which shows the annotation details will pop up.

* ***API calls examples to annotation server:*** [Postman Collection](https://api.postman.com/collections/22203914-387eae3e-9c2f-4cec-aeb5-50be244f29d5?access_key=PMAT-01HJV6MPTAGZCWQQR1NQ3WBB3G)


## **Scenario**

### Hatice Erk

**Persona** 

- Age: 22
- Job: Software Developer
- Interests: Playing mobile and board games, watching movies, and listening to music

**Story**

Hatice, a 22-year-old software developer who loves playing games on her phone and board games. When she's not coding, she enjoys diving into virtual worlds, watching movies, and listening to music. Hatice is already a user of the gaming platform, Ludos, where she shares her gaming experiences with the community. One day, as she scrolled through her usual games, she felt a bit bored and decided to explore our platform more.

**Goals**

- She wants to have a better profile to interact with people easily.
- She wants to create a group to communicate about the episode she stuck in her favorite mobile game, Merge Mansion.
- She wants to learn more about the game "It Takes Two".
- She wants to look for new Upcoming Titles.
- She wants to look her friends favorite games and activities.

**Preconditions**
- She is a registered user of the platform.
- She has sufficient knowledge of the platform to surf.

**Actions**

- She tries to log into her account but can not remember her password.
- She clicks the "Forgot Password" button.
- She verifies her e-mail, and creates a new password.
- She logs into her account with her new pasword.
- She navigates to her profile screen.
- She adds a profile picture.
- She updates her gaming interests in "About Me".
- She goes to Groups section.
- She creates a group called "Episode: Conservatory" for "Merge Mansion".
- She creates the first post in the group asking how long it takes to pass this episode. 
- She goes back to Groups section.
- She filters groups with the game "It Takes Two".
- She joins to "It Takes Two Beginners" group.
- She reads the posts in the forum of this group.
- She navigates to the game page of "It Takes Two".
- She follows the game.
- She looks the recommended games for this games, and sees "Sims 4", which she played before.
- She navigates to the game page of "Sims 4".
- She creates a review, rates the 4 out of 5 with her experience and writes her thoughts about the game.
- She goes to Upcoming Title's section.
- She sees an upcoming release for "The Witcher".
- She comments under this thread.
- She goes to "The Witcher" game page.
- She clicks "See All Entities" button.
- She sees "Ciri" under characters section.
- She clicks and reads the information about "Ciri".
- She creates an annotation for description of "Ciri".
- She navigates to the search.
- She clicks the User search.
- She looks for her friend Kardelen.
- She clicks the button to navigate Kardelen's page.
- She navigates and sees the Kardelen's page.
- She sees last activities of Kardelen.


## **Management**

### Implemented Changes and their impact
1. Scenerio Strategy:

    In the first milestone demo, while preparing for scenorio, we focused on the wrong aspects such as persona and story. In the first presentation, we created a boy which wanted to search about a game. However, the scenerio was not effective on audience, so presentation seemed weak and criticized. Additionally some mishaps we encountered worsened our presentation.

    In the second milestone demo, we focused on the story side of the scenerio and improved our preperation. The scenerio was better than the first. The audience was more reactive to presentation and features are displayed with better scenerio telling. However the relationship between people in the scenerio was not quite related with game-spesific domain.
    
    In the third milestone demo, we created a more basic and game-spesific scenerio to show our features. Our belief is, we were able to show our features well and we impressed audience about our key features.
    
2. Web Home Page
    
    One of the critic issues was home page throughout term. In the presentation, customers asked mainly how homepage is related with games. We planned firstly home page would display forum topics related games. However, forum was not first main component of the platform. Additionally, the topics includes topics such as bugs, errors, so the customers requested from us to modify the home page. 
    
    In second milestone. we present a more combined homepage and at this time we did not get negative feedback. We continued to attach additional features and implemented a home page linked with groups, forums, and most importantly games.
    
3. Communication Between Teams
    
    In the first weeks of the term, the mobil and frontend teams did not communicate well. We got feedback that mobile and frontend were not coherent completely. Therefore as much as possible we decided to add together and implemented similarly.
    
4. Lab Hours Efficiency
    
    The the first labs we focused on deliverables instead of group communication. We was sharing our tasks and filling the report. However after first milestone, we started to discuss more about what we should have done and what we should do. We discussed together how functionalities should be developed in each lab. In short, we prioritize to detail our plan instead of task sharing and report writing. 
    

### Reflections related to your Final Milestone Demo

    
The general impression of the customers was good on our view. In this demo, we aimed to represent annotations, groups, game entities, recommendations and search functionality based features. These functionalities almost did not have a problem before the presentation and in the demo we could show them seamlessly.
    
The customers particularly expected to see these uncommon features from our application:
    - Text Annotation
    - Image Annotation
    - Semantic Search
The text and image annotations did not get a negative review. Especially our image annotation attracted attention. On the other hand, semantic search was not liked as annotations. Customers were not happy with it.
    

    

### Lessons Learned
    
What we could have change:
    
* The allocation of teams can be changed. However the team consists of 11 people, so we would deal with problems eventually. Backend team was not be able to share tasks evenly as mobile and frontend team. The effort usually belonged at most two people (especially, Ömer Şafak).  
    
* We should not have lost time with mock datas. Sometimes frontend and mobile team we went ahead of backend. Therefore, connecting them also needed us to work on the same page. Additionally, some design choices made our job harder. Due to miscommunication, sometimes we did incompitable implementation between pages, and this caused to deal with them again. 


    

    



# **Individual Reports**
