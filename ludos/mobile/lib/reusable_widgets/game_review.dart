import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:ludos_mobile_app/reusable_widgets/single_rating_icon.dart';
import '../game_page.dart';
import '../helper/APIService.dart';
import '../userProvider.dart';
import '../visit_user_page.dart';
import '/helper/colors.dart';
import 'package:intl/intl.dart';

class Review extends StatefulWidget {
  final String gameId;
  final double rating;
  final String content;
  final String userId;
  final String username;
  final int thumbUps;
  final int thumbDowns;
  final String time;
  final bool isLiked;
  final bool isDisliked;
  final UserProvider userProvider;
  final String? token;
  final String reviewId;

  Review({
    Key? key,
    required this.gameId,
    required this.rating,
    required this.content,
    required this.userId,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.time,
    required this.isLiked,
    required this.isDisliked,
    required this.userProvider,
    required this.token,
    required this.reviewId,
  }) : super(key: key);

  @override
  State<Review> createState() => _ReviewState(
    gameId: gameId,
    rating: rating,
    content: content,
    userId: userId,
    username: username,
    thumbUps: thumbUps,
    thumbDowns: thumbDowns,
    time: time,
    isLiked: isLiked,
    isDisliked: isDisliked,
    userProvider: userProvider,
    token: token,
    reviewId: reviewId,
  );
}

class _ReviewState extends State<Review> {
  final String gameId;
  final double rating;
  final String content;
  final String userId;
  final String username;
  final int thumbUps;
  final int thumbDowns;
  final String time;
  bool isLiked = false;
  bool isDisliked = false;
  final UserProvider userProvider;
  final String? token;
  final String reviewId;
  int numberOfLikes = 0;

  _ReviewState({
    required this.gameId,
    required this.rating,
    required this.content,
    required this.userId,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.isLiked,
    required this.isDisliked,
    required this.time,
    required this.userProvider,
    required this.token,
    required this.reviewId,
  });

  @override
  void initState() {
    super.initState();
    numberOfLikes = thumbUps - thumbDowns;
  }

  String timeAgo(String timestamp) {
    DateTime currentTime = DateTime.now();
    DateTime previousTime = DateTime.parse(timestamp);

    Duration difference = currentTime.difference(previousTime);

    if (difference.inDays > 8) {
      return DateFormat.yMMMd().format(previousTime);
    } else if (difference.inDays >= 2) {
      return '${difference.inDays} days ago';
    } else if (difference.inDays >= 1) {
      return 'Yesterday';
    } else if (difference.inHours >= 2) {
      return '${difference.inHours} hours ago';
    } else if (difference.inHours >= 1) {
      return 'An hour ago';
    } else if (difference.inMinutes >= 2) {
      return '${difference.inMinutes} minutes ago';
    } else if (difference.inMinutes >= 1) {
      return 'A minute ago';
    } else {
      return 'Just now';
    }
  }

  Future<void> userPressed(bool like) async {
    if (like && isDisliked) {
      try {
        await APIService().likeReview(
            widget.token, widget.reviewId);
      } catch (e) {
        throw Exception('Failed to like review.');
      }
      isDisliked = false;
      isLiked = true;
      setState(() {
        numberOfLikes = numberOfLikes! + 2;
      });
    } else if (!like && isDisliked) {
      try {
        await APIService().dislikeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to dislike review.');
      }
      isDisliked = false;
      setState(() {
        numberOfLikes = numberOfLikes! + 1;
      });
    } else if (!like && isLiked) {
      try {
        await APIService().dislikeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to dislike review.');
      }
      isLiked = false;
      isDisliked = true;

      setState(() {
        numberOfLikes = numberOfLikes! - 2;
      });
    } else if (like && isLiked) {
      try {
        await APIService().likeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to like review.');
      }
      isLiked = false;

      setState(() {
        numberOfLikes = numberOfLikes! - 1;
      });
    } else if (like) {
      try {
        await APIService().likeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to like review.');
      }
      isLiked = true;
      setState(() {
        numberOfLikes = numberOfLikes! + 1;
      });
    } else if(!like) {
      try {
        await APIService().dislikeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to dislike review.');
      }
      isDisliked = true;
      setState(() {
        numberOfLikes = numberOfLikes! - 1;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Column(
          children: [
            const SizedBox(height: 10),
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(
                        MyColors.darkBlue),
                  ),
                  child: Text(
                      '@$username', //may need to navigate also the user
                      style: const TextStyle(
                      color: MyColors.orange,
                      fontSize: 15.0,
                  ),
                  ),
                  onPressed: () { Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => VisitUserPage(userProvider: userProvider, username: widget.username, id: widget.userId ),
                  )); },
                ),
                  Text(
                    timeAgo(time),
                    style: TextStyle(color: Colors.white),
                  ),
                ]
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List<Widget>.generate(
                5, // Total number of stars
                    (index) {
                  double diff = rating - index;
                  if (diff >= 1.0) {
                    // Full star
                    return const SingleRatingIcon(
                        icon: Icons.star,
                        size: 20,
                        iconColor: MyColors.orange,
                        rating: 10.0);
                  } else if (diff >= 0.5) {
                    // Floating star
                    return SingleRatingIcon(
                        icon: Icons.star,
                        size: 20,
                        iconColor: MyColors.orange,
                        rating: diff * 10.0);
                  } else {
                    // Empty star
                    return const SingleRatingIcon(
                        icon: Icons.star,
                        size: 20,
                        iconColor: MyColors.orange,
                        rating: 0.0);
                  }
                },
              ).toList(),
            ),
            Container(
              padding: const EdgeInsets.all(15.0),
              child: Text(
                content,
                softWrap: true,
                style: const TextStyle(
                  color: MyColors.white,
                  fontSize: 20.0,
                ),
              ),
            ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: MyColors.blue,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.orange,
                  ),
                  onPressed: () => setState(() {
                    userPressed(true);
                  }),
                  child: Icon(
                    Icons.thumb_up,
                    color: isLiked ? Colors.green : Colors.white,
                  ),
                ),
                Text(
                    numberOfLikes.toString(),
                    style: const TextStyle(
                      color: MyColors.white,
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.orange,
                  ),
                  onPressed: () => setState(() {
                    userPressed(false);
                  }),
                  child: Icon(
                    Icons.thumb_down,
                    color: isDisliked ? Colors.red : Colors.white,
                  ),
                ),
              ],
            ),
          ],
        ),
        const Divider(
          height: 5.0,
          thickness: 5.0,
          color: MyColors.lightBlue,
        ),
      ],
    );
  }
}