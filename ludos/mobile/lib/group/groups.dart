import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/group/group_summary.dart';
import 'package:ludos_mobile_app/userProvider.dart';

import '../helper/APIService.dart';
import '../helper/colors.dart';
import '../reusable_widgets/custom_navigation_bar.dart';
import '../reusable_widgets/custom_widgets.dart';
import 'create_group.dart';
import 'dart:convert';

class GroupsPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;

  const GroupsPage({Key? key, required this.token, required this.userProvider})
      : super(key: key);

  @override
  State<GroupsPage> createState() => _GroupsPageState();
}

class _GroupsPageState extends State<GroupsPage> {
  late Future<List<GroupSummary>> groups;

  @override
  void initState() {
    super.initState();
    groups = fetchData();
  }

  Future<List<GroupSummary>> fetchData() async {
    final response = await APIService().listGroups(widget.token);
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> postLists = responseData['items'];

        return postLists
            .map((dynamic item) => GroupSummary(
                  token: widget.token,
                  userProvider: widget.userProvider,
                  groupId: item['id'],
                  gameName: item['game']['title'],
                  gameId: item['game']['id'],
                  adminId: item['admin']['id'],
                  adminName: item['admin']['username'],
                  title: item['name'],
                  maxNumbers: item['maxNumberOfMembers'],
                  isJoined: item['isJoined'] ?? true,
                  tags: item['tags'],
                ))
            .toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load groups!');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load groups!');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Groups'),
        actions: [
          TextButton(
            onPressed: () {
              if (widget.userProvider.isLoggedIn) {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => CreateGroupPage(
                      token: widget.token, userProvider: widget.userProvider),
                ));
              } else {
                CustomWidgets.needLoginSnackbar(
                    context, "Please log in to create a group!");
              }
            },
            child: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 10),
            //const SafeArea(child: SizedBox(height: 10)),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: FutureBuilder<List<GroupSummary>>(
                future: groups,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    // Show a loading indicator while fetching data
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    // Handle errors
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    // Handle the case when there is no data
                    return const Center(child: Text('No post available.'));
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
          ],
        ),
      ),
      bottomNavigationBar:
          CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}
