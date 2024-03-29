import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/search_game.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'main.dart';
import 'reusable_widgets/game_summary.dart';
import 'helper/APIService.dart';
import 'create_game.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class GamesPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  const GamesPage({Key? key, required this.token, required this.userProvider})
      : super(key: key);

  @override
  State<GamesPage> createState() => _GamesPageState();
}

class _GamesPageState extends State<GamesPage> {
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
    final response = await APIService().listGames(token);
    try {
      //print(json.decode(response.body));
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> gamesList = responseData['items'];
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
  // Feature/MB/529/update-on-page-visibility

  @override
  Widget build(BuildContext context) {
    return  WillPopScope(
        onWillPop: () async {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home(userProvider: widget.userProvider)));
      return false;
    },
    child: Scaffold(

      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Games'),
        actions: [
          TextButton(
            onPressed: () {
              if (widget.userProvider.isLoggedIn) {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => CreateGamePage(
                      token: widget.token, userProvider: widget.userProvider),
                ));
              } else {
                CustomWidgets.needLoginSnackbar(context, "Please log in to create a game! ", widget.userProvider);
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
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                const SizedBox(width: 10.0),
                Expanded(
                  child: TextFormField(
                    controller: searchInputController,
                    style: const TextStyle(color: MyColors.white),
                    obscureText: false,
                    decoration: const InputDecoration(
                      labelText: 'Search',
                      labelStyle: TextStyle(
                          color: MyColors.lightBlue,
                          fontWeight: FontWeight.bold),
                      border: UnderlineInputBorder(
                          borderSide: BorderSide(
                              color: MyColors.lightBlue, width: 2.0)),
                      focusedBorder: UnderlineInputBorder(
                        borderSide:
                            BorderSide(color: MyColors.lightBlue, width: 2.0),
                      ),
                    ),
                    cursorColor: MyColors.lightBlue,
                  ),
                ),
                Container(
                  decoration: BoxDecoration(
                    color: MyColors.lightBlue, // Set the background color
                    borderRadius: BorderRadius.circular(
                        5.0), // Optional: Add border radius for rounded corners
                  ),
                  child: IconButton(
                    onPressed: () {
                      setState(() {
                        searchText = searchInputController.text;
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SearchGame(
                                  token: widget.token,
                                  userProvider: widget.userProvider,
                                  searchKey: searchText)),
                        );
                        print(searchText);
                      });
                    },
                    icon: const Icon(Icons.search, color: MyColors.white),
                  ),
                ),
                const SizedBox(width: 5.0),
              ],
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
      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    ),
    );
  }
}
