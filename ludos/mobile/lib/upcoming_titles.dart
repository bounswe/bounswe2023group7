import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'reusable_widgets/forum_thread.dart';
import 'dart:convert';
import 'package:ludos_mobile_app/userProvider.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class UpcomingTitlePage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  const UpcomingTitlePage({Key? key, required this.token, required this.userProvider}) : super(key: key);

  @override
  State<UpcomingTitlePage> createState() => _UpcomingTitlePageState();
}

class _UpcomingTitlePageState extends State<UpcomingTitlePage> {
  bool ifSearched = false;
  late Future<List<ThreadSummary>> threads;
  late Future<List<ThreadSummary>> threadsSearch;
  final TextEditingController searchInputController = TextEditingController();
  String searchText = '';

  @override
  void initState() {
    super.initState();
    threads = fetchThreadData(widget.userProvider, widget.token);
  }


  Future<List<ThreadSummary>> fetchThreadData(UserProvider userProvider,
      String? token) async {
    final response = await APIService().listAllThreads(token);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists
            .where((item) => item['upcomingTitle']['isUpcomingTitle'] == true)
            .map((dynamic item) =>
            ThreadSummary(
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
              isUpcomingTitle: item['upcomingTitle']['isUpcomingTitle'],
              launchingDate: item['upcomingTitle']['launchingDate'],
              demoLink: item['upcomingTitle']['demoLink'],
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
    threads = fetchThreadData(userProvider, userProvider.token);
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: MyColors.orange,
        centerTitle: true,
        title: const Text('Upcoming Titles'),
      ),

      body: ListView(
        children: <Widget>[
          Column(
            children: [
              const SizedBox(height: 10),
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
            ],
          )
        ],
      ),
      bottomNavigationBar: CustomNavigationBar(userProvider: userProvider),
    );
  }


  Future<List<ThreadSummary>> appendElements(ThreadSummary item,
      Future<List<ThreadSummary>> posts) async {
    final list = await posts;
    list.add(item);
    return list;
  }
}
