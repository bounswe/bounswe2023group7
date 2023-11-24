import 'package:flutter/material.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'reusable_widgets/forum_post.dart';
import 'dart:convert';

class ForumPage extends StatefulWidget {
  final String? token;
  const ForumPage({Key? key, required this.token}) : super(key: key);

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  late Future<List<PostSummary>> posts;
  final TextEditingController searchInputController = TextEditingController();
  String searchText = '';

  @override
  void initState() {
    super.initState();
    posts = fetchData(widget.token);
  }

  Future<List<PostSummary>> fetchData(String? token) async {
    final response = await APIService().listPosts(gameId, token);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists.map((dynamic item) => PostSummary(
          title: item['title'],
          game: item['game']['title'],
          username: item['user']['username'],
          thumbUps: item['numberOfLikes'],
          thumbDowns: item['NumberOfDislikes'],
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
      throw Exception('Failed to load posts');
    }

    // mock data
    var item = const PostSummary(
      title: "Assassins Creed Mirage launch brings 18% player rise across AC series",
      game: "Assassins Creed",
      username: "@senaal",
      thumbUps: 100,
      thumbDowns: 50,
      textColor: MyColors.white,
      backgroundColor: MyColors.blue,
      fontSize: 20,
    );

    var item1 = const PostSummary(
      title: "Assassins Creed Mirage launch brings 18% player rise across AC series",
      game: "Assassins Creed",
      username: "@aaaaaa",
      thumbUps: 100,
      thumbDowns: 50,
      textColor: MyColors.white,
      backgroundColor: MyColors.blue,
      fontSize: 20,
    );

    List<dynamic> postsList = [item, item1];

    return postsList.map((dynamic item) => PostSummary(
        game: "Assassins Creed",
        title: "Assassins Creed Mirage launch brings 18% player rise across AC series",
        username: "@aaaaaa",
        thumbUps: 100,
        thumbDowns: 50,
        textColor: MyColors.white,
        backgroundColor: MyColors.blue,
        fontSize: 20
    )).toList();
    */
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
              child: FutureBuilder<List<PostSummary>>(
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
    );
  }
}


Future<List<PostSummary>> appendElements(PostSummary item, Future<List<PostSummary>> posts) async {
  final list = await posts;
  list.add(item);
  return list;
}

