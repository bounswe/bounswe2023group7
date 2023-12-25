import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import '../game_page.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '../helper/APIService.dart';
import '../reusable_widgets/user_summary.dart';

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
  late bool joinState;
  late String buttonText = ".";
  final APIService apiService = APIService();
  Map<String, dynamic> groupData = {};

  @override
  initState() {
    super.initState();
    loadGroupData();
  }

  Future<void> loadGroupData() async {
    try {
      groupData = await apiService.getGroup(widget.groupId, widget.token);
      print(groupData);
      setState(() {});
    } catch (e) {
      print('Error loading group data: $e');
    }
  }

  Future<List<UserSummary>> getMembers() async {
    List<dynamic> usersList = groupData['members'];

    return usersList.map((dynamic item) => UserSummary(
        email: item['email'],
        username: item['username'],
        fullName: item['fullName'],
        id: item['id'],
        avatar: item['avatar'] ?? null,
        token: widget.token,
        userProvider: widget.userProvider)).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                        context, "Please log in to edit the game! ");
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
          title: Text('${groupData['name']}'),
          actions: [
            if(groupData['isJoined'])
              Builder(
                  builder: (context) => 
                  
                  IconButton(
                        onPressed: () => Scaffold.of(context).openEndDrawer(),
                        icon: Icon(Icons.more_horiz),
                        tooltip: MaterialLocalizations.of(context)
                            .openAppDrawerTooltip,
                      ))
          ]),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                if (groupData['logo'] != null)
                  Column(
                    children: [
                      Image.network(
                        width: 150,
                        height: 150,
                        groupData['logo'].toString(),
                        errorBuilder: (BuildContext context, Object exception,
                            StackTrace? stackTrace) {
                          return const Text('');
                        },
                        fit: BoxFit.fill,
                      ),
                    ],
                  ),
                const SizedBox(width: 10),
                Column(
                  children: [
                    Text(
                      groupData['name'],
                      style: const TextStyle(
                        color: MyColors.orange,
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
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
                )
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
                          child: Text('#${groupData['tags'][i].toString()}'),
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
                backgroundColor: MaterialStateProperty.all<Color>(Colors.teal),
              ),
              onPressed: () {
                //perform join/leave
              },
              child: Text(groupData['isJoined'] ? "Leave" : "Join"),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "MEMBERS",
                  style: TextStyle(color: MyColors.orange, fontSize: 20),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    const Icon(
                      Icons.people,
                      color: MyColors.orange,
                    ),
                    Text(
                      "${groupData['members'].length}/${groupData['maxNumberOfMembers']}",
                      style:
                          const TextStyle(color: MyColors.orange, fontSize: 20),
                    ),
                  ],
                )
              ],
            ),
            const SizedBox(height: 10),
            if(groupData['isJoined'])
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: FutureBuilder<List<UserSummary>>(
                future: getMembers(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    // Show a loading indicator while fetching data
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    // Handle errors
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    // Handle the case when there is no data
                    return const Center(
                        child: Text('No user found with this input.',
                            style: TextStyle(color: MyColors.orange,
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
            if(!groupData['isJoined'] && (widget.userProvider.isLoggedIn))
              const Text(
                "Please Join to see the Members",
                style: TextStyle(
                  color: MyColors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            if(!widget.userProvider.isLoggedIn)
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
                if(groupData['isJoined'])
                  Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () {
                        //navigate a screen for all group posts check if they join or not
                      },
                      child: const Text(
                        "SEE ALL POSTS",
                        style: TextStyle(
                          color: MyColors.orange, 
                          fontSize: 20)
                      ),
                    ),
                  ],
                )
              ],
            ),
            if(groupData['isJoined'])
              Text("you can see"),
            if(!groupData['isJoined'] && (widget.userProvider.isLoggedIn))
              const Text(
                "Please Join to see the Posts",
                style: TextStyle(
                  color: MyColors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            if(!widget.userProvider.isLoggedIn)
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
      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}
