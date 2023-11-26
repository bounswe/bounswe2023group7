import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:ludos_mobile_app/reusable_widgets/single_rating_icon.dart';
import '../game_page.dart';
import '../helper/APIService.dart';
import '../userProvider.dart';
import '/helper/colors.dart';
import 'package:intl/intl.dart';

class Review extends StatefulWidget {
  final String gameId;
  final double rating;
  final String content;
  final String userId;
  final String username;
  final int? thumbUps;
  final int? thumbDowns;
  final String time;
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
  final int? thumbUps;
  final int? thumbDowns;
  final String time;
  final UserProvider userProvider;
  final String? token;
  final String reviewId;

  _ReviewState({
    required this.gameId,
    required this.rating,
    required this.content,
    required this.userId,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.time,
    required this.userProvider,
    required this.token,
    required this.reviewId,
  });

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

  /*
  Future<void> userPressed(bool like) async {
    if (like && isDisliked) {
      try {
        await APIService().likeReview(
            widget.token, widget.reviewId);
      } catch (e) {
        throw Exception('Failed to like thread');
      }
      isDisliked = false;
      isLiked = true;
    } else if (!like && isDisliked) {
      try {
        await APIService().dislikeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLiked = false;
      isDisliked = false;
    } else if (!like && isLiked) {
      try {
        await APIService().dislikeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLiked = false;
      isDisliked = true;
    } else if (like && isLiked) {
      try {
        var responseDislike = await APIService().likeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLiked = false;
      isDisliked = false;
    } else if (like) {
      try {
        await APIService().likeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLiked = true;
    } else {
      try {
        await APIService().dislikeReview(
            widget.token, widget.reviewId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isDisliked = true;
    }
  }
  */

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
                  Text(
                    '@$username', //may need to navigate also the user
                    style: const TextStyle(
                      color: MyColors.orange,
                      fontSize: 15.0,
                    ),
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
                    //userPressed(true);
                  }),
                  child: Icon(
                    Icons.thumb_up,
                    // color: isLiked ? Colors.green : Colors.white,
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.orange,
                  ),
                  onPressed: () => setState(() {
                    //userPressed(false);
                  }),
                  child: Icon(
                    Icons.thumb_down,
                    //color: isDisliked ? Colors.red : Colors.white,
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