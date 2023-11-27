import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/change_password.dart';
import 'package:ludos_mobile_app/user_profile_page.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_thread.dart';
import 'package:ludos_mobile_app/reusable_widgets/home_game_sum.dart';
import 'helper/APIService.dart';
import 'login_page.dart';
import 'games_page.dart';
import 'userProvider.dart';
import 'package:provider/provider.dart';
import 'helper/colors.dart';

void main() => runApp(ChangeNotifierProvider(
      create: (context) => UserProvider(),
      child: MaterialApp(
        home: Home(),
      ),
    ));

class Home extends StatefulWidget{
  const Home({Key? key})
      : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late Future<List<HomeGameSum>> games;
  late Future<List<ThreadSummary>> threads;

  Future<List<HomeGameSum>> fetchGameData(UserProvider userProvider, String? token) async {
    //final userProvider = Provider.of<UserProvider>(context, listen: false);
    final response = await APIService().listGames(token, limit: "6");
    try {
      //print(json.decode(response.body));
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> gamesList = responseData['items'];
        return gamesList
            .map((dynamic item) => HomeGameSum(
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

  Future<List<ThreadSummary>> fetchThreadData(UserProvider userProvider, String? token) async {
    final response = await APIService().listAllThreads(token, limit: "3");
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists.map((dynamic item) => ThreadSummary(
          token: token,
          userProvider: userProvider,
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

  @override
  Widget build(BuildContext context) {
    var userProvider = Provider.of<UserProvider>(context);
    games = fetchGameData(userProvider, userProvider.token);
    threads = fetchThreadData(userProvider, userProvider.token);
    return Scaffold(
      drawer: Drawer(
        child: Container(
          color: MyColors.darkBlue, // Drawer background color
          child: ListView(
            children: <Widget>[
              UserAccountsDrawerHeader(
                accountName: Text(
                  userProvider.username,
                  style:
                      const TextStyle(color: MyColors.darkBlue), // Text color
                ),
                accountEmail: null,
                currentAccountPicture: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    elevation: 15.0,
                    backgroundColor: MyColors.white,
                    shape: const CircleBorder(),
                    padding: const EdgeInsets.all(0.0),
                  ),
                  child: const CircleAvatar(
                    backgroundColor: MyColors.white,
                    child: Icon(Icons.person),
                  ),
                  onPressed: () {
                    if(userProvider.isLoggedIn){
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => UserProfilePage(userProvider: userProvider, id: userProvider.username),
                      ));
                    }
                    else{
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: const Row(
                            children: [
                              Icon(Icons.error, color: MyColors.blue),
                              SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  'Please log in to view profile page',
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
                decoration: const BoxDecoration(
                  color: MyColors.blue, // Header background color
                ),
              ),
              if (userProvider.isLoggedIn)
                ListTile(
                  title: const Text(
                    'Change Password',
                    style: TextStyle(color: MyColors.white),
                  ),
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => const ChangePassword(),
                    ));
                  },
                ),
              if (userProvider.isLoggedIn)
              ListTile(
                title: const Text(
                  'Log Out',
                  style: TextStyle(color: MyColors.white),
                ),
                onTap: () {
                  userProvider.setLoggedIn(false, '', '');
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => LoginPage(),
                  ));
                },
              ),

              if (!userProvider.isLoggedIn)
                ListTile(
                  title: const Text(
                    'Log In',
                    style: TextStyle(color: MyColors.white),
                  ),
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => LoginPage(),
                    ));
                  },
                ),
            ],
          ),
        ),
      ),
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: MyColors.orange,
        centerTitle: true,
        title: const Text('Ludos'),
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.notifications),
            tooltip: 'Comment Icon',
            onPressed: () {},
          ) //IconButton
        ],
      ),
      body: ListView(
        children: <Widget>[
          Column(
            children: [
              const SizedBox(height: 10),
              Text(
              "Favorite Games",
              style: TextStyle(
                  color: MyColors.orange,
                  fontSize: 30.0,
                  fontWeight: FontWeight.bold,
               ),
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: FutureBuilder<List<HomeGameSum>>(
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
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: snapshot.data!,
                        );
                      }
                  },
                ),
              ),
              )

            ]
          ),
          Column(
            children: [
              const SizedBox(height: 10),
              Text(
                "Trending Topics",
                style: TextStyle(
                  color: MyColors.orange,
                  fontSize: 30.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Padding(
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
                        return const Center(child: Text('No games available.'));
                      } else {
                        // Display the fetched data
                        return Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: snapshot.data!,
                        );
                      }
                    },
                  ),
                ),
              )
            ]
          )
        ],
      ),
      bottomNavigationBar: Container(
          color: MyColors.orange,
          padding: const EdgeInsets.all(10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                  color: MyColors.white,
                  onPressed: () {},
                  icon: const Icon(Icons.home)),
              IconButton(
                  color: MyColors.white,
                  onPressed: () {
                  },
                  icon: const Icon(Icons.group)),
              IconButton(
                  color: MyColors.white,
                  onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => GamesPage(token: userProvider.token, userProvider: userProvider),
                  ));
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
