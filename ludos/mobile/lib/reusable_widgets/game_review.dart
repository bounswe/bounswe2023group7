import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import '../game_page.dart';
import '../helper/APIService.dart';
import '../userProvider.dart';
import '/helper/colors.dart';
import 'package:intl/intl.dart';

class Review extends StatefulWidget {
  final String game;
  final String gameId;
  final String content;
  final String username;
  final int? thumbUps;
  final int? thumbDowns;
  final String time;
  bool isLiked;
  bool isDisliked;
  final UserProvider userProvider;
  final String? token;
  final String reviewId;

  Review({
    Key? key,
    required this.isLiked,
    required this.isDisliked,
    required this.game,
    required this.gameId,
    required this.content,
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
    game: game,
    gameId: gameId,
    content: content,
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
  bool isLiked;
  bool isDisliked;
  final String game;
  final String gameId;
  final String content;
  final String username;
  final int? thumbUps;
  final int? thumbDowns;
  final String time;
  final UserProvider userProvider;
  final String? token;
  final String reviewId;

  _ReviewState({
    required this.isLiked,
    required this.isDisliked,
    required this.game,
    required this.gameId,
    required this.content,
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
            Container(
              padding: const EdgeInsets.all(15.0),
              child: Text(
                content,
                softWrap: true,
                style: const TextStyle(
                  color: MyColors.darkBlue,
                  fontSize: 10.0,
                ),
              ),
            ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: MyColors.darkBlue,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.darkBlue,
                  ),
                  onPressed: () => setState(() {
                    userPressed(true);
                  }),
                  child: Icon(
                    Icons.thumb_up,
                    color: isLiked ? Colors.green : Colors.white,
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.darkBlue,
                  ),
                  onPressed: () => setState(() {
                    userPressed(false);
                  }),
                  child: Icon(
                    Icons.thumb_down,
                    color: isDisliked ? Colors.red : Colors.white,
                  ),
                ),
                IconButton(
                    color: Colors.white,
                    onPressed: () {},
                    icon: const Icon(Icons.comment)),
              ],
            ),
          ],
        ),
        Container(
          color: MyColors.blue,
          child: const SizedBox(height: 20.0),
        ),
      ],
    );
  }
}