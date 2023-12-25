import 'dart:convert';
import 'package:flutter/gestures.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:ludos_mobile_app/forum_page.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_comment.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/reusable_widgets/like_dislike_button.dart';
import 'package:ludos_mobile_app/reusable_widgets/styledRange.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:ludos_mobile_app/visit_user_page.dart';

import 'edit_thread_page.dart';
import 'game_page.dart';
import 'helper/APIService.dart';
import 'reusable_widgets/custom_navigation_bar.dart';


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
  int thumbUps = 0;
  int numberOfComment = 0;
  late Map<String, dynamic> threadData = {};
  late Future<List<Comment>> comments;
  late List<StyledRange> annotations = [];


  @override
  void initState()
  {
    super.initState();
    ToListAnnotation(getStyledRanges());
    comments = fetchCommentData(widget.token);
  }

  Future<void> ToListAnnotation(
      Future<List<StyledRange>> annotationList) async {
    annotations = await annotationList;
  }

  void showAnnotation(BuildContext context, String annotationText) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: MyColors.darkBlue,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(
                20.0,
              ),
            ),
          ),
          contentPadding: const EdgeInsets.only(
            top: 10.0,
          ),
          title: const Text(
            "Annotation",
            style: TextStyle(fontSize: 20.0, color: MyColors.white),
          ),
          content: Container(
            height: 140,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      annotationText,
                      style:
                          const TextStyle(fontSize: 15, color: MyColors.white),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.red,
                        ),
                        child: const Text("Close",
                            style: TextStyle(color: MyColors.white)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  void createAnnotation(
      BuildContext context, String annotatedText, int start, int end) {
    String annotationText =
        ""; // Add a variable to store the text from the TextFormField

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: MyColors.darkBlue,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(
                20.0,
              ),
            ),
          ),
          contentPadding: const EdgeInsets.only(
            top: 10.0,
          ),
          title: const Text(
            "Annotate the Text",
            style: TextStyle(fontSize: 20.0, color: MyColors.white),
          ),
          content: Container(
            height: 180,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: TextFormField(
                      onChanged: (value) {
                        annotationText = value;
                      },
                      style:
                          const TextStyle(fontSize: 15, color: MyColors.white),
                      decoration: InputDecoration(
                        hintText: "Enter annotation",
                        hintStyle:
                            TextStyle(color: MyColors.white.withOpacity(0.5)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.red,
                        ),
                        child: const Text("Cancel",
                            style: TextStyle(color: MyColors.white)),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // Call the API to create the annotation
                          APIService().createAnnotationThread(
                              widget.token,
                              widget.threadId,
                              annotatedText,
                              start,
                              end,
                              annotationText);
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.green,
                        ),
                        child: const Text("Annotate",
                            style: TextStyle(color: MyColors.white)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

List<TextSpan> buildStyledText(String text, List<StyledRange> styledRanges) {
  List<TextSpan> textSpans = [];
  styledRanges.sort((a, b) => a.start.compareTo(b.start));
  int currentIndex = 0;
  
  Set<StyledRange> uniqueRanges = styledRanges.toSet();
  styledRanges = uniqueRanges.toList();
  for (var i = 0; i < styledRanges.length; i++) {
    var styledRange = styledRanges[i];

    // Check for overlapping ranges
    if (styledRange.start < currentIndex) {
      continue; // Skip overlapping ranges
    }

    // Add the unstyled text before the current range
    textSpans.add(
      TextSpan(
        text: text.substring(currentIndex, styledRange.start),
        style: const TextStyle(
          color: MyColors.white,
          fontWeight: FontWeight.bold,
          fontSize: 16,
        ),
      ),
    );

    // Add the styled text within the current range
    textSpans.add(
      TextSpan(
        recognizer: TapGestureRecognizer()
          ..onTap = () {
            showAnnotation(context, styledRange.annotation);
          },
        text: text.substring(styledRange.start, styledRange.end),
        style: styledRange.style,
      ),
    );

    // Update the current index
    currentIndex = styledRange.end;
  }

  // Add any remaining unstyled text after the last range
  if (currentIndex < text.length) {
    textSpans.add(
      TextSpan(
        text: text.substring(currentIndex),
        style: const TextStyle(
          color: MyColors.white,
          fontWeight: FontWeight.bold,
          fontSize: 16,
        ),
      ),
    );
  }

  return textSpans;
}

  Future<List<StyledRange>> getStyledRanges() async {
    final response =
        await APIService().getAnnotationThread(widget.token, widget.threadId);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        return Future.wait(
            responseData.map<Future<StyledRange>>((dynamic item) async {
          return StyledRange(
              item['target']['selector']['start'],
              item['target']['selector']['end'],
              item['body'],
              const TextStyle(
                backgroundColor: MyColors.blue,
                color: MyColors.white,
                fontSize: 15,
              ));
        }).toList());
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        return [];
      }
    } catch (error) {
      print("Error: $error");
      return [];
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
        numberOfComment = responseData.length;
        print(responseData);
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
          isDisliked: item['isDisLiked'] ?? false,
          isLiked: item['isLiked'] ?? false,
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

  bool isBelongtoUser() {
    if (widget.userProvider.username ==  threadData['user']['username']){
      return true;
    } else {
      return false;
    }
  }

  final TextEditingController commentInputController = TextEditingController();

  @override
  Widget build(BuildContext context)
  {
    return  WillPopScope(
        onWillPop: () async {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => ForumPage(
        gameid: threadData['game']['id'],
        token: widget.token,
        userProvider: widget.userProvider,
      ),));
      return false;
    },
    child: Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: (threadData.isNotEmpty) ? Text('${threadData['user']['username']}\'s Thread') : const Text('Thread'),
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
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
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
                              CircleAvatar(
                                radius: 30,
                                backgroundColor: MyColors.darkBlue,
                                child: CircleAvatar(
                                  radius: 28,
                                  backgroundImage: threadData['user']['avatar'] != null
                                      ? NetworkImage(threadData['user']['avatar'])
                                      : const AssetImage('assets/images/ludos_transparent.png') as ImageProvider,
                                ),
                              ),
                            ]
                          )
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
                                  CustomWidgets.deleteConfirmDialogThread(widget.userProvider, context,threadData['game']['title'], threadData['game']['id'] ,"thread",  widget.threadId);
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
                      if (threadData['body'] != null)
                        Align(
                          alignment: Alignment.centerLeft,
                          child: SelectableText.rich(
                            TextSpan(
                                children: buildStyledText(
                                    threadData['body'].toString(),
                                    annotations)),
                            style: const TextStyle(
                              color: MyColors.white,
                              fontSize: 15,
                            ),
                            textAlign: TextAlign.left,
                            contextMenuBuilder: (context, editableTextState) {
                              final List<ContextMenuButtonItem> buttonItems =
                                  editableTextState.contextMenuButtonItems;
                              buttonItems.insert(
                                0,
                                ContextMenuButtonItem(
                                  label: 'Annotate',
                                  onPressed: () {
                                    // Annotation code
                                    TextSelection text = editableTextState
                                        .textEditingValue.selection;
                                    String annotatedText = editableTextState
                                        .textEditingValue.text
                                        .substring(
                                            text.baseOffset, text.extentOffset);
                                    createAnnotation(context, annotatedText,
                                        text.baseOffset, text.extentOffset);
                                  },
                                ),
                              );
                              return AdaptiveTextSelectionToolbar.buttonItems(
                                anchors: editableTextState.contextMenuAnchors,
                                buttonItems: buttonItems,
                              );
                            },
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
                          LikeDislikeButton(userProvider: widget.userProvider, id: widget.threadId, token: widget.token, numberOfLikes: threadData['numberOfLikes'] - threadData['numberOfDislikes'], isLiked: threadData['isLiked'], isDisliked: threadData['isDisliked']),
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
    ),
    );
  }
}