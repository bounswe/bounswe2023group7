
import 'package:flutter/material.dart';
import '../game_page.dart';
import '../helper/APIService.dart';
import '../thread_page.dart';
import '../userProvider.dart';
import '../visit_user_page.dart';
import '/helper/colors.dart';
import 'package:intl/intl.dart';

import 'custom_widgets.dart';

class ThreadSummary extends StatefulWidget {
  final String game;
  final String gameId;
  final String title;
  final String userId;
  final String username;
   int? thumbUps;
   int? thumbDowns;
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
    required this.userId,
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
    userId: userId,
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
  bool isLikedIn = false;
  bool isDislikedIn = false;
  bool isLiked;
  bool isDisliked;
  final String game;
  final String gameId;
  final String title;
  final String userId;
  final String username;
   int? thumbUps;
   int? thumbDowns;
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
    required this.userId,
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

  @override
  void initState()
  {
    super.initState();
      isLikedIn = isLiked;
      isDislikedIn = isDisliked;
      setState(() { });
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
    if (like && isDislikedIn) {
      try {
        await APIService().likeThread(
            widget.token, widget.threadId);
      } catch (e) {
        throw Exception('Failed to like thread');
      }
      isDislikedIn = false;
      isLikedIn = true;
    } else if (!like && isDislikedIn) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLikedIn = false;
      isDislikedIn = false;
    } else if (!like && isLikedIn) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLikedIn = false;
      isDislikedIn = true;
    } else if (like && isLikedIn) {
      try {
         await APIService().likeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLikedIn = false;
      isDislikedIn = false;
    } else if (like) {
      try {
        await APIService().likeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLikedIn = true;
    } else {
      try {
          await APIService().dislikeThread(
              widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isDislikedIn = true;
    }
    setState(() {
    });
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
                                userProvider: widget.userProvider,
                                onRefresh: () {},
                            ),
                          ),
                        );
                      },
                      child: Text(
                          game,
                          style: TextStyle(color: MyColors.white, fontSize: 15.0,)
                      ),
                    ),
                    SizedBox(width: 5.0),
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
                      if(!widget.userProvider.isLoggedIn){
                        CustomWidgets.needLoginSnackbar(context, "Please log in to like a thread! ");
                      } else {
                        userPressed(true);

                      }
                      }),
                      icon: Icon(
                        Icons.thumb_up,
                        color: isLikedIn ? Colors.green : Colors.white,
                        ),
                  ),
                    Text(
                        thumbUps.toString()
                    ),
                    IconButton(
                      onPressed: () => setState(() {
                        if(!widget.userProvider.isLoggedIn){
                          CustomWidgets.needLoginSnackbar(context, "Please log in to dislike a thread! ");
                          } else {
                            userPressed(false);
                          }
                          }),
                      icon: Icon(
                        Icons.thumb_down,
                        color: isDislikedIn ? Colors.red : Colors.white,
                    ),
                  ),
                    Icon(Icons.comment),
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