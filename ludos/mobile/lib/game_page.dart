import 'dart:convert';
import 'dart:core';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/userProvider.dart';
import 'forum_page.dart';
import 'helper/colors.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'helper/APIService.dart';
import 'login_page.dart';

class GamePage extends StatefulWidget {
  final UserProvider userProvider;
  final String? token;
  final String id;
  const GamePage({required this.id, required this.token, Key? key, required this.userProvider}) : super(key: key);
  @override
  State<GamePage> createState() => _GamePageState();
}
class _GamePageState extends State<GamePage> {
  late bool followState;
  late String buttonText;
  final APIService apiService = APIService();
  Map<String, dynamic> gameData = {};

  @override
  void initState() {
    super.initState();
    loadGameData();
    initializeFollowState();
  }

  void initializeFollowState() async {
    try {
      if(widget.userProvider.isLoggedIn){
        bool value = await getFollowState();
        setState(() {
          followState = value;
          buttonText = followState ? "Unfollow" : "Follow";
        });
      }else{
        setState(() {
          followState = false;
          buttonText = "Follow";
        });
      }

    } catch (error) {
      print("Error initializing follow state: $error");
    }
  }
/*
  Future<void> updateFollowState() async {
    var response = await apiService.userInfo(widget.token);
    var bool = false;
    for (var i = 0; i < json.decode(response.body)['followedGames'].length; i++) {
      if ((json.decode(response.body)['followedGames'][i])['id'] == widget.id) {
        bool = true;
      }
    }
    setState((){
      followState = bool;
    });
    setState(() {
      if(followState){
        buttonText = "Unfollow";
      }
      else{
        buttonText = "Follow";
      }
    });
  }
*/

  Future<bool> getFollowState() async {
    var response = await APIService().userInfo(widget.token);
    var bool = false;
    for (var i = 0; i < json.decode(response.body)['followedGames'].length; i++) {
      if (json.decode(response.body)['followedGames'][i]['id'] == widget.id) {
        bool = true;
        break;
      }
    }
    return bool;
  }

  Future<void> loadGameData() async {
    try {
      gameData = await apiService.getGame(widget.id, widget.token);

      setState(() {});
    } catch (e) {
      print('Error loading game data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: Text('${gameData['title']}'),
      ),
      body:  SingleChildScrollView(

        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            if(gameData['coverLink'] != null)
              Image.network(
                width: 200,
                height: 200,
                gameData['coverLink'].toString(),
                errorBuilder:
                    (BuildContext context, Object exception, StackTrace? stackTrace) {
                  return const Text('');
                },
                fit: BoxFit.fill,
              ),

            const SizedBox(height: 10),
            if (gameData['releaseDate'] != null)
              Text('Release Date: ${gameData['releaseDate']}',style: const TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
              ),
            const SizedBox(height: 10),
                Center(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        if (gameData['tags'] != null)
                          for (var i = 0; i < gameData['tags'].length; i++)
                              TextButton(
                                style: TextButton.styleFrom(
                                    foregroundColor: MyColors.lightBlue),
                                onPressed: () {},
                                  child: Text(gameData['tags'][i].toString()),
                            ),
                        ],
                    ),
                  ),
                ),
            const SizedBox(height: 10),

