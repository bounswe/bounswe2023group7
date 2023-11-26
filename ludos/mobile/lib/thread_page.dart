import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_comment.dart';
import 'package:ludos_mobile_app/userProvider.dart';

import 'game_page.dart';
import 'helper/APIService.dart';
import 'login_page.dart';


class ThreadPage extends StatefulWidget
{
  final UserProvider userProvider;
  final String? token;
  final String threadId;
  const ThreadPage
  ({
        Key? key,
        required this.userProvider,
        required this.token,
        required this.threadId
  }): super(key: key);

  @override
  State<ThreadPage> createState() => _ThreadPageState();
}

class _ThreadPageState extends State<ThreadPage>
{
  bool isLiked = false;
  bool isDisliked = false;
  late Map<String, dynamic> threadData = {};
  late Future<List<Comment>> comments;

  @override
  void initState()
  {
    super.initState();
    fetchThreadData();
    comments = fetchCommentData(widget.token);

    if (threadData['isLiked'] != null) {
      isLiked = threadData['isLiked'];
    }
    if (threadData['isDisliked'] != null) {
      isLiked = threadData['isDisliked'];
    }
  }

  Future<bool> fetchThreadData() async {
    try
    {
      threadData = await APIService().getThread(
          widget.threadId, widget.token);
      await Future.delayed(const Duration(seconds: 1));
      return true;
    }
    catch (e)
    {
      print('Error loading thread data: $e');
      return false;
    }
  }

  Future<List<Comment>> fetchCommentData(String? token) async {
    final response = await APIService().listComments(widget.threadId, widget.token);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        print(responseData);

        return responseData.map((dynamic item) => Comment(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: widget.threadId,
          parentId: widget.threadId,
          commentId: item['id'],
          content: item['text'],
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
        throw Exception('Failed to load comments!');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load comments');
    }
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

  final TextEditingController commentInputController = TextEditingController();

  @override
  Widget build(BuildContext context)
  {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Thread'),
      ),

      body: FutureBuilder(
          future: fetchThreadData(),
          builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {
            return SingleChildScrollView(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                  Container(
                    padding: const EdgeInsets.all(18.0),
                    decoration: BoxDecoration(
                        border: Border.all(
                          color: MyColors.blue,
                          width: 5.0,
                        ),
                        borderRadius: const BorderRadius.all(Radius.circular(20))
                    ),
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
                                          id: threadData['game']['id'],
                                          token: widget.token,
                                          userProvider: widget.userProvider,
                                          onRefresh: (){},
                                      ),
                                    ),
                                  );
                                },
                                child: Text(
                                    threadData['game']['title'],
                                    style: TextStyle(color: MyColors.orange)
                                ),
                          ),
                          SizedBox(width: 5.0),
                          TextButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(MyColors.darkBlue),
                            ),
                            onPressed: () {
                              //Fill the user profile ready
                            },
                            child: Text(
                                '@${threadData['user']['username']}',
                                style: const TextStyle(color: MyColors.orange)
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.all(15.0),
                        child: Text(
                          threadData['title'],
                          softWrap: true,
                          style: const TextStyle(
                            color: MyColors.white,
                            fontSize: 20.0,
                          ),
                        ),
                      ),
                      if(threadData['body'] != null)
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                              threadData['body'].toString(),
                              textAlign: TextAlign.left,
                              style: const TextStyle(
                                color: MyColors.lightBlue,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                          ),
                        ),
                      const SizedBox(height: 20.0),
                      const Divider(
                        height: 3.0,
                        thickness: 1.0,
                        color: MyColors.blue,
                      ),
                      Container(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            if (threadData['tags'] != null)
                              for (var i = 0; i < threadData['tags'].length; i++)
                                TextButton(
                                  style: TextButton.styleFrom(
                                      foregroundColor: MyColors.white),
                                  onPressed: () {},
                                  child: Text(threadData['tags'][i].toString()),
                                ),
                          ],
                        ),
                      ),
                      const Divider(
                        height: 3.0,
                        thickness: 1.0,
                        color: MyColors.blue,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          IconButton(
                            onPressed: () => setState(() {
                              if(!widget.userProvider.isLoggedIn){
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: const Row(
                                      children: [
                                        Icon(Icons.error, color: MyColors.blue),
                                        SizedBox(width: 8),
                                        Expanded(
                                          child: Text(
                                            'Please log in to like the thread',
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
                                      label: 'Log In',
                                      textColor: MyColors.blue,
                                      onPressed: () {
                                        ScaffoldMessenger.of(context)
                                            .hideCurrentSnackBar();
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => LoginPage()),
                                        );
                                      },
                                    ),
                                  ),
                                )
                                    .closed
                                    .then((reason) => {});
                              } else {
                                userPressed(true);
                              }
                            }),
                            icon: Icon(
                              Icons.thumb_up,
                              color: isLiked ? Colors.green : Colors.white,
                            ),
                          ),
                          Text(
                            threadData['numberOfLikes'].toString(),
                            style: const TextStyle(color: Colors.white),
                          ),
                          IconButton(
                            onPressed: () => setState(() {
                              if(!widget.userProvider.isLoggedIn){
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: const Row(
                                      children: [
                                        Icon(Icons.error, color: MyColors.blue),
                                        SizedBox(width: 8),
                                        Expanded(
                                          child: Text(
                                            'Please log in to dislike the thread',
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
                                      label: 'Log In',
                                      textColor: MyColors.blue,
                                      onPressed: () {
                                        ScaffoldMessenger.of(context)
                                            .hideCurrentSnackBar();
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => LoginPage()),
                                        );
                                      },
                                    ),
                                  ),
                                )
                                    .closed
                                    .then((reason) => {});
                              } else {
                                userPressed(false);
                              }
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
                            timeAgo(threadData['createdAt']),
                            style: const TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                      const Divider(
                        height: 3.0,
                        thickness: 3.0,
                        color: MyColors.blue,
                      ),
                        if(widget.userProvider.isLoggedIn)
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
                                        widget.threadId,
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
                                      print("status is not ok");
                                      print(token.statusCode);
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(
                                          content: SizedBox(
                                            width: MediaQuery.of(context).size.width,
                                            child: Text(
                                              json.decode(token.body)["message"],
                                              style: const TextStyle(
                                                color: MyColors.blue,
                                                fontSize: 16,
                                              ),
                                            ),
                                          ),
                                          backgroundColor: MyColors.blue2,
                                          duration: const Duration(seconds: 10),
                                          action: SnackBarAction(
                                            label: 'OK',
                                            textColor: MyColors.blue,
                                            onPressed: () {
                                              ScaffoldMessenger.of(context)
                                                  .hideCurrentSnackBar();
                                            },
                                          ),
                                        ),
                                      );
                                    }
                                  },
                                  icon: const Icon(Icons.reply, color: MyColors.white),
                                ),
                              ),
                            ],
                          ),

                    ]
                  ),
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
            ]
                ),
            );
            }
          }
        )


    );
  }
}