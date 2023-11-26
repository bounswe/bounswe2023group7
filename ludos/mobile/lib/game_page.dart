import 'dart:convert';
import 'dart:core';
import 'dart:ui';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/edit_game.dart';
import 'package:ludos_mobile_app/reusable_widgets/game_review.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'forum_page.dart';
import 'game_properties.dart';
import 'game_reviews_page.dart';
import 'helper/colors.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'helper/APIService.dart';
import 'login_page.dart';

class GamePage extends StatefulWidget {
  final UserProvider userProvider;
  final String? token;
  final String id;
  const GamePage(
      {required this.id,
      required this.token,
      Key? key,
      required this.userProvider})
      : super(key: key);
  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  late bool followState;
  late String buttonText = ".";
  bool showForm = false;
  double rating = 0.0;
  late List<Review> reviews = [];
  final APIService apiService = APIService();
  Map<String, dynamic> gameData = {};

  @override
  initState() {
    super.initState();
    loadGameData();
    initializeFollowState();
    ToList(fetchReviewData(widget.token));
    print("getlisted");
  }

  void initializeFollowState() async {
    try {
      if (widget.userProvider.isLoggedIn) {
        bool value = await getFollowState();
        setState(() {
          followState = value;
          buttonText = followState ? "Unfollow" : "Follow";
        });
      } else {
        setState(() {
          followState = false;
          buttonText = "Follow";
        });
      }
    } catch (error) {
      print("Error initializing follow state: $error");
    }
  }

  Future<bool> getFollowState() async {
    var response = await APIService().userInfo(widget.token);
    var bool = false;
    for (var i = 0;
        i < json.decode(response.body)['followedGames'].length;
        i++) {
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

  void toggleFormVisibility() {
    setState(() {
      showForm = !showForm;
    });
  }

  Future<List<Review>> fetchReviewData(String? token) async {
    final response = await APIService().listReviews(widget.token, widget.id);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        return Future.wait(
            responseData.map<Future<Review>>((dynamic item) async {
          final userResponse =
              await APIService().userInfoById(item['userId'], widget.token);

          if (userResponse.statusCode == 200) {
            return Review(
              token: widget.token,
              userProvider: widget.userProvider,
              reviewId: item['reviewId'],
              content: item['content'],
              rating: item['rating'].toDouble(),
              gameId: item['gameId'],
              userId: item['userId'],
              username: json.decode(userResponse.body)['username'],
              thumbUps: item['likedUserCount'],
              thumbDowns: item['dislikeUserCount'],
              time: item['createdAt'],
            );
          } else {
            print(
                "Error fetching user info: ${userResponse.statusCode} - ${userResponse.body}");
            throw Exception('Failed to load user info!');
          }
        }).toList());
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load reviews!');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load reviews from API!');
    }
  }

  Future<void> ToList(Future<List<Review>> reviewList) async {
    reviews = await reviewList;
  }

