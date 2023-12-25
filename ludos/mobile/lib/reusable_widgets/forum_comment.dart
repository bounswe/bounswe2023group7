import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:ludos_mobile_app/reusable_widgets/styledRange.dart';

import '../helper/APIService.dart';
import '../helper/colors.dart';
import '../login_page.dart';
import '../thread_page.dart';
import '../userProvider.dart';
import '../visit_user_page.dart';
import 'custom_widgets.dart';

class Comment extends StatefulWidget {
  final bool isLiked;
  final bool isDisliked;
  final String userId;
  final String threadId;
  final String parentId;
  final String username;
  final String content;
  final int thumbUps;
  final int thumbDowns;
  final String time;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final UserProvider userProvider;
  final String? token;
  final String commentId;
  final String userAvatar;

  Comment({
    Key? key,
    required this.userId,
    required this.threadId,
    required this.parentId,
    required this.username,
    required this.userAvatar,
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
        userAvatar: userAvatar,
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
  bool editMode = false;
  late Future<List<Comment>> comments;
  bool showForm = false;
  final String userId;
  final String threadId;
  final String parentId;
  final String content;
  final String username;
  final String userAvatar;
  final int thumbUps;
  final int thumbDowns;
  final String time;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final UserProvider userProvider;
  final String? token;
  final String commentId;
  int numberOfLikes = 0;
  int numberOfComments = 0;
  late List<StyledRange> annotations = [];

  _CommentState({
    required this.isLiked,
    required this.isDisliked,
    required this.userId,
    required this.threadId,
    required this.parentId,
    required this.content,
    required this.username,
    required this.userAvatar,
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
    numberOfLikes = thumbUps - thumbDowns;
    ToListAnnotation(getStyledRanges());
    setState(() {});
  }

    Future<void> ToListAnnotation(
      Future<List<StyledRange>> annotationList) async {
    annotations = await annotationList;
    setState(() {
      
    });
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
                          APIService().createAnnotationComment(
                              widget.token,
                              widget.commentId,
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
        await APIService().getAnnotationComment(widget.token, widget.commentId);
        print("k");
        print(response.body);
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



  Future<List<Comment>> fetchData(String? token) async {
    final response =
        await APIService().listComments(widget.commentId, widget.token);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        setState(() {
          numberOfComments = responseData.length;
        });
        print(responseData);
        return responseData
            .map((dynamic item) => Comment(
                  token: widget.token,
                  userProvider: widget.userProvider,
                  threadId: widget.threadId,
                  parentId: widget.commentId,
                  commentId: item['id'],
                  content: item['text'],
                  isDisliked: item['isDisLiked'] ?? false,
                  isLiked: item['isLiked'] ?? false,
                  userAvatar: item['author']['avatar'] ?? "",
                  userId: item['author']['id'],
                  username: item['author']['username'],
                  thumbUps: item['likeCount'],
                  thumbDowns: item['dislikeCount'],
                  time: item['timestamp'],
                  textColor: MyColors.white,
                  backgroundColor: MyColors.blue,
                  fontSize: 20,
                ))
            .toList();
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

  void editModeOpen() {
    setState(() {
      editMode = !editMode;
      contentController.text = widget.content;
    });
  }

  bool isBelongtoUser() {
    if (widget.userProvider.username == widget.username) {
      return true;
    } else {
      return false;
    }
  }

  Future<void> userPressed(bool like) async {
    if (like && isDisliked) {
      try {
        await APIService().likeComment(widget.token, widget.commentId);
      } catch (e) {
        throw Exception('Failed to likee comment.');
      }
      isDisliked = false;
      isLiked = true;
      setState(() {
        numberOfLikes = numberOfLikes! + 2;
      });
    } else if (!like && isDisliked) {
      try {
        await APIService().dislikeComment(widget.token, widget.commentId);
      } catch (e) {
        throw Exception('Failed to dislike comment.');
      }
      isDisliked = false;
      setState(() {
        numberOfLikes = numberOfLikes! + 1;
      });
    } else if (!like && isLiked) {
      try {
        await APIService().dislikeComment(widget.token, widget.commentId);
      } catch (e) {
        throw Exception('Failed to dislike comment.');
      }
      isLiked = false;
      isDisliked = true;

      setState(() {
        numberOfLikes = numberOfLikes! - 2;
      });
    } else if (like && isLiked) {
      try {
        await APIService().likeComment(widget.token, widget.commentId);
      } catch (e) {
        throw Exception('Failed to like comment.');
      }
      isLiked = false;

      setState(() {
        numberOfLikes = numberOfLikes! - 1;
      });
    } else if (like) {
      try {
        await APIService().likeComment(widget.token, widget.commentId);
      } catch (e) {
        throw Exception('Failed to like comment.');
      }
      isLiked = true;
      setState(() {
        numberOfLikes = numberOfLikes! + 1;
      });
    } else if (!like) {
      try {
        await APIService().dislikeComment(widget.token, widget.commentId);
      } catch (e) {
        throw Exception('Failed to dislike comment.');
      }
      isDisliked = true;
      setState(() {
        numberOfLikes = numberOfLikes! - 1;
      });
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

  final TextEditingController contentController = TextEditingController();
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
                    borderRadius: const BorderRadius.all(Radius.circular(20))),
                child: Column(children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children : [
                          Column(
                            children: [
                              CircleAvatar(
                                radius: 30,
                                backgroundColor: MyColors.darkBlue,
                                child: CircleAvatar(
                                  radius: 28,
                                  backgroundImage: userAvatar != ""
                                      ? NetworkImage(userAvatar!)
                                      : const AssetImage('assets/images/ludos_transparent.png') as ImageProvider,
                                ),
                              ),
                            ],
                          ),
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
                            onPressed: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) => VisitUserPage(
                                    userProvider: userProvider,
                                    username: widget.username,
                                    id: widget.userId),
                              ));
                            },
                          ),
                        ]
                      ),
                      if (isBelongtoUser())
                        Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              IconButton(
                                onPressed: () {
                                  editModeOpen();
                                },
                                icon: const Icon(Icons.edit,
                                    color: MyColors.orange),
                              ),
                              IconButton(
                                onPressed: () {
                                  CustomWidgets.deleteConfirmDialogComment(
                                      widget.userProvider,
                                      context,
                                      widget.threadId,
                                      widget.commentId);
                                },
                                icon: const Icon(Icons.delete,
                                    color: MyColors.orange),
                              ),
                            ])
                    ],
                  ),
                  if (!editMode)
                    Container(
                      padding: const EdgeInsets.all(15.0),
                      child: SelectableText.rich(
                            TextSpan(
                                children: buildStyledText(
                                    content,
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
                  if (editMode)
                    Row(
                      children: [
                        const SizedBox(width: 10.0),
                        Expanded(
                          child: TextFormField(
                            controller: contentController,
                            obscureText: false,
                            style: const TextStyle(
                                height: 1.0, color: MyColors.white),
                            cursorColor: MyColors.lightBlue,
                          ),
                        ),
                        IconButton(
                          style: TextButton.styleFrom(
                            backgroundColor: MyColors.lightBlue,
                          ),
                          onPressed: () async {
                            http.Response token =
                                await APIService().editComment(
                              widget.token,
                              widget.commentId,
                              contentController.text,
                            );
                            if (token.statusCode == 200) {
                              ScaffoldMessenger.of(context)
                                  .showSnackBar(
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
                                              'Your commnent is updated successfully. You will be redirected to the Thread.',
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
                                                builder: (context) =>
                                                    ThreadPage(
                                                        token: widget.token,
                                                        userProvider:
                                                            widget.userProvider,
                                                        threadId:
                                                            widget.threadId),
                                              ));
                                        },
                                      ),
                                    ),
                                  )
                                  .closed
                                  .then((reason) => Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => ThreadPage(
                                              token: widget.token,
                                              userProvider: widget.userProvider,
                                              threadId: widget.threadId))));
                            } else {
                              CustomWidgets.statusNotOkay(
                                  context, json.decode(token.body)["message"]);
                            }
                          },
                          icon: const Icon(
                            Icons.save,
                            color: MyColors.orange,
                          ),
                        ),
                      ],
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
                          if (!widget.userProvider.isLoggedIn) {
                            CustomWidgets.needLoginSnackbar(
                                context, "Please log in to like a comment! ");
                          } else {
                            userPressed(true);
                          }
                        }),
                        icon: Icon(
                          Icons.thumb_up,
                          color: isLiked ? Colors.green : Colors.white,
                        ),
                      ),
                      Text(numberOfLikes.toString(),
                          style: TextStyle(color: Colors.white)),
                      IconButton(
                        onPressed: () => setState(() {
                          if (!widget.userProvider.isLoggedIn) {
                            CustomWidgets.needLoginSnackbar(context,
                                "Please log in to dislike a comment! ");
                          } else {
                            userPressed(false);
                          }
                        }),
                        icon: Icon(
                          Icons.thumb_down,
                          color: isDisliked ? Colors.red : Colors.white,
                        ),
                      ),
                      Text(numberOfComments.toString(),
                          style: TextStyle(color: Colors.white)),
                      IconButton(
                        icon: const Icon(
                          Icons.comment,
                          color: Colors.white,
                        ),
                        onPressed: () {
                          if (!widget.userProvider.isLoggedIn) {
                            CustomWidgets.needLoginSnackbar(
                                context, "Please log in to reply a comment! ");
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
                  if (showForm)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const SizedBox(width: 10.0),
                        Expanded(
                          child: TextFormField(
                            controller: commentInputController,
                            obscureText: false,
                            style: const TextStyle(
                                height: 1.0, color: MyColors.white),
                            decoration: const InputDecoration(
                              labelText: 'Add a reply',
                              labelStyle: TextStyle(
                                  color: MyColors.lightBlue,
                                  fontWeight: FontWeight.bold),
                              border: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                      color: MyColors.lightBlue, width: 2.0)),
                              focusedBorder: UnderlineInputBorder(
                                borderSide: BorderSide(
                                    color: MyColors.lightBlue, width: 2.0),
                              ),
                            ),
                            cursorColor: MyColors.lightBlue,
                          ),
                        ),
                        Container(
                          child: IconButton(
                            onPressed: () async {
                              http.Response token = await APIService()
                                  .createComment(widget.token, widget.commentId,
                                      commentInputController.text);
                              if (token.statusCode == 200) {
                                print("status is ok");
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(
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
                                                  builder: (context) =>
                                                      ThreadPage(
                                                          token: widget.token,
                                                          userProvider: widget
                                                              .userProvider,
                                                          threadId:
                                                              widget.threadId)),
                                            );
                                          },
                                        ),
                                      ),
                                    ) //ScaffoldMessager
                                    .closed
                                    .then((reason) => Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => ThreadPage(
                                                  token: widget.token,
                                                  userProvider:
                                                      widget.userProvider,
                                                  threadId: widget.threadId)),
                                        ));
                              } else {
                                CustomWidgets.statusNotOkay(context,
                                    json.decode(token.body)["message"]);
                              }
                            },
                            icon:
                                const Icon(Icons.reply, color: MyColors.white),
                          ),
                        ),
                      ],
                    ),
                ]))
          ],
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(10, 10, 0, 10),
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
