import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'login_page.dart';
import 'main.dart';
import 'reusable_widgets/game_summary.dart';
import 'helper/APIService.dart';
import 'create_game.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class SearchPageGame extends StatefulWidget {
  final String? searchKey;
  final String? token;
  final UserProvider userProvider;

  const SearchPageGame({Key? key, required this.token, required this.searchKey, required this.userProvider})
      : super(key: key);

  @override
  State<SearchPageGame> createState() => _SearchPageGameState();
}

class _SearchPageGameState extends State<SearchPageGame> {
  late int size = 0;
  late Future<List<GameSummary>> games;

  @override
  void initState() {
    super.initState();
    games = fetchData(widget.token);
  }

  @override
  void didUpdateWidget(covariant SearchPageGame oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.searchKey != oldWidget.searchKey) {
      // Trigger a new data fetch when searchKey changes
      games = fetchData(widget.token);
    }
  }

  Future<List<GameSummary>> fetchData(String? token) async {
    //final userProvider = Provider.of<UserProvider>(context, listen: false);
    final response = await APIService().listSearchedGames(widget.userProvider.token, widget.searchKey);
    try {
      //print(json.decode(response.body));
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
              child: FutureBuilder<List<GameSummary>>(
                future: games,
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
                        child: Text('No game found with this input.',
                            style: TextStyle(color: MyColors.lightBlue,
                                fontSize: 20,
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

