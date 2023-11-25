import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import '../game_page.dart';
import '../helper/APIService.dart';
import '../thread_page.dart';
import '../userProvider.dart';
import '/helper/colors.dart';
import 'package:intl/intl.dart';

class ThreadSummary extends StatefulWidget {
  final String game;
  final String gameId;
  final String title;
  final String username;
  final int? thumbUps;
  final int? thumbDowns;
  final String time;
  bool isLiked;
  bool isDisliked;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final UserProvider userProvider;
  final String? token;
  final String threadId;

  ThreadSummary({
    Key? key,
    required this.isLiked,
    required this.isDisliked,
    required this.game,
    required this.gameId,
    required this.title,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.time,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
    required this.userProvider,
    required this.token,
    required this.threadId,
  }) : super(key: key);

  @override
  State<ThreadSummary> createState() => _ThreadSummaryState(
    game: game,
    gameId: gameId,
    title: title,
    username: username,
    thumbUps: thumbUps,
    thumbDowns: thumbDowns,
    time: time,
    isLiked: isLiked,
    isDisliked: isDisliked,
    textColor: textColor,
    backgroundColor: backgroundColor,
    fontSize: fontSize,
    userProvider: userProvider,
    token: token,
    threadId: threadId,
  );
}

class _ThreadSummaryState extends State<ThreadSummary> {
  bool isLiked;
  bool isDisliked;
  final String game;
  final String gameId;
  final String title;
  final String username;
  final int? thumbUps;
  final int? thumbDowns;
  final String time;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final UserProvider userProvider;
  final String? token;
  final String threadId;

  _ThreadSummaryState({
    required this.isLiked,
    required this.isDisliked,
    required this.game,
    required this.gameId,
    required this.title,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.time,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
    required this.userProvider,
    required this.token,
    required this.threadId,
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
        await APIService().likeThread(
            widget.token, widget.threadId);
      } catch (e) {
        throw Exception('Failed to like thread');
      }
      isDisliked = false;
      isLiked = true;
    } else if (!like && isDisliked) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLiked = false;
      isDisliked = false;
    } else if (!like && isLiked) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLiked = false;
      isDisliked = true;
    } else if (like && isLiked) {
      try {
        var responseDislike = await APIService().likeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLiked = false;
      isDisliked = false;
    } else if (like) {
      try {
        await APIService().likeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLiked = true;
    } else {
      try {
          await APIService().dislikeThread(
              widget.token, widget.threadId);
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
        ElevatedButton(
          style: ElevatedButton.styleFrom(
          backgroundColor: backgroundColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              )),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => ThreadPage(threadId: widget.threadId, token: widget.token, userProvider: widget.userProvider),
              ),
            );
          },
          child: Column(
              children: [
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:
                  [
                    TextButton(
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(
                            MyColors.darkBlue),
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => GamePage(
                                id: gameId,
                                token: widget.token,
                                userProvider: widget.userProvider),
                          ),
                        );
                      },
                      child: Text(
                          game,
                          style: TextStyle(color: MyColors.white)
                      ),
                    ),
                    SizedBox(width: 5.0),
                    Text(
                      '@$username', //may need to navigate also the user
                      style: const TextStyle(
                        color: MyColors.darkBlue,
                        fontSize: 15.0,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: Text(
                        title,
                        softWrap: true,
                        style: const TextStyle(
                          color: MyColors.darkBlue,
                          fontSize: 20.0,
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
                  IconButton(
                    onPressed: () => setState(() {
                      userPressed(true);
                    }),
                    icon: Icon(
                      Icons.thumb_up,
                      color: isLiked ? Colors.green : Colors.white,
                    ),
                  ),
                  IconButton(
                    onPressed: () => setState(() {
                      userPressed(false);
                    }),
                    icon: Icon(
                      Icons.thumb_down,
                      color: isDisliked ? Colors.red : Colors.white,
                    ),
                  ),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.comment)),
                  Text(
                    timeAgo(time),
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
            ],
          ),
        ),
        Container(
          color: MyColors.darkBlue,
          child: const SizedBox(height: 20.0),
        ),
    ],
    );
  }
}