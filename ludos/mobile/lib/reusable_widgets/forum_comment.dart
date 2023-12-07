import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

import '../helper/APIService.dart';
import '../helper/colors.dart';
import '../login_page.dart';
import '../thread_page.dart';
import '../userProvider.dart';
import '../visit_user_page.dart';
import 'custom_widgets.dart';

class Comment extends StatefulWidget {
  bool isLiked;
  bool isDisliked;
  final String userId;
  final String threadId;
  final String parentId;
  final String username;
  final String content;
   int? thumbUps;
   int? thumbDowns;
  final String time;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final UserProvider userProvider;
  final String? token;
  final String commentId;

  Comment({
    Key? key,
    required this.userId,
    required this.threadId,
    required this.parentId,
    required this.username,
    required this.content,
    required this.thumbUps,
    required this.thumbDowns,
    required this.isLiked,
    required this.isDisliked,
    required this.time,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
    required this.userProvider,
    required this.token,
    required this.commentId,
  }) : super(key: key);

  @override
  State<Comment> createState() => _CommentState(
    userId: userId,
    threadId: threadId,
    parentId: parentId,
    username: username,
    content: content,
    thumbUps: thumbUps,
    thumbDowns: thumbDowns,
    isLiked: isLiked,
    isDisliked: isDisliked,
    time: time,
    textColor: textColor,
    backgroundColor: backgroundColor,
    fontSize: fontSize,
    userProvider: userProvider,
    token: token,
    commentId: commentId,
  );
}

class _CommentState extends State<Comment> {
  bool isLiked;
  bool isDisliked;
  late Future<List<Comment>> comments;
  bool showForm = false;
  final String userId;
  final String threadId;
  final String parentId;
  final String content;
  final String username;
   int? thumbUps;
   int? thumbDowns;
  final String time;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final UserProvider userProvider;
  final String? token;
  final String commentId;

  _CommentState({
    required this.isLiked,
    required this.isDisliked,
    required this.userId,
    required this.threadId,
    required this.parentId,
    required this.content,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.time,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
    required this.userProvider,
    required this.token,
    required this.commentId,
  });

  @override
  initState() {
    super.initState();
    comments = fetchData(widget.token);
    setState(() {});
  }


  Future<List<Comment>> fetchData(String? token) async {
    final response = await APIService().listComments(widget.commentId, widget.token);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        return responseData.map((dynamic item) => Comment(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: widget.threadId,
          parentId: widget.commentId,
          commentId: item['id'],
          content: item['text'],
          isDisliked: false,
          isLiked: false,
          userId: item['author']['id'],
          username: item['author']['username'],
          thumbUps: item['likeCount'],
          thumbDowns: item['dislikeCount'],
          time: item['timestamp'],
          textColor: MyColors.white,
          backgroundColor: MyColors.blue,
          fontSize: 20,
        )).toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load comments');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load comments!');
    }
  }

  void toggleFormVisibility() {
    setState(() {
      showForm = !showForm;
    });
  }

  /*
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
        await APIService().likeThread(
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
      isDisliked = false;
    } else if (!like) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.threadId);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isDisliked = true;
      isLiked = false;
    }
  }
  */
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

  final TextEditingController commentInputController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
          Column(
            children: [
              Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                      color: MyColors.blue.withOpacity(0.15),
                      border: Border.all(
                      color: MyColors.blue,
                      width: 5.0,
                  ),
                  borderRadius: const BorderRadius.all(Radius.circular(20))
                  ),
                  child: Column(
                    children:[
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
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.all(15.0),
                        child: Text(
                          content,
                          softWrap: true,
                          style: const TextStyle(
                            color: MyColors.white,
                            fontSize: 15.0,
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
                          IconButton(
                            onPressed: () => setState(() {
                              if(!widget.userProvider.isLoggedIn){
                                CustomWidgets.needLoginSnackbar(context, "Please log in to like a comment! ");
                              } else {
                                //userPressed(true);
                              }
                            }),
                            icon: Icon(
                              Icons.thumb_up,
                              color: isLiked ? Colors.green : Colors.white,
                            ),
                          ),
                          Text(thumbUps.toString(),
                          style: TextStyle(
                            color: Colors.white
                          )
                          ),
                          IconButton(
                            onPressed: () => setState(() {
                              if(!widget.userProvider.isLoggedIn){
                                CustomWidgets.needLoginSnackbar(context, "Please log in to dislike a comment! ");
                              } else {
                                //userPressed(false);
                              }
                            }),
                            icon: Icon(
                              Icons.thumb_down,
                              color: isDisliked ? Colors.red : Colors.white,
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.comment, color: Colors.white,),
                            onPressed: () {
                              if(!widget.userProvider.isLoggedIn){
                                CustomWidgets.needLoginSnackbar(context, "Please log in to reply a comment! ");
                              } else {
                                toggleFormVisibility();
                              }
                            },
                          ),
                          const SizedBox(width: 10.0),
                          Text(
                            timeAgo(time),
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                      if(showForm)
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            const SizedBox(width: 10.0),
                            Expanded(
                              child: TextFormField(
                                controller: commentInputController,
                                obscureText: false,
                                style: const TextStyle(
                                    height: 1.0,
                                    color: MyColors.white
                                ),
                                decoration: const InputDecoration(
                                  labelText: 'Add a reply',
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
                      child: IconButton(
                        onPressed: () async {
                          http.Response token = await APIService().createComment(
                              widget.token,
                              widget.commentId,
                              commentInputController.text
                          );
                          if (token.statusCode == 200) {
                            print("status is ok");
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: const Row(
                                  children: [
                                    Icon(
                                      Icons.check_circle_outline,
                                      color: MyColors.blue,
                                    ),
                                    SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        'Your reply is added successfully.',
                                        style: TextStyle(
                                          color: MyColors.blue,
                                          fontSize: 16,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                backgroundColor: MyColors.blue2,
                                duration: const Duration(seconds: 5),
                                action: SnackBarAction(
                                  label: 'OK',
                                  textColor: MyColors.blue,
                                  onPressed: () {
                                    ScaffoldMessenger.of(context)
                                        .hideCurrentSnackBar();
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => ThreadPage(token: widget.token, userProvider: widget.userProvider, threadId: widget.threadId)),
                                    );
                                  },
                                ),
                              ),
                            ) //ScaffoldMessager
                                .closed
                                .then((reason) => Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => ThreadPage(token: widget.token, userProvider: widget.userProvider, threadId: widget.threadId)),
                            ));
                          }
                          else {
                            CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
                          }
                        },
                        icon: const Icon(Icons.reply, color: MyColors.white),
                      ),
                    ),
                          ],
                        ),
                    ]
                  )
              )
            ],
          ),

        Padding(
          padding: const EdgeInsets.fromLTRB(10, 10, 0 ,10),
          child: FutureBuilder<List<Comment>>(
            future: comments,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                // Show a loading indicator while fetching data
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                // Handle errors
                return Center(child: Text('Error: ${snapshot.error}'));
              } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                // Handle the case when there is no data
                return SizedBox(width: 0.1);
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
        Container(
          color: MyColors.darkBlue,
          child: const SizedBox(height: 1.0),
        ),
      ],
    );
  }
}