            Center(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    if (gameData['platforms'] != null)
                      for (var i = 0; i < gameData['platforms'].length; i++)
                        Text('${gameData['platforms'][i].toString()}   ',
                          style: const TextStyle(
                              color: MyColors.lightBlue,
                              fontWeight: FontWeight.bold
                          )),
                  ],
                ),
              ),
            ),
            Row(
              children: [
                if (gameData['userRating'] != null)
                RatingBar.builder(
                  initialRating: gameData['userRating'].toDouble(),
                  minRating: 0,
                  direction: Axis.horizontal,
                  allowHalfRating: true,
                  itemCount: 5,
                  itemSize: 40,
                  itemBuilder: (context, _) => const Icon(
                    Icons.star,
                    color: MyColors.orange,
                  ),
                  onRatingUpdate: (rating) {
                    print(rating);
                  },
                ),

                const SizedBox(width: 8), // Add some spacing between RatingBar and Text
                if (gameData['averageRating'] != null)
                  Text('${gameData['averageRating']}/5'.padLeft(22),style: const TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
              ],
            ),

            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(MyColors.blue),
                    ),
                    onPressed: () {
                        if(!widget.userProvider.isLoggedIn){
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: const Row(
                                children: [
                                  Icon(Icons.error, color: MyColors.blue),
                                  SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      'Please log in to follow game',
                                      style: TextStyle(
                                        color: MyColors.blue,
                                        fontSize: 16,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              backgroundColor: MyColors.blue2,
                              duration: const Duration(seconds: 5),
                              action: SnackBarAction(
                                label: 'Log In',
                                textColor: MyColors.blue,
                                onPressed: () {
                                  ScaffoldMessenger.of(context)
                                      .hideCurrentSnackBar();
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => LoginPage()),
                                  );
                                },
                              ),
                            ),
                          )
                              .closed
                              .then((reason) => {});
                        }else{
                          bool state = false;
                          Future<bool> executeAsyncActions() async {
                            bool state = false;
                          try {
                            if (followState) {
                              http.Response token = await APIService()
                                  .unfollowGame(widget.token, widget.id);
                              if (token.statusCode == 200) {
                                state = false;
                                print("Unfollowed");
                              } else {
                                print("Error: ${token.statusCode}");
                              }
                            } else {
                              http.Response token = await APIService().followGame(
                                  widget.token, widget.id);
                              if (token.statusCode == 200) {
                                state = true;
                                print("Followed");
                              } else {
                                print("Error: ${token.statusCode}");
                              }
                            }
                          } catch (error) {
                            print("Error: $error");
                          }
                          bool asd = await getFollowState();
                          return state;
                        }
                        executeAsyncActions().then((bool value) {
                          followState = value;
                          if (followState) {
                            setState(() {
                              buttonText = "Unfollow";
                            });
                          } else {
                            setState(() {
                              buttonText = "Follow";
                            });
                          }
                        });
                        }

                      /*
                      setState(() {
                        followState = state;
                        buttonText = state ? "Unfollow" : "Follow";
                      });
                      */
                    },

                  child: Text(buttonText),
                ),
              ],
            ),
            const SizedBox(height: 20),
            if(gameData['gameStory'] != null)
              Text(
                gameData['gameStory'].toString(),
                style: const TextStyle(
                  color: MyColors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            const SizedBox(height: 20),
                  ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(MyColors.lightBlue),
                    ),
                    onPressed: ()
                    {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => ForumPage(gameid: widget.id, token: widget.token, userProvider: widget.userProvider),
                      ));
                    },
                    child: const Text(
                      'Explore the Forum',
                      //style: TextStyle(color: Colors.black)
                    ),
                  ),
            const SizedBox(height: 20),
            if(gameData['averageUserCompilationDuration'] != null)
              Text('Average User Compilation Time: ${gameData['averageUserCompilationDuration']}',style: const TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                      'A stunningly beautiful game with characters you grow to love. This is quite the adventure and I was all in within a few minutes of starting. In the midst of Norse mythology, it is a sweet and heartwarming story about a father and a son building a relationship.',
                      softWrap: true,
                      style: TextStyle(color: Colors.white)),
                ),
                Container(

                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      IconButton(
                          color: Colors.white,
                          onPressed: () {},
                          icon: const Icon(Icons.thumb_up_sharp)),
                      IconButton(
                          color: Colors.white,
                          onPressed: () {},
                          icon: const Icon(Icons.thumb_down_sharp)),
                      IconButton(
                          color: Colors.white,
                          onPressed: () {},
                          icon: const Icon(Icons.comment)),
                      const Text(
                        '10 hours ago',
                        style: TextStyle(color: Colors.white),
                      ),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(
                              foregroundColor: Color(0xFFf89c34)),
                          onPressed: () {},
                          child: Text('@sena'),
                        ),
                      ),

                    ],
                  ),
                ),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                      'Great story, characters, voice acting, cinematics, etc. The game world is huge and diverse and you travel by foot, by boat and (ultimately) by fast travel through mystic gates. ',
                      softWrap: true,
                      style: TextStyle(color: Colors.white)),
                ),
                Container(

                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      IconButton(
                          color: Colors.white,
                          onPressed: () {},
                          icon: const Icon(Icons.thumb_up_sharp)),
                      IconButton(
                          color: Colors.white,
                          onPressed: () {},
                          icon: const Icon(Icons.thumb_down_sharp)),
                      IconButton(
                          color: Colors.white,
                          onPressed: () {},
                          icon: const Icon(Icons.comment)),
                      const Text(
                        '2 days ago',
                        style: TextStyle(color: Colors.white),
                      ),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(
                              foregroundColor: Color(0xFFf89c34)),
                          onPressed: () {},
                          child: Text('@sena'),
                        ),
                      ),

                    ],
                  ),
                ),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}