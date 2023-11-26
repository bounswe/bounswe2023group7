import 'package:flutter/material.dart';
import 'games_page.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'main.dart';
import 'reusable_widgets/forum_thread.dart';
import 'dart:convert';
import 'package:ludos_mobile_app/userProvider.dart';
import 'create_thread_page.dart';

class ForumPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String gameid;
  const ForumPage({Key? key, required this.gameid, required this.token, required this.userProvider}) : super(key: key);

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  late Future<List<ThreadSummary>> posts;
  final TextEditingController searchInputController = TextEditingController();
  String searchText = '';

  @override
  void initState() {
    super.initState();
    posts = fetchData(widget.token);
  }

  Future<List<ThreadSummary>> fetchData(String? token) async {
    final response = await APIService().listPosts(widget.gameid, widget.token);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists.map((dynamic item) => ThreadSummary(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: item['id'],
          title: item['title'],
          game: item['game']['title'],
          gameId: item['game']['id'],
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
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Forum'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => CreateThreadPage(gameid: widget.gameid, token: widget.token, userProvider: widget.userProvider),
              ));
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
                    borderRadius: BorderRadius.circular(
                        5.0), // Optional: Add border radius for rounded corners
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
              ],
            ),
            //const SafeArea(child: SizedBox(height: 10)),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: FutureBuilder<List<ThreadSummary>>(
                future: posts,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    // Show a loading indicator while fetching data
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    // Handle errors
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    // Handle the case when there is no data
                    return const Center(child: Text('No post available.'));
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
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => GamesPage(token: widget.token, userProvider: widget.userProvider),
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


Future<List<ThreadSummary>> appendElements(ThreadSummary item, Future<List<ThreadSummary>> posts) async {
  final list = await posts;
  list.add(item);
  return list;
}

