import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/game_review.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'dart:convert';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';

class ReviewPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String gameid;
  const ReviewPage({Key? key, required this.gameid, required this.token, required this.userProvider}) : super(key: key);

  @override
  State<ReviewPage> createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage> {
  late Future<List<Review>> reviews;

  @override
  void initState() {
    super.initState();
    reviews = fetchData(widget.token);
  }

  Future<List<Review>> fetchData(String? token) async {
    final response = await APIService().listReviews(widget.token, widget.gameid);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        return Future.wait(responseData.map<Future<Review>>((dynamic item) async {
          final userResponse = await APIService().userInfoById(item['userId'], widget.token);

          if (userResponse.statusCode == 200) {
            return Review(
              token: widget.token,
              userProvider: widget.userProvider,
              reviewId: item['reviewId'],
              content: item['content'],
              rating: item['rating'].toDouble(),
              gameId: item['gameId'],
              userId: item['userId'],
              username: json.decode(userResponse.body)['username'],
              thumbUps: item['likedUserCount'],
              thumbDowns: item['dislikeUserCount'],
              time: item['createdAt'],
            );
          } else {
            print("Error fetching user info: ${userResponse.statusCode} - ${userResponse.body}");
            throw Exception('Failed to load user info!');
          }
        }).toList());
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load reviews!');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load reviews from API!');
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
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: FutureBuilder<List<Review>>(
                future: reviews,
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
      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}


Future<List<Review>> appendElements(Review item, Future<List<Review>> posts) async {
  final list = await posts;
  list.add(item);
  return list;
}