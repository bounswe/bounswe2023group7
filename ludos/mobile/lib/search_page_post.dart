import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'login_page.dart';
import 'main.dart';
//import 'reusable_widgets/game_summary.dart';
import 'reusable_widgets/forum_thread.dart';
import 'helper/APIService.dart';
import 'create_game.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class SearchPagePost extends StatefulWidget {
  final int page;
  final String? order;
  final String? owner;
  final String? searchKey;
  final String? gameTitle;
  final String? tags;
  final String? token;
  final String? criteria;
  final bool? isLiked;
  final bool? isDisliked;
  //final String? groupId;
  final UserProvider userProvider;

  const SearchPagePost({
    Key? key,
    required this.page,
    required this.token,
    this.order,
    this.gameTitle,
    this.owner,
    this.searchKey,
    this.tags,
    this.criteria,
    this.isLiked,
    this.isDisliked,
    //this.groupId,
    required this.userProvider})
      : super(key: key);

  @override
  State<SearchPagePost> createState() => _SearchPagePostState();
}

class _SearchPagePostState extends State<SearchPagePost> {
  late int size = 0;
  List<String> gameID = [];
  late Future<List<ThreadSummary>> threads = Future.value([]);

  @override
  void initState() {
    super.initState();
    initializeData();
  }

  Future<void> initializeData() async {
    await fetchGameID(widget.token, widget.gameTitle!);
    threads = fetchData(widget.token);
    setState(() {
    });
  }

  @override
  void didUpdateWidget(covariant SearchPagePost oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.searchKey != oldWidget.searchKey) {
      // Trigger a new data fetch when searchKey changes
      threads = fetchData(widget.token);
    }
  }

  Future<void> fetchGameID(String? token, String gameTitle) async {
    try {
      final response = await APIService().listGames(
        widget.userProvider.token,
        searchKey: gameTitle,
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        // Check if 'items' key exists in the response data
        if (responseData.containsKey('items')) {
          List<dynamic>? gamesList = responseData['items'];

          // Check if gamesList is not null and not empty
          if (gamesList != null && gamesList.isNotEmpty) {
            setState(() {
              for (int i = 0; i < gamesList.length; i++) {
                gameID.add(gamesList[i]['id'].toString());
              }
            });
          } else {
            throw Exception('No games found with the given title');
          }
        } else {
          throw Exception('Invalid response format: Missing "items" key');
        }
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load games');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load games');
    }
  }


  Future<List<ThreadSummary>> fetchData(String? token) async {
    // final response = await APIService().listThreadsBySearch(searchText, widget.gameid, widget.token);
    final response = await APIService().listPosts(
      widget.userProvider.token,
      page: widget.page,
      searchKey: widget.searchKey ?? '',
      tags: widget.tags ?? '',
      order: widget.order ?? '',
      orderByKey: widget.criteria ?? '',
      isLiked: widget.isLiked ?? false,
      isDisliked: widget.isDisliked ?? false,
      //groupId: widget.groupId ?? '',
      ownerUserId: widget.owner ?? '',
      gameId: (widget.gameTitle != null) ? gameID : const [],
    );
    try {
      if (response.statusCode == 200) {
        print("Response: ${response.body}");
        final String responseData = response.body;
        print("Response Data: $responseData");

        List<dynamic> postLists = json.decode(responseData)['items'];
        print("Post Lists: $postLists");
        return postLists.map((dynamic item) => ThreadSummary(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: item['id'],
          title: item['title'],
          game: item['game']['title'],
          gameId: item['game']['id'],
          userId: item['user']['id'],
          username: item['user']['username'],
          thumbUps: item['numberOfLikes'],
          thumbDowns: item['NumberOfDislikes'],
          time: item['createdAt'],
          isLiked: (item['isLiked'] ?? false),
          isDisliked: (item['isDisliked'] ?? false),
          textColor: MyColors.white,
          backgroundColor: MyColors.blue,
          fontSize: 20,
        )).toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load posts');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load threads!');
    }
  }

  /*
  Future<List<GameSummary>> fetchData(String? token) async {
    //final response = await APIService().listSearchedGames(widget.userProvider.token, widget.searchKey);
    //final response = await APIService().search(widget.userProvider.token, widget.searchKey!);
    final response = await APIService().listGames(
        widget.userProvider.token,
        page: widget.page,
        order: widget.order ?? '',
        searchKey: widget.searchKey ?? '',
        platforms: widget.platforms ?? '',
        isFollowed: widget.isFollowed,
        orderByKey: widget.criteria ?? '',
        tags: widget.tags ?? '');
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> gamesList = responseData['items'];
        setState(() {
          size = gamesList.length;
        });
        return gamesList
            .map((dynamic item) => GameSummary(
            title: item['title'],
            averageRating: (item['averageRating'] == null
                ? 0
                : item['averageRating'].toDouble()),
            coverLink: item['coverLink'],
            numOfFollowers: item['followers'],
            gameStory: item['gameStory'],
            tags: item['tags'],
            textColor: MyColors.white,
            backgroundColor: MyColors.blue,
            fontSize: 20,
            id: item['id'],
            token: widget.token,
            userProvider: widget.userProvider))
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
*/

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 15),
          //const SafeArea(child: SizedBox(height: 10)),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: FutureBuilder<List<ThreadSummary>>(
              future: threads,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  // Show a loading indicator while fetching data
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  // Handle errors
                  return Center(child: Text('Error: ${snapshot.error}'));
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  // Handle the case when there is no data
                  return const Center(
                      child: Text('No post found',
                          style: TextStyle(color: MyColors.orange,
                              fontSize: 16,
                              fontWeight: FontWeight.bold)));
                } else {
                  // Display the fetched data
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: snapshot.data!,
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}

