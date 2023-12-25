import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/change_password.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/reusable_widgets/upcoming_title_post.dart';
import 'package:ludos_mobile_app/reusable_widgets/rec_games.dart';
import 'package:ludos_mobile_app/user_profile_page.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_thread.dart';
import 'package:ludos_mobile_app/reusable_widgets/home_game_sum.dart';
import 'helper/APIService.dart';
import 'login_page.dart';
import 'userProvider.dart';
import 'package:provider/provider.dart';
import 'helper/colors.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

void main() => runApp(ChangeNotifierProvider(
      create: (context) => UserProvider(),
      child: MaterialApp(
        home: Home(userProvider: UserProvider()),
      ),
    ));

class Home extends StatefulWidget {
  final UserProvider userProvider;
  const Home({Key? key, required this.userProvider}) : super(key: key);


  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late Future<List<HomeGameSum>> games;
  late Future<List<ThreadSummary>> threads;
  late Future<List<UpcomingThread>> threads2;
  late Future<Map<String, dynamic>> userData;
  late Future<List<RecommendedGame>> recGameListforUser;


  @override
  initState() {
    super.initState();
    var userProvider = widget.userProvider;
    games = fetchGameData(userProvider, userProvider.token);
    threads = fetchThreadData(userProvider, userProvider.token);
    threads2 = fetchDataUpc(userProvider, userProvider.token);
    userData = fetchUserData(userProvider, userProvider.token);
    recGameListforUser = loadRecGamesforUser(userProvider, userProvider.token);
    print("getlisted");
  }

  Future<List<HomeGameSum>> fetchGameData(
      UserProvider userProvider, String? token) async {
    final response = await APIService().listGames(token, limit: 6);
    try {
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

  Future<List<ThreadSummary>> fetchThreadData(
      UserProvider userProvider, String? token) async {
    final response = await APIService().listAllThreads(token, limit: "3");
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

         return postLists
            .where((item) =>
            item['upcomingTitle'] == null ||
            item['upcomingTitle']['isUpcomingTitle'] == false)
            .map((dynamic item) => ThreadSummary(
          token: token,
          userProvider: userProvider,
          threadId: item['id'],
          title: item['title'],
          game: item['game']['title'],
          gameId: item['game']['id'],
          userId: item['user']['id'],
          username: item['user']['username'],
          userAvatar: item['user']['avatar'],
          thumbUps: (item['numberOfLikes'] ?? 0),
          thumbDowns: (item['numberOfDislikes'] ?? 0),
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

  Future<List<UpcomingThread>> fetchDataUpc(UserProvider userProvider, String? token) async {
    final response = await APIService().listAllThreads(token, limit: "3");
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists
            .where((item) =>
            item['upcomingTitle'] != null &&
            item['upcomingTitle']['isUpcomingTitle'] == true)
            .map((dynamic item) =>
            UpcomingThread(
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
              isUpcomingTitle: item['upcomingTitle']['isUpcomingTitle'] ?? false,
              launchingDate: item['upcomingTitle']['launchingDate'] ?? '',
              demoLink: item['upcomingTitle']['demoLink'] ?? '',
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

  Future<Map<String, dynamic>> fetchUserData(
      UserProvider userProvider, String? token) async {
    if (userProvider.isLoggedIn) {
      final response = await APIService().userInfo(userProvider.token!);
      try {
        if (response.statusCode == 200) {
          final Map<String, dynamic> userData = json.decode(response.body);
          return userData;
        } else {
          throw Exception('Failed to load user data');
        }
      } catch (e) {
        throw Exception('Failed to load user data');
      }
    }
    return {};
  }

  Future<List<RecommendedGame>> loadRecGamesforUser(
      UserProvider userProvider, String? token) async {
    if (userProvider.isLoggedIn) {
      final response = await APIService().getGameRecForUser(userProvider.token);
      try {
        if (response.statusCode == 200) {
          final List<dynamic> gamesList = json.decode(response.body);
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
    return [];
  }

  @override
  Widget build(BuildContext context) {
    var userProvider = widget.userProvider;
    return Scaffold(
      drawer: Drawer(
        child: Container(
          color: MyColors.darkBlue,
          child: ListView(
            children: <Widget>[
              if (userProvider.isLoggedIn)
                UserAccountsDrawerHeader(
                  accountName: Text(
                    userProvider.username,
                    style:
                        const TextStyle(color: MyColors.darkBlue), // Text color
                  ),
                  accountEmail: null,
                  currentAccountPicture: FutureBuilder(
                    future: userData,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const CircularProgressIndicator();
                      } else if (snapshot.hasError) {
                        return Text('Error: ${snapshot.error}');
                      } else if (snapshot.hasData) {
                        var avatarUrl = snapshot.data!['avatar'];

                        return ElevatedButton(
                          onPressed: () {
                            if (userProvider.isLoggedIn) {
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) => UserProfilePage(
                                    userProvider: userProvider,
                                    id: userProvider.username),
                              ));
                            }
                          },
                          style: ElevatedButton.styleFrom(
                            elevation: 15.0,
                            backgroundColor: MyColors.white,
                            shape: const CircleBorder(),
                            padding: const EdgeInsets.all(0.0),
                          ),
                          child: CircleAvatar(
                            backgroundColor: MyColors.lightBlue,
                            radius: 50,
                            child: ClipOval(
                              child: avatarUrl != null
                                  ? Image.network(
                                      avatarUrl.toString(),
                                      width: 80,
                                      height: 80,
                                      fit: BoxFit.cover,
                                    )
                                  : const Icon(Icons.person),
                            ),
                          ),
                        );
                      }
                      return Container();
                    },
                  ),
                  decoration: const BoxDecoration(
                    color: MyColors.blue, // Header background color
                  ),
                ),
              if (!userProvider.isLoggedIn)
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
                      Navigator.pop(context);
                      CustomWidgets.needLoginSnackbar(
                          context, "Please log in to visit the profile page! ");
                    },
                  ),
                  decoration: const BoxDecoration(
                    color: MyColors.blue,
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
                    userProvider.setLoggedIn(false, '', '', '');
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
      ),
      body: ListView(
        children: <Widget>[
          Column(children: [
            const SizedBox(height: 10),
            const Text(
              "Popular Games",
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
            ),
            const SizedBox(height: 10),
            if (userProvider.isLoggedIn)
              const Text(
                "Recommended Games",
                style: TextStyle(
                  color: MyColors.orange,
                  fontSize: 30.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            if (userProvider.isLoggedIn)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: FutureBuilder<List<RecommendedGame>>(
                    future: recGameListforUser,
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
          ]),
          Column(children: [
            const SizedBox(height: 10),
            const Text(
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
                      return const Center(child: Text('No threads available.'));
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
              ),
              const SizedBox(height: 10),
              const Text(
                "Upcoming Titles ",
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
                  child: FutureBuilder<List<UpcomingThread>>(
                    future: threads2,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // Show a loading indicator while fetching data
                        return const Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        // Handle errors
                        return Center(child: Text('Error: ${snapshot.error}'));
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        // Handle the case when there is no data
                        return const Center(child: Text('No upcoming title available.'));
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
          ])
        ],
      ),
      /*
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
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        //builder: (context) => GamesPage(token: userProvider.token, userProvider: userProvider),
                      builder: (context) => SearchPage(),
                    ));
                  },
                  icon: const Icon(Icons.search_outlined)),
            ],
          )
      ),
      */
      bottomNavigationBar: CustomNavigationBar(userProvider: userProvider),
    );
  }
}