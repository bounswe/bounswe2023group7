import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/group/groups.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import '../game_page.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '../helper/APIService.dart';
import '../reusable_widgets/user_summary.dart';
import 'package:ludos_mobile_app/group/create_group_thread.dart';
import 'group_forum.dart';

class GroupPage extends StatefulWidget {
  final VoidCallback onRefresh;
  final UserProvider userProvider;
  final String? token;
  final String groupId;

  const GroupPage(
      {Key? key,
      required this.userProvider,
      required this.token,
      required this.groupId,
      required this.onRefresh})
      : super(key: key);

  @override
  State<GroupPage> createState() => _GroupPageState();
}

class _GroupPageState extends State<GroupPage> {
  bool joinState = false;
  int numberOfMembers = 0;

  late String buttonText = ".";
  final APIService apiService = APIService();
  Map<String, dynamic> groupData = {};
  List<dynamic> usersList = [];

  @override
  initState() {
    super.initState();
    loadGroupData();
  }

  Future<void> loadGroupData() async {
    try {
      groupData = await apiService.getGroup(widget.groupId, widget.token);
      if (groupData['isJoined'] != null) {
        joinState = groupData['isJoined'];
      } else {
        joinState = false;
      }

      usersList = groupData['members'];
      numberOfMembers = groupData['members'].length;

      print(groupData);
      setState(() {});
    } catch (e) {
      print('Error loading group data: $e');
    }
  }

  Future<bool> getJoinState() async {
    var response = await APIService().getGroup(widget.groupId, widget.token);
    var bool = response['isJoined'];
    usersList = response['members'];
    numberOfMembers = response['members'].length;
    return bool;
  }