  final TextEditingController contentController = TextEditingController();
  final TextEditingController rateController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      endDrawer: Drawer(
        child: Container(
          color: MyColors.darkBlue, // Drawer background color
          child: ListView(
            children: <Widget>[
              ListTile(
                title: const Text(
                  'Edit Game',
                  style: TextStyle(color: MyColors.white),
                ),
                onTap: () {
                  if (widget.userProvider.isLoggedIn) {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => EditGamePage(
                        id: widget.id,
                        token: widget.token,
                        userProvider: widget.userProvider,
                      ),
                    ));
                  } else {
                    ScaffoldMessenger.of(context)
                        .showSnackBar(
                          SnackBar(
                            content: const Row(
                              children: [
                                Icon(
                                  Icons.check_circle_outline,
                                  color: MyColors.blue,
                                ),
                                SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    'Please log in to edit game',
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
                  }
                },
              ),
            ],
          ),
        ),
      ),
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: Text('${gameData['title']}'),
        actions: [
          Builder(
              builder: (context) => IconButton(
                    onPressed: () => Scaffold.of(context).openEndDrawer(),
                    icon: Icon(Icons.more_horiz),
                    tooltip:
                        MaterialLocalizations.of(context).openAppDrawerTooltip,
                  ))
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            if (gameData['coverLink'] != null)
              Image.network(
                width: 200,
                height: 200,
                gameData['coverLink'].toString(),
                errorBuilder: (BuildContext context, Object exception,
                    StackTrace? stackTrace) {
                  return const Text('');
                },
                fit: BoxFit.fill,
              ),
            const SizedBox(height: 10),
            Row(
              children: [
                ...[
                  const Text(
                    'Average Rating:   ',
                    style: TextStyle(
                      color: MyColors.orange,
                      fontWeight: FontWeight.bold,
                      fontSize: 10,
                    ),
                  ),
                ],
                RatingBar.builder(
                  initialRating: (gameData['averageRating'] == null
                      ? 0
                      : gameData['averageRating'].toDouble()),
                  minRating: 0,
                  ignoreGestures: true, //to make non clickable rating bar
                  direction: Axis.horizontal,
                  allowHalfRating: true,
                  itemCount: 5,
                  itemSize: 20,
                  itemBuilder: (context, _) => const Icon(
                    Icons.star,
                    color: MyColors.orange,
                  ),
                  onRatingUpdate: (rating) {},
                ),
                Text(
                  '${(gameData['averageRating'] == null ? 0 : gameData['averageRating'].toDouble())}/5'
                      .padLeft(5),
                  style: const TextStyle(
                    color: MyColors.orange,
                    fontWeight: FontWeight.bold,
                    fontSize: 10,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            const Divider(
              height: 3.0,
              thickness: 2.0,
              color: Color(0xFFFFFFFF),
            ),
            Center(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    if (gameData['tags'] != null)
                      for (var i = 0; i < gameData['tags'].length; i++)
                        TextButton(
                          style: TextButton.styleFrom(
                              foregroundColor: MyColors.lightBlue),
                          onPressed: () {},
                          child: Text('#${gameData['tags'][i].toString()}'),
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
                                fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
            const Divider(
              height: 3.0,
              thickness: 2.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RatingBar.builder(
                  initialRating: (gameData['userRating'] == null
                      ? 0
                      : gameData['userRating'].toDouble()),
                  minRating: 0,
                  direction: Axis.horizontal,
                  allowHalfRating: true,
                  itemCount: 5,
                  itemSize: 40,
                  itemBuilder: (context, _) => const Icon(
                    Icons.star,
                    color: MyColors.orange,
                  ),
                  onRatingUpdate: (rating) {},
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ...[
                  ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(MyColors.lightBlue),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              GamePropertiesPage(gameData: gameData),
                        ),
                      );
                    },
                    child: const Text(
                      'Game Properties',
                      style: TextStyle(fontWeight: FontWeight.bold),
                      //style: TextStyle(color: Colors.black)
                    ),
                  ),
                ],
                ...[
                  const VerticalDivider(
                    width: 10.0,
                    thickness: 2.0,
                    color: Color(0xFFFFFFFF),
                  ),
                ],
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(MyColors.lightBlue),
                  ),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => ForumPage(
                          gameid: widget.id,
                          token: widget.token,
                          userProvider: widget.userProvider),
                    ));
                  },
                  child: const Text(
                    'Explore the Forum',
                    style: TextStyle(fontWeight: FontWeight.bold),
                    //style: TextStyle(color: Colors.black)
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
                    backgroundColor:
                        MaterialStateProperty.all<Color>(MyColors.blue),
                  ),
                  onPressed: () {
                    if (!widget.userProvider.isLoggedIn) {
                      ScaffoldMessenger.of(context)
                          .showSnackBar(
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
                    } else {
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
                            http.Response token = await APIService()
                                .followGame(widget.token, widget.id);
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
            if (gameData['gameStory'] != null)
              Text(
                gameData['gameStory'].toString(),
                style: const TextStyle(
                  color: MyColors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            const SizedBox(height: 20),
            if (gameData['averageUserCompilationDuration'] != null)
              Text(
                'Average User Compilation Time: ${gameData['averageUserCompilationDuration']}',
                style: const TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            const SizedBox(height: 20),
            Container(
                padding: const EdgeInsets.all(15.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      width: 150.0,
                      child: ElevatedButton(
                        style: TextButton.styleFrom(
                            backgroundColor: MyColors.orange),
                        onPressed: () {
                          if (widget.userProvider.isLoggedIn) {
                            toggleFormVisibility();
                          } else {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(
                                  SnackBar(
                                    content: const Row(
                                      children: [
                                        Icon(
                                          Icons.check_circle_outline,
                                          color: MyColors.blue,
                                        ),
                                        SizedBox(width: 8),
                                        Expanded(
                                          child: Text(
                                            'Please log in to add review',
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
                                              builder: (context) =>
                                                  LoginPage()),
                                        );
                                      },
                                    ),
                                  ),
                                )
                                .closed
                                .then((reason) => {});
                          }
                        },
                        child: const Text(
                          'Add Review',
                          style: TextStyle(color: MyColors.darkBlue),
                        ),
                      ),
                    ),
                    const SizedBox(width: 2.0),
                    Container(
                      child: TextButton(
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {
                          Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => ReviewPage(
                                gameid: widget.id,
                                token: widget.token,
                                userProvider: widget.userProvider),
                          ));
                        },
                        child: const Text(
                          'All Reviews -->',
                          style: TextStyle(color: MyColors.orange),
                        ),
                      ),
                    ),
                  ],
                )),
            if (showForm)
              Container(
                padding: const EdgeInsets.all(16.0),
                color: MyColors.blue,
                child: Column(children: [
                  Slider(
                    inactiveColor: MyColors.darkBlue,
                    activeColor: MyColors.orange,
                    value: rating.toDouble(),
                    min: 0,
                    max: 5,
                    onChanged: (value) {
                      setState(() {
                        rating = value;
                      });
                    },
                  ),
                  Text('Rating: ${rating.round()}'),
                  TextField(
                    controller: contentController,
                    decoration: InputDecoration(labelText: 'Enter your review'),
                    maxLines: 3,
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      http.Response token = await APIService().createReview(
                          widget.token,
                          widget.id,
                          contentController.text,
                          rating);
                      if (token.statusCode == 201) {
                        print("status is ok");
                        toggleFormVisibility();
                        ScaffoldMessenger.of(context)
                            .showSnackBar(
                              SnackBar(
                                content: const Row(
                                  children: [
                                    Icon(
                                      Icons.check_circle_outline,
                                      color: MyColors.blue,
                                    ),
                                    SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        'Your review is added successfully. You will be redirected to the Game Page.',
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
                                  label: 'OK',
                                  textColor: MyColors.blue,
                                  onPressed: () {
                                    ScaffoldMessenger.of(context)
                                        .hideCurrentSnackBar();
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => GamePage(
                                              token: widget.token,
                                              userProvider: widget.userProvider,
                                              id: widget.id)),
                                    );
                                  },
                                ),
                              ),
                            ) //ScaffoldMessager
                            .closed
                            .then((reason) => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => GamePage(
                                          token: widget.token,
                                          userProvider: widget.userProvider,
                                          id: widget.id)),
                                ));
                      } else {
                        print("status is not ok");
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: SizedBox(
                              width: MediaQuery.of(context).size.width,
                              child: Text(
                                json.decode(token.body)["message"],
                                style: const TextStyle(
                                  color: MyColors.blue,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                            backgroundColor: MyColors.blue2,
                            duration: const Duration(seconds: 10),
                            action: SnackBarAction(
                              label: 'OK',
                              textColor: MyColors.blue,
                              onPressed: () {
                                ScaffoldMessenger.of(context)
                                    .hideCurrentSnackBar();
                              },
                            ),
                          ),
                        );
                      }
                    },
                    child: const Text("Submit"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: MyColors.darkBlue,
                    ),
                  ),
                ]),
              ),
            Column(children: [
              const Divider(
                height: 5.0,
                thickness: 5.0,
                color: MyColors.lightBlue,
              ),
              if (reviews.isNotEmpty) 
                 reviews[0],
            ])
          ],
        ),
      ),
    );
  }
}
