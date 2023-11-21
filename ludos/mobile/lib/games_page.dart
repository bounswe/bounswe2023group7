import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'reusable_widgets/game_summary.dart';
import 'helper/APIService.dart';
import 'create_game.dart';

class GamesPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  const GamesPage({Key? key, required this.token, required this.userProvider}) : super(key: key);

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

        return gamesList.map((dynamic item) => GameSummary(
          title: item['title'],
          averageRating: item['averageRating'].toDouble(),
          coverLink: item['coverLink'],
          numOfFollowers: item['followers'],
          gameStory: 'gameStory',
          tags: item['tags'],
          textColor: MyColors.white,
          backgroundColor: MyColors.red,
          fontSize: 20,
          id: item['id'],
          token: widget.token,
          userProvider: widget.userProvider,
        )).toList();
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
        title: const Text('Games'),
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
                          color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                      border: UnderlineInputBorder(
                          borderSide:
                          BorderSide(color: MyColors.lightBlue, width: 2.0)),
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
                    borderRadius: BorderRadius.circular(5.0), // Optional: Add border radius for rounded corners
                  ),
                  child: IconButton(
                    onPressed: () {
                      setState(() {
                         searchText = searchInputController.text;
                         //print(searchText);
                       });
                    },
                    icon: const Icon(Icons.search, color: MyColors.white),
                  ),
                ),
                const SizedBox(width: 5.0),
                Container(
                  decoration: BoxDecoration(
                    color: MyColors.lightBlue, // Set the background color
                    borderRadius: BorderRadius.circular(5.0), // Optional: Add border radius for rounded corners
                  ),
                  child: TextButton(
                    style: TextButton.styleFrom(
                        backgroundColor: MyColors.lightBlue,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0),
                        )
                    ),
                    onPressed: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => CreateGamePage(token: widget.token, userProvider: widget.userProvider),
                      ));
                    }, child: const Text(
                      'Create Game',
                          style: TextStyle(
                            color: MyColors.white,
                            fontSize: 16.0,
                          ),
                  ),
                  ),
                ),

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
    );
  }
}