  Future<List<UserSummary>> getMembers() async {
    return usersList
        .map((dynamic item) => UserSummary(
            email: item['email'],
            username: item['username'],
            fullName: item['fullName'] ?? "",
            id: item['id'],
            avatar: item['avatar'] ?? "",
            token: widget.token,
            userProvider: widget.userProvider))
        .toList();
  }

//GroupsPage(token: widget.token, userProvider: widget.userProvider)

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => GroupsPage(
                    token: widget.token, userProvider: widget.userProvider),
              ));
          return false;
        },
        child: Scaffold(
          endDrawer: Drawer(
            child: Container(
              color: MyColors.darkBlue, // Drawer background color
              child: ListView(
                children: <Widget>[
                  ListTile(
                    title: const Text(
                      'Edit Group',
                      style: TextStyle(color: MyColors.white),
                    ),
                    onTap: () {
                      if (widget.userProvider.isLoggedIn) {
                        //edit group page
                      } else {
                        CustomWidgets.needLoginSnackbar(
                            context, "Please log in to edit the game! ", widget.userProvider);
                      }
                    },
                  ),
                  ListTile(
                    title: const Text(
                      'Delete Group',
                      style: TextStyle(color: MyColors.white),
                    ),
                    onTap: () {
                      //delete functionality
                    },
                  ),
                  ListTile(
                    title: const Text(
                      'Remove User',
                      style: TextStyle(color: MyColors.white),
                    ),
                    onTap: () {
                      //remove functionality
                    },
                  ),
                ],
              ),
            ),
          ),
          backgroundColor: MyColors.darkBlue,
          appBar: AppBar(
              backgroundColor: const Color(0xFFf89c34),
              title: (groupData['name'] != null)
                  ? Text('${groupData['name']}')
                  : Text('Group Page'),
              actions: [
                if (joinState)
                  Builder(
                      builder: (context) => IconButton(
                            onPressed: () =>
                                Scaffold.of(context).openEndDrawer(),
                            icon: Icon(Icons.more_horiz),
                            tooltip: MaterialLocalizations.of(context)
                                .openAppDrawerTooltip,
                          ))
              ]),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                
                    if (groupData['logo'] != null)
                      Column(
                        children: [
                          Image.network(
                            width: 150,
                            height: 150,
                            groupData['logo'].toString(),
                            errorBuilder: (BuildContext context,
                                Object exception, StackTrace? stackTrace) {
                              return const Text('');
                            },
                            fit: BoxFit.fill,
                          ),
                        ],
                      ),
                    const SizedBox(width: 10),
                    Column(
                      children: [
                        if ((groupData['name'] != null))
                          SingleChildScrollView(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Container( 
                                  padding: const EdgeInsets.all(15.0),
                                  child: Text(
                                    groupData['name'],
                                    softWrap: true,
                                    style: const TextStyle(
                                      color: MyColors.orange,
                                      fontSize: 30,
                                      fontWeight: FontWeight.bold,
                                    ),
                                ),
                              ),
                            ],
                          ),
                        ),
                    
                        if (groupData['game'] != null)
                          TextButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => GamePage(
                                      id: groupData['game']['id'],
                                      token: widget.token,
                                      userProvider: widget.userProvider,
                                      onRefresh: () {},
                                    ),
                                  ),
                                );
                              },
                              child: Text(
                                groupData['game']['title'],
                                style: const TextStyle(
                                  color: MyColors.orange,
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                              ))
                     
                  ],
                ),
                const SizedBox(height: 10),
                const Divider(
                  color: Colors.teal,
                  height: 5.0,
                  thickness: 2.0,
                ),
                Center(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        if (groupData['tags'] != null)
                          for (var i = 0; i < groupData['tags'].length; i++)
                            TextButton(
                              style: TextButton.styleFrom(
                                  foregroundColor: Colors.teal),
                              onPressed: () {},
                              child:
                                  Text('#${groupData['tags'][i].toString()}'),
                            ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Divider(
                  color: Colors.teal,
                  height: 5.0,
                  thickness: 2.0,
                ),
                const SizedBox(height: 10),
                if (groupData['description'] != null)
                  Text(
                    groupData['description'].toString(),
                    style: const TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                const SizedBox(height: 10),
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
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "MEMBERS",
                      style: TextStyle(color: MyColors.orange, fontSize: 20),
                    ),
                    if (groupData['members'] != null)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          const Icon(
                            Icons.people,
                            color: MyColors.orange,
                          ),
                          Text(
                            "${numberOfMembers}/${groupData['maxNumberOfMembers']}",
                            style: const TextStyle(
                                color: MyColors.orange, fontSize: 20),
                          ),
                        ],
                      )
                  ],
                ),
                const SizedBox(height: 10),
                if (joinState)
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: FutureBuilder<List<UserSummary>>(
                      future: getMembers(),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          // Show a loading indicator while fetching data
                          return const Center(
                              child: CircularProgressIndicator());
                        } else if (snapshot.hasError) {
                          // Handle errors
                          return Center(
                              child: Text('Error: ${snapshot.error}'));
                        } else if (!snapshot.hasData ||
                            snapshot.data!.isEmpty) {
                          // Handle the case when there is no data
                          return const Center(
                              child: Text('No user found with this input.',
                                  style: TextStyle(
                                      color: MyColors.orange,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold)));
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
                if (!joinState && (widget.userProvider.isLoggedIn))
                  const Text(
                    "Please Join to see the Members",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                if (!widget.userProvider.isLoggedIn)
                  const Text(
                    "Please first Login, then Join to see the Members",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      "POSTS",
                      style: TextStyle(color: MyColors.orange, fontSize: 20),
                    ),
                    if (joinState)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  MyColors.darkBlue),
                            ),
                            onPressed: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) => GroupForumPage(
                                    groupId: widget.groupId,
                                    gameId: groupData['game']['id'],
                                    token: widget.token,
                                    userProvider: widget.userProvider),
                              ));
                            },
                            child: const Text(
                              'SEE POSTS',
                              style: TextStyle(
                                  color: MyColors.orange,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16),
                              //style: TextStyle(color: Colors.black)
                            ),
                          ),
                        ],
                      )
                  ],
                ),
                if (joinState)
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all<Color>(Colors.teal),
                        ),
                        onPressed: () {
                          Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => CreateGroupThreadPage(
                                gameid: groupData['game']['id'],
                                groupId: widget.groupId,
                                token: widget.token,
                                userProvider: widget.userProvider),
                          ));
                        },
                        child: Text("Create Post"),
                      ),
                    ],
                  ),
                if (!joinState && (widget.userProvider.isLoggedIn))
                  const Text(
                    "Please Join to see the Posts",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                if (!widget.userProvider.isLoggedIn)
                  const Text(
                    "Please first Login, then Join to see the Posts",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
              ],
            ),
          ),
          bottomNavigationBar:
              CustomNavigationBar(userProvider: widget.userProvider),
        ));
  }
}
