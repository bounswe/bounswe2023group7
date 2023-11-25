import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/game_review.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'dart:convert';
import 'package:ludos_mobile_app/userProvider.dart';

class ReviewPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String gameid;
  const ReviewPage({Key? key, required this.gameid, required this.token, required this.userProvider}) : super(key: key);

  @override
  State<ReviewPage> createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage> {
  late Future<List<Review>> posts;
  final TextEditingController searchInputController = TextEditingController();
  String searchText = '';

  @override
  void initState() {
    super.initState();
    posts = fetchData(widget.token);
  }

  Future<List<Review>> fetchData(String? token) async {
    final response = await APIService().listReviews(widget.token, widget.gameid);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists.map((dynamic item) => Review(
          token: widget.token,
          userProvider: widget.userProvider,
          reviewId: item['id'],
          content: item['title'],
          game: item['game']['title'],
          gameId: item['game']['id'],
          username: item['user']['username'],
          thumbUps: item['numberOfLikes'],
          thumbDowns: item['NumberOfDislikes'],
          time: item['createdAt'],
          isLiked: item['isLiked'],
          isDisliked: item['isDisliked'],
        )).toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load reviews');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load reviews');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('All Reviews'),
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
              child: FutureBuilder<List<Review>>(
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
                    return const Center(child: Text('No review available.'));
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


Future<List<Review>> appendElements(Review item, Future<List<Review>> posts) async {
  final list = await posts;
  list.add(item);
  return list;
}