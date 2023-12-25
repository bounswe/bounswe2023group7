import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:ludos_mobile_app/group/group_page.dart';
import 'package:ludos_mobile_app/helper/APIService.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';

import '../game_page.dart';
import '../userProvider.dart';
import '../visit_user_page.dart';

class GroupSummary extends StatefulWidget {
  final UserProvider userProvider;
  final String? token;
  final String groupId;
  final String gameId;
  final String gameName;
  final String adminName;
  final String adminId;
  final String title;
  final int maxNumbers;
  final bool isJoined;
  final List<dynamic> tags;
  final VoidCallback onRefresh;

  const GroupSummary(
      {Key? key,
      required this.userProvider,
      required this.token,
      required this.groupId,
      required this.gameId,
      required this.gameName,
      required this.adminName,
      required this.adminId,
      required this.title,
      required this.maxNumbers,
      required this.isJoined,
      required this.tags,
      required this.onRefresh})
      : super(key: key);

  @override
  State<GroupSummary> createState() => _GroupSummaryState(
      userProvider: userProvider,
      token: token,
      groupId: groupId,
      gameId: gameId,
      gameName: gameName,
      adminName: adminName,
      adminId: adminId,
      title: title,
      maxNumbers: maxNumbers,
      isJoined: isJoined,
      tags: tags,
      onRefresh: onRefresh);
}

class _GroupSummaryState extends State<GroupSummary> {
  final UserProvider userProvider;
  final String? token;
  final String groupId;
  final String gameId;
  final String gameName;
  final String adminName;
  final String adminId;
  final String title;
  final int maxNumbers;
  final bool isJoined;
  final List<dynamic> tags;
  final VoidCallback onRefresh;

  bool joinState = false;

  _GroupSummaryState(
      {required this.userProvider,
      required this.token,
      required this.groupId,
      required this.gameId,
      required this.gameName,
      required this.adminName,
      required this.adminId,
      required this.title,
      required this.maxNumbers,
      required this.isJoined,
      required this.tags,
      required this.onRefresh});

  @override
  void initState() {
    super.initState();
    joinState = isJoined;
  }

  Future<bool> getJoinState() async {
    var response = await APIService().getGroup(widget.groupId, widget.token);
    var bool = response['isJoined'];
    return bool;
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

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
            style: ElevatedButton.styleFrom(
                backgroundColor: Colors.teal,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                )),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => GroupPage(
                  userProvider: userProvider,
                  token: token,
                  groupId: groupId,
                  onRefresh: () {},
                ),
              ));
            },
            child: Column(
              children: [
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
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
                        child: Text(gameName,
                            style: TextStyle(
                              color: MyColors.white,
                              fontSize: 15.0,
                            ))),
                    const SizedBox(width: 5.0),
                    const Icon(Icons.people),
                    Text(
                      maxNumbers.toString(),
                      style: const TextStyle(
                        color: MyColors.orange,
                        fontSize: 15.0,
                      ),
                    ),
                    const SizedBox(width: 5.0),
                    TextButton(
                      onPressed: () {
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => VisitUserPage(
                              userProvider: userProvider,
                              username: widget.adminName,
                              id: widget.adminId),
                        ));
                      },
                      child: Text(
                        '@$adminName', //may need to navigate also the user
                        style: const TextStyle(
                          color: MyColors.orange,
                          fontSize: 15.0,
                        ),
                      ),
                    )
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
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: tags.map((tag) {
                      return Row( 
                            children: [
                              ElevatedButton(
                                onPressed: () {
                                  // Handle button press for the specific tag
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: MyColors.orange.withOpacity(0.95),
                                  textStyle: const TextStyle(color: MyColors.lightBlue),
                                ),
                                child: Text(
                                  tag,
                                  style: const TextStyle(
                                    color: MyColors.darkBlue,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 17.0,
                                  ),
                                ),
                              ),
                              const SizedBox(
                                width: 5
                              )
                             ],
                          );
                    }).toList(),
                  ),
                ),
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(Colors.teal),
                  ),
                  onPressed: () {
                    if (!widget.userProvider.isLoggedIn) {
                      CustomWidgets.needLoginSnackbar(
                          context, "Please log in to join a group!", widget.userProvider);
                    } else {
                      bool state = false;
                      Future<bool> executeAsyncActions() async {
                        bool state = false;
                        try {
                          if (joinState) {
                            http.Response token = await APIService()
                                .leaveGroup(widget.token, widget.groupId);
                            if (token.statusCode == 200) {
                              state = false;
                              widget.onRefresh();
                              print("Left!");
                            } else {
                              print("Error: ${token.statusCode}");
                            }
                          } else {
                            http.Response token = await APIService()
                                .joinGroup(widget.token, widget.groupId);
                            if (token.statusCode == 200) {
                              state = true;
                              widget.onRefresh();
                              print("Joined");
                            } else {
                              print("Error: ${token.statusCode}");
                            }
                          }
                        } catch (error) {
                          print("Error: $error");
                        }
                        bool joinleave = await getJoinState();
                        return state;
                      }

                      executeAsyncActions().then((bool value) {
                        setState(() {
                          joinState = value;
                        });
                      });
                    }
                  },
                  child: Text(joinState ? "Leave" : "Join"),
                ),
              ],
            )),
        Container(
          color: MyColors.darkBlue,
          child: const SizedBox(height: 20.0),
        ),
      ],
    );
  }
}
