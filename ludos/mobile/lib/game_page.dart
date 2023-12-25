import 'dart:convert';
import 'dart:core';
import 'dart:ui';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/create_entity.dart';
import 'package:ludos_mobile_app/edit_game.dart';
import 'package:ludos_mobile_app/entities_page.dart';
import 'package:ludos_mobile_app/reusable_widgets/game_review.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/reusable_widgets/rec_games.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:provider/provider.dart';
import 'forum_page.dart';
import 'game_properties.dart';
import 'game_reviews_page.dart';
import 'helper/colors.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'helper/APIService.dart';
import 'main.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class GamePage extends StatefulWidget {
  final VoidCallback onRefresh;
  final UserProvider userProvider;
  final String? token;
  final String id;
  const GamePage({required this.id, required this.token, Key? key, required this.userProvider, required this.onRefresh}) : super(key: key);
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
  late Future<List<RecommendedGame>> recGameList;

  @override
  initState() {
    super.initState();
    loadGameData();
    initializeFollowState();
    ToList(fetchReviewData(widget.token));
    recGameList = loadRecGames(widget.userProvider, widget.token);
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
  Future<List<RecommendedGame>> loadRecGames(UserProvider userProvider, String? token) async {
    final response = await apiService.getGameRecommendation(widget.token,widget.id);
    try {
      if (response.statusCode == 200) {
        final  List<dynamic> gamesList = json.decode(response.body);
        return gamesList
            .map((dynamic item) => RecommendedGame(
            title: item['title'],
            averageRating: (item['averageRating'] == null
                ? 0
                : item['averageRating'].toDouble()),
            coverLink: item['coverLink'],
            id: item['id'],
            token: token,
            userProvider: userProvider))
            .toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load games');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load games');
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
            setState(() {});
            return Review(
              token: widget.token,
              userProvider: widget.userProvider,
              reviewId: item['reviewId'],
              content: item['content'],
              rating: item['rating'].toDouble(),
              gameId: item['gameId'],
              userId: item['userId'],
              username: json.decode(userResponse.body)['username'],
              thumbUps: item['likedUserCount'] ?? 0,
              thumbDowns: item['dislikedUserCount'] ?? 0,
              time: item['createdAt'],
              isLiked: item['isLikedByUser'] ?? false,
              isDisliked: item['isDislikedByUser'] ?? false,
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
    return WillPopScope(
        onWillPop: () async {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home()));
      return false;
    },
    child: SelectionArea(contextMenuBuilder:(context, editableTextState) {
      final List<ContextMenuButtonItem> buttonItems = editableTextState.contextMenuButtonItems;
      buttonItems.insert(
        0,
        ContextMenuButtonItem(
          label: 'Annotate',
          onPressed: () {
            // Annotation code    
          },
        ),
      );
      return AdaptiveTextSelectionToolbar.buttonItems(
        anchors: editableTextState.contextMenuAnchors,
        buttonItems: buttonItems,
      );
    },

      child: Scaffold(
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
                    CustomWidgets.needLoginSnackbar(context, "Please log in to edit the game! ");
                  }
                },
              ),
              ListTile(
                title: const Text(
                  'Add an Entity',
                  style: TextStyle(color: MyColors.white),
                ),
                onTap: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => CreateEntityPage(
                        gameID: widget.id,
                        token: widget.token,
                        userProvider: widget.userProvider,
                      ),
                    ));
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
                    '${(gameData['averageRating'] == null ? 0 : gameData['averageRating'].toDouble().toStringAsFixed(2))}/5.00'
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
                  onRatingUpdate: (rating) async {
                    await APIService().createRate(widget.token, widget.id, rating);
                  },
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
                      CustomWidgets.needLoginSnackbar(context, "Please log in to follow a game! ");
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
                                widget.onRefresh();
                                print("Unfollowed");
                              } else {
                                print("Error: ${token.statusCode}");
                              }
                            } else {
                              http.Response token = await APIService().followGame(
                                  widget.token, widget.id);
                              if (token.statusCode == 200) {
                                state = true;
                                widget.onRefresh();
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
            if (gameData['gameBio'] != null)
              Text(
                gameData['gameBio'].toString(),
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
            const Text(
              'Recommended Games',
              style: TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: FutureBuilder<List<RecommendedGame>>(
                  future: recGameList,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      // Show a loading indicator while fetching data
                      return const Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      // Handle errors
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                      // Handle the case when there is no data
                      return const Center(child: Text('No games available.'));
                    } else {
                      // Display the fetched data
                      return Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: snapshot.data!,
                      );
                    }
                  },
                ),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                 ElevatedButton(
                style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(MyColors.blue),
                  ),
                child: const Text(
                  'See All Entities',
                  style: TextStyle(color: MyColors.white),
                ),
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => EntitiesPage(gameId: widget.id, userProvider: widget.userProvider,),
                    ));
                },
              ),
              ],
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
                            CustomWidgets.needLoginSnackbar(context, "Please log in to add a review! ");
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
                            rating.round().toDouble());
                        http.Response token1 = await APIService().createRate(
                            widget.token, widget.id, rating.round().toDouble());
                        if (token.statusCode == 201 && token1.statusCode == 201) {
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
                                                onRefresh: widget.onRefresh,
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
                                            onRefresh: widget.onRefresh,
                                            token: widget.token,
                                            userProvider: widget.userProvider,
                                            id: widget.id)),
                                  ));
                        } else {
                          CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
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
                height: 4.0,
                thickness: 4.0,
                color: MyColors.lightBlue,
              ),
              if(!reviews.isEmpty)
                reviews[0],
            ])
          ],
        ),
      ),

      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    )
),
    );
  }
}
