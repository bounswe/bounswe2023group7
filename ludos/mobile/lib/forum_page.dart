import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'reusable_widgets/forum_thread.dart';
import 'dart:convert';
import 'package:ludos_mobile_app/userProvider.dart';
import 'create_thread_page.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class ForumPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String gameid;
  final String gameName;
  const ForumPage(
      {Key? key,
      required this.gameName,
      required this.gameid,
      required this.token,
      required this.userProvider}
      ): super(key: key);

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  bool ifSearched = false;
  late Future<List<ThreadSummary>> threads;
  late Future<List<ThreadSummary>> threadsSearch;
  final TextEditingController searchInputController = TextEditingController();
  String searchText = '';

  @override
  void initState() {
    super.initState();
    threads = fetchData(widget.token);
  }

  void searched() {
    threadsSearch = fetchDataSearch(widget.token);
  }

  Future<List<ThreadSummary>> fetchData(String? token) async {
    final response =
        await APIService().listThreads(widget.gameid, widget.token);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists
            .where((item) =>
            item['upcomingTitle'] != null &&
            item['upcomingTitle']['isUpcomingTitle'] == true)
            .map((dynamic item) => ThreadSummary(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: item['id'],
          title: item['title'],
          game: item['game']['title'],
          gameId: item['game']['id'],
          userId: item['user']['id'],
          username: item['user']['username'],
          userAvatar: item['user']['avatar'],
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

  Future<List<ThreadSummary>> fetchDataSearch(String? token) async {
    final response = await APIService()
        .listThreadsBySearch(searchText, widget.gameid, widget.token);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];
        return postLists
            .where((item) =>
            item['upcomingTitle'] == null ||
            item['upcomingTitle']['isUpcomingTitle'] == false)
            .map((dynamic item) => ThreadSummary(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: item['id'],
          title: item['title'],
          game: item['game']['title'],
          gameId: item['game']['id'],
          userId: item['user']['id'],
          username: item['user']['username'],
          userAvatar: item['user']['avatar'],
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
        title: Text('${widget.gameName} Forum'),
        actions: [
          TextButton(
            onPressed: () {
              if (widget.userProvider.isLoggedIn) {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => CreateThreadPage(
                      gameName: widget.gameName,
                      gameid: widget.gameid,
                      token: widget.token,
                      userProvider: widget.userProvider),
                ));
              } else {
                CustomWidgets.needLoginSnackbar(
                    context, "Please log in to add the thread! ");
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
                        ifSearched = true;
                        searchText = searchInputController.text;
                        searched();
                      });
                    },
                    icon: const Icon(Icons.search, color: MyColors.white),
                  ),
                ),
              ],
            ),
            //const SafeArea(child: SizedBox(height: 10)),
            if (!ifSearched)
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
            if (ifSearched)
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: FutureBuilder<List<ThreadSummary>>(
                  future: threadsSearch,
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
      bottomNavigationBar:
          CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}

Future<List<ThreadSummary>> appendElements(
    ThreadSummary item, Future<List<ThreadSummary>> posts) async {
  final list = await posts;
  list.add(item);
  return list;
}
