import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/group/group_summary.dart';
import 'package:ludos_mobile_app/main.dart';
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
  late Future<List<GroupSummary>> groupSearch;
  late Future<List<_Game>> games;
  List<_Game> gamesOnList = [];
  List<String> gameTitles = [];
  bool ifSearched = false;

  String itemSelected = "";

  @override
  void initState() {
    super.initState();
    groups = fetchData();
    games = fetchGameData();
    loadGames();
  }

  Future<void> loadGames() async {
    gamesOnList = await games;
    int i = 0;
    while (i < gamesOnList.length) {
      gameTitles.add(gamesOnList[i].title);
      i = i + 1;
    }
  }

  void searched() {
    groupSearch = fetchDataSearch(
        gamesOnList.firstWhere((game) => game.title == itemSelected).id);
  }

  Future<List<GroupSummary>> fetchDataSearch(String gameId) async {
    final response = await APIService().listGroupsSearch(gameId, widget.token);
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
                  onRefresh: () {},
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
                  onRefresh: () {},
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

  Future<List<_Game>> fetchGameData() async {
    final response = await APIService()
        .listGames(widget.token, limit: 1000, orderByKey: "title");
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> gamesLists = responseData['items'];
        print(gamesLists);
        return gamesLists
            .map((dynamic item) => _Game(id: item['id'], title: item['title']))
            .toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load games!');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load games!');
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) =>
                    Home(userProvider: widget.userProvider),
              ));
          return false;
        },
        child: Scaffold(
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
                          token: widget.token,
                          userProvider: widget.userProvider),
                    ));
                  } else {
                    CustomWidgets.needLoginSnackbar(
                        context, "Please log in to create a group!",widget.userProvider);
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
                const SizedBox(height: 10,),
                DropdownSearch<String>(
                  items: gameTitles,
                  popupProps: PopupProps.menu(
                    showSearchBox: true,
                  ),
                  dropdownButtonProps: DropdownButtonProps(
                    color: MyColors.darkBlue,
                  ),
                  dropdownDecoratorProps: DropDownDecoratorProps(
                    textAlignVertical: TextAlignVertical.center,
                    dropdownSearchDecoration: InputDecoration(
                      filled: true,  // Set to true to fill the background
                      fillColor: Colors.teal, 
                      border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(50),
                    )),
                  ),
                  onChanged: (value) {
                    setState(() {
                      itemSelected = value.toString();
                      searched();
                      ifSearched = true;
                    });
                  },
                  selectedItem: itemSelected,
                ),

                const SizedBox(height: 10),
                //const SafeArea(child: SizedBox(height: 10)),
                if (!ifSearched)
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: FutureBuilder<List<GroupSummary>>(
                      future: groups,
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
                              child: Text('No post available.'));
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
                if (ifSearched)
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: FutureBuilder<List<GroupSummary>>(
                      future: groupSearch,
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
                              child: Text('No post available.'));
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
        ));
  }
}

class _Game {
  final String id;
  final String title;

  const _Game({required this.id, required this.title});
}
