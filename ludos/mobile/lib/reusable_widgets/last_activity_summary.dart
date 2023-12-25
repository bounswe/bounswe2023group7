import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '/helper/colors.dart';
import '/thread_page.dart';
import 'package:intl/intl.dart';

class LastActivitySummary extends StatefulWidget {
  final String gameID;
  final String postID;
  final String gameTitle;
  final String? userID;
  final String? postTitle;
  final String? postContent;
  final String? gameCoverlink;
  final String? createdAt;
  final UserProvider userProvider;

  const LastActivitySummary({
    required this.gameID,
    required this.postID,
    required this.gameTitle,
    this.userID,
    this.postTitle,
    this.postContent,
    this.gameCoverlink,
    required this.createdAt,
    required this.userProvider,
    super.key});

  @override
  State<LastActivitySummary> createState() => _LastActivitySummaryState();
}

class _LastActivitySummaryState extends State<LastActivitySummary> {
  late String? timeAgo = "";

  String timeDiff(String timestamp) {
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

  @override
  void initState() {
    super.initState();
    setState(() {
      timeAgo = timeDiff(widget.createdAt!);
    });
  }
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(15, 6, 15, 6),
      child: Column(
        children: [
          ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: MyColors.blue2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  )),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ThreadPage(threadId: widget.postID, token: widget.userProvider.token, userProvider: widget.userProvider),
                  ),
                );
              },
              child: Column(
                children: [
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 36,
                        backgroundColor: MyColors.orange,
                        child: CircleAvatar(
                          radius: 33,
                          backgroundImage: widget.gameCoverlink != null
                              ? NetworkImage(widget.gameCoverlink!)
                              : const AssetImage('assets/images/ludos_transparent.png') as ImageProvider,
                        ),
                      ),
                      const SizedBox(width: 20),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "${widget.gameTitle}/",
                              style: const TextStyle(
                                color: MyColors.red,
                                fontWeight: FontWeight.bold,
                                fontSize: 17.0,
                              ),
                            ),
                            Text(
                              widget.postTitle!,
                              style: const TextStyle(
                                color: Colors.black,
                                //fontWeight: FontWeight.bold,
                                fontSize: 18.0,
                              ),
                            ),
                            const SizedBox(height: 5),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                Text(
                                  timeAgo!,
                                  style: const TextStyle(
                                    color: MyColors.darkBlue,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15.0,
                                  ),
                                ),
                                const SizedBox(width: 5),
                              ]
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                ],
              ))
        ],
      ),
    );
  }
}
