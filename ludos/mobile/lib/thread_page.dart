import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/userProvider.dart';

import 'game_page.dart';
import 'helper/APIService.dart';


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


  @override
  void initState()
  {
    super.initState();
    fetchData();

    if (threadData['isLiked'] != null) {
      isLiked = threadData['isLiked'];
    }
    if (threadData['isDisliked'] != null) {
      isLiked = threadData['isDisliked'];
    }
  }

  Future<bool> fetchData() async
  {

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
          future: fetchData(),
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
                                          userProvider: widget.userProvider),
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
                        thickness: 3.0,
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
                        thickness: 3.0,
                        color: MyColors.blue,
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
                            timeAgo(threadData['createdAt']),
                            style: const TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ]
                  )
                );
            }
          }
        )

    );
  }
}