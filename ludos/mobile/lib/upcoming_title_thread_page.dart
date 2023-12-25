import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_comment.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:ludos_mobile_app/visit_user_page.dart';
import 'package:url_launcher/url_launcher.dart';
import 'edit_thread_page.dart';
import 'game_page.dart';
import 'helper/APIService.dart';
import 'reusable_widgets/custom_navigation_bar.dart';

class UpcomingTitleThreadPage extends StatefulWidget
{
  final UserProvider userProvider;
  final String? token;
  final String threadId;
  const UpcomingTitleThreadPage
      ({
    Key? key,
    required this.userProvider,
    required this.token,
    required this.threadId
  }): super(key: key);

  @override
  State<UpcomingTitleThreadPage> createState() => _UpcomingTitleThreadPageState();
}

class _UpcomingTitleThreadPageState extends State<UpcomingTitleThreadPage>
{
  bool isLiked = false;
  bool isDisliked = false;
  int numberOfComment = 0;
  late Map<String, dynamic> threadData = {};
  late Future<List<Comment>> comments;
  String lnDate = '';

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
      isDisliked = threadData['isDisliked'];
    }
    setState(() { });
  }

  Future<bool> fetchThreadData() async {
    try
    {
      threadData = await APIService().getThread(
          widget.threadId, widget.token);
      lnDate = threadData['upcomingTitle']['launchingDate'].toString();

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
        numberOfComment = responseData.length;
        return responseData.map((dynamic item) => Comment(
          token: widget.token,
          userProvider: widget.userProvider,
          threadId: widget.threadId,
          parentId: widget.threadId,
          commentId: item['id'],
          content: item['text'],
          userId: item['author']['id'],
          username: item['author']['username'],
          userAvatar: item['author']['avatar'] ?? "",
          isDisliked: false,
          isLiked: false,
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

  bool isBelongtoUser() {
    if (widget.userProvider.username ==  threadData['user']['username']){
      return true;
    } else {
      return false;
    }
  }
  Future<void> _launchUrl(url) async {
    if (!await launchUrl(url)) {
      throw Exception('Could not launch $url');
    }
  }
  final TextEditingController commentInputController = TextEditingController();

  @override
  Widget build(BuildContext context)
  {
    print(threadData);
    return SelectionArea(contextMenuBuilder:(context, editableTextState) {
      final List<ContextMenuButtonItem> buttonItems = editableTextState.contextMenuButtonItems;
      buttonItems.insert(
        0,
        ContextMenuButtonItem(
          label: 'Annotate',
          onPressed: () {
            // Annotation code
          },
        ),
      );
      return AdaptiveTextSelectionToolbar.buttonItems(
        anchors: editableTextState.contextMenuAnchors,
        buttonItems: buttonItems,
      );
    },
        child: Scaffold(
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
                                color: MyColors.blue.withOpacity(0.3),
                                border: Border.all(
                                  color: MyColors.blue,
                                  width: 5.0,
                                ),
                                borderRadius: const BorderRadius.all(Radius.circular(20))
                            ),
                            child: Column(
                            children: [
                                  const SizedBox(height: 10),
                                  Text(
                                    "Planned Release Date: $lnDate",
                                    style: const TextStyle(
                                      color: MyColors.lightBlue,
                                      fontSize: 18,

                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  //const SizedBox(height: 10),
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
                                          Navigator.of(context).push(MaterialPageRoute(
                                            builder: (context) => VisitUserPage(userProvider: widget.userProvider, username: threadData['user']['username'], id: threadData['user']['id']),
                                          ));
                                        },
                                        child: Text(
                                            '@${threadData['user']['username']}',
                                            style: const TextStyle(color: MyColors.orange)
                                        ),
                                      ),
                                    ],
                                  ),
                                  if(isBelongtoUser())
                                    Row(
                                        mainAxisAlignment: MainAxisAlignment.end,
                                        children:[
                                          IconButton(
                                            onPressed: () {
                                              Navigator.of(context).push(MaterialPageRoute(
                                                builder: (context) => EditThreadPage(
                                                  gameid: threadData['game']['id'],
                                                  token: widget.token,
                                                  userProvider: widget.userProvider,
                                                  threadid:  widget.threadId,
                                                  threadData: threadData,
                                                ),
                                              ));
                                            },
                                            icon: const Icon(Icons.edit, color: MyColors.orange),
                                          ),
                                          IconButton(
                                            onPressed: () {
                                              CustomWidgets.deleteConfirmDialogThread(widget.userProvider, context, threadData['game']['title'], threadData['game']['id'] ,"thread",  widget.threadId);
                                            },
                                            icon: const Icon(Icons.delete, color: MyColors.orange),
                                          ),
                                        ]
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
                                  TextButton(
                                    style: ButtonStyle(
                                      backgroundColor: MaterialStateProperty.all<Color>(
                                          MyColors.darkBlue),
                                    ),
                                    onPressed: () {
                                      _launchUrl(Uri.parse(threadData['upcomingTitle']['demoLink']));
                                    },
                                    child: const Text(
                                        "Demo",
                                        style: TextStyle(color: MyColors.white, fontSize: 15.0,)
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  if(threadData['body'] != null)
                                    Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        threadData['body'].toString(),
                                        textAlign: TextAlign.left,
                                        style: const TextStyle(
                                          color: MyColors.white,
                                          fontSize: 15,
                                        ),
                                      ),
                                    ),
                                  Container(
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                      children: [
                                        if (threadData['media'] != null)
                                          for (var i = 0; i < threadData['media'].length; i++)
                                            Image.network(
                                              width: 200,
                                              height: 200,
                                              threadData['media'][i].toString(),
                                              errorBuilder: (BuildContext context, Object exception,
                                                  StackTrace? stackTrace) {
                                                return const Text('');
                                              },
                                              fit: BoxFit.fill,
                                            ),
                                      ],
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
                                            CustomWidgets.needLoginSnackbar(context, "Please log in to like a thread! ", widget.userProvider);
                                          } else {
                                            userPressed(true);
                                          }
                                        }),
                                        icon: Icon(
                                          Icons.thumb_up,
                                          color: threadData['isLiked'] ? Colors.green : Colors.white,
                                        ),
                                      ),
                                      Text(
                                        threadData['numberOfLikes'].toString(),
                                        style: const TextStyle(color: Colors.white),
                                      ),
                                      IconButton(
                                        onPressed: () => setState(() {
                                          if(!widget.userProvider.isLoggedIn){
                                            CustomWidgets.needLoginSnackbar(context, "Please log in to dislike a thread! ", widget.userProvider);
                                          } else {
                                            userPressed(false);
                                          }
                                        }),
                                        icon: Icon(
                                          Icons.thumb_down,
                                          color: threadData['isDisliked'] ? Colors.red : Colors.white,
                                        ),
                                      ),
                                      IconButton(
                                          color: Colors.white,
                                          onPressed: () {},
                                          icon: const Icon(Icons.comment)),
                                      Text(
                                        numberOfComment.toString(),
                                        style: const TextStyle(color: Colors.white),
                                      ),
                                      const SizedBox(width: 10.0),
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
                                                              builder: (context) => UpcomingTitleThreadPage(token: widget.token, userProvider: widget.userProvider, threadId: widget.threadId)),
                                                        );
                                                      },
                                                    ),
                                                  ),
                                                ) //ScaffoldMessager
                                                    .closed
                                                    .then((reason) => Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                      builder: (context) => UpcomingTitleThreadPage(token: widget.token, userProvider: widget.userProvider, threadId: widget.threadId)),
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
          ),

          bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
        )
    );
  }
}