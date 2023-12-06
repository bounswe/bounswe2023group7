import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/need_login_message.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'login_page.dart';
import 'main.dart';
import 'reusable_widgets/game_summary.dart';
import 'helper/APIService.dart';
import 'create_game.dart';

class SearchGame extends StatefulWidget {
  final String? searchKey;
  final String? token;
  final UserProvider userProvider;

  const SearchGame({Key? key, required this.token, required this.searchKey, required this.userProvider})
      : super(key: key);

  @override
  State<SearchGame> createState() => _SearchGameState();
}

class _SearchGameState extends State<SearchGame> {
  late int size = 0;
  late Future<List<GameSummary>> games;
  final TextEditingController searchInputController = TextEditingController();
  String searchText = '';

  @override
  void initState() {
    super.initState();
    games = fetchData(widget.token);
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
    return Scaffold(

      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: Text('Search Results for "${widget.searchKey}"'),
        actions: [
          TextButton(
            onPressed: () {
              if (widget.userProvider.isLoggedIn) {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => CreateGamePage(
                      token: widget.token, userProvider: widget.userProvider),
                ));
              } else {
                CustomWidgets.needLoginSnackbar(context, "Please log in to create a game! ");
              }
            },
            child: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 15),
            Container(
              padding: const EdgeInsets.only(left: 16.0),
              child: Text(
                '$size search results found for "${widget.searchKey}" keyword',
                textAlign: TextAlign.start,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                  fontSize: 16.0,
                ),
              ),
            ),
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
                    return const Center(child: Text('No games available.'));
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
      ),
      bottomNavigationBar: Container(
          color: MyColors.orange,
          padding: const EdgeInsets.all(10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                  color: MyColors.white,
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => Home(),
                    ));
                  },
                  icon: const Icon(Icons.home)),
              IconButton(
                  color: MyColors.white,
                  onPressed: () {
                  },
                  icon: const Icon(Icons.group)),
              IconButton(
                  color: MyColors.white,
                  onPressed: () {
                  },
                  icon: const Icon(Icons.games)),
              IconButton(
                  color: MyColors.white,
                  onPressed: () {},
                  icon: const Icon(Icons.favorite)),
              IconButton(
                  color: MyColors.white,
                  onPressed: () {},
                  icon: const Icon(Icons.search_outlined)),
            ],
          )
      ),
    );
  }
}

