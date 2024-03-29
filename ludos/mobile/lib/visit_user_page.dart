import 'dart:convert';
import 'package:flutter/material.dart';
import 'game_page.dart';
import 'helper/APIService.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'reusable_widgets/last_activity_summary.dart';

class VisitUserPage extends StatefulWidget {
  final String? username;
  final UserProvider userProvider;
  final String? id;
  const VisitUserPage({this.username, this.id, Key? key, required this.userProvider}) : super(key: key);

  @override
  State<VisitUserPage> createState() => _VisitUserPageState();
}

class _VisitUserPageState extends State<VisitUserPage> {
  final APIService apiService = APIService();
  late Map<String, dynamic> userData = {};
  late List<Map<String, dynamic>>? lastActivities = [];

  @override
  void initState() {
    super.initState();
    loadUserData();
    fetchLastActivities();
  }

  Future<void> loadUserData() async {
    try {
      var response = await apiService.userInfoById(widget.id, widget.userProvider.token!);
      setState(() {
        if(response.statusCode == 200){
          userData = json.decode(response.body);
        }
        else{
          userData = {};
          print('Error loading user data: ${response.statusCode}');
        }
      });
    } catch (e) {
      print('Error loading game data: $e');
    }
  }

  Future<void> fetchLastActivities() async {
    final response = await apiService.lastActivities(
      widget.userProvider.token,
      limit: 5,
      ownerUserId: widget.id,
    );
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);
        for (var i = 0; i < responseData["items"].length; i++) {
          if(responseData["items"][i]['user']['id'] == widget.id){
            setState(() {
              lastActivities!.add(responseData["items"][i]);
            });
          }
        }
        /*
        for (var i = 0; i < lastActivities!.length; i++) {
          print(lastActivities![i]);
        }
        */
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load posts');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load threads!');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        title: Text('${widget.username}'),
        backgroundColor: MyColors.lightBlue,
      ),
      body: SingleChildScrollView(
      child:Column(
        children: [
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(
                padding: const EdgeInsets.fromLTRB(10, 0, 5, 0),
                child: CircleAvatar(
                  backgroundColor: MyColors.lightBlue,
                    radius: 50,
                    child: ClipOval(
                        child: (userData['avatar'] != null) ?
                        Image.network(
                          userData['avatar'].toString(),
                          width: 80,
                          height: 80,
                          fit: BoxFit.cover,
                        )
                            :
                        const Icon(Icons.person)
                    )
                ),
              ),
              Container(
                padding: const EdgeInsets.fromLTRB(5, 0, 5, 0),
                child: Column(
                  children: [
                    Text(
                      userData['username'].toString(),
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: MyColors.lightBlue,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      userData['userType'].toString().toUpperCase(),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: MyColors.lightBlue,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        const SizedBox(width: 25),
                        TextButton(
                            onPressed: () {},
                            child: Container(
                              padding: const EdgeInsets.fromLTRB(7, 0, 7, 0),
                              child: Column(
                                children: [
                                  const SizedBox(height: 5),
                                  const Text(
                                    'Reviews',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: MyColors.white,
                                    ),
                                  ),
                                  Text(
                                    (userData['reviews'] == null) ? '0' : userData['reviews'].length.toString(),
                                    style: const TextStyle(
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold,
                                      color: MyColors.white,
                                    ),
                                  ),
                                ],
                              ),
                            )),
                        Container(
                          height: 50,
                          width: 2,
                          color: Colors.grey,
                        ),
                        TextButton(
                            onPressed: () {},
                            child: Container(
                              padding: const EdgeInsets.fromLTRB(7, 0, 7, 0),
                              child: Column(
                                children: [
                                  const SizedBox(height: 5),
                                  const Text(
                                    'Posts',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: MyColors.white,
                                    ),
                                  ),
                                  Text(
                                    (userData['posts'] == null) ? '0' : userData['posts'].length.toString(),
                                    style: const TextStyle(
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold,
                                      color: MyColors.white,
                                    ),
                                  ),
                                ],
                              ),
                            )),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Divider(
            height: 5,
            color: MyColors.orange,
            thickness: 2,
            indent: 25,
            endIndent: 25,
          ),
          const SizedBox(height: 10),
          const Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 20),
              Text(
                'About Me:',
                style: TextStyle(
                  decoration: TextDecoration.underline,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: MyColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 5),
          Container(
              padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
              child: (userData['aboutMe'] != null) ?
              Text(
                userData['aboutMe'].toString(),
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                ),
              )
                  :
              const Text(
                'No about me provided.',
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                ),
              )
          ),
          const SizedBox(height: 20),
          const Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 20),
              Text(
                'Associated Teams & Companies:',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: MyColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 5),
          Container(
              padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
              child: (userData['associatedTeam'] != null) ?
              Text(
                userData['associatedTeam'].toString(),
                style: const TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                ),
              )
                  :
              const Text(
                '',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                ),
              )
          ),
          const SizedBox(height: 5),
          Container(
              padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
              child: (userData['associatedCompany'] != null) ?
              Text(
                userData['associatedCompany'].toString(),
                style: const TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                ),
              )
                  :
              const Text(
                '',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: MyColors.blue2,
                ),
              )
          ),
          const SizedBox(height: 20),
          const Divider(
            height: 5,
            color: MyColors.orange,
            thickness: 2,
            indent: 25,
            endIndent: 25,
          ),
          const SizedBox(height: 10),
          const Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 20),
              Text(
                'Connected Platforms:',
                style: TextStyle(
                  decoration: TextDecoration.underline,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: MyColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                const SizedBox(width: 15),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.darkBlue,
                  ),
                  onPressed: () {
                    // Can go to steam profile page
                  },
                  child: ClipOval(// Set your desired height

                    child: Image.asset(
                      'assets/images/steam-logo-black-transparent.png',
                      height: 100,
                      width: 100,
                      fit: BoxFit.cover, // You can adjust the fit property based on your needs
                    ),
                  ),
                ),
                const SizedBox(width: 15),
              ],
            ),
          ),
          const SizedBox(height: 20),
          const Divider(
            height: 5,
            color: MyColors.orange,
            thickness: 2,
            indent: 25,
            endIndent: 25,
          ),
          const SizedBox(height: 10),
          const Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 20),
              Text(
                'Followed Games:',
                style: TextStyle(
                  decoration: TextDecoration.underline,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: MyColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: (userData['followedGames'] == null) ? [const Column()] : userData['followedGames'].map<Widget>((game) {
                return Column(
                  children: [
                    Row(
                      children: [
                        Column(
                          children: [
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: MyColors.darkBlue,
                              ),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => GamePage(
                                      id: game['id'].toString(),
                                      token: widget.userProvider.token,
                                      userProvider: widget.userProvider,
                                      onRefresh: (){
                                        setState(() {
                                          loadUserData();
                                        });
                                      },
                                    ),
                                  ),
                                );
                              },
                              child: ClipRect(
                                child: FadeInImage(
                                  width: 100,
                                  height: 160,
                                  image: NetworkImage(game['coverLink']),
                                  placeholder: const AssetImage(
                                    'assets/images/default_game.jpg',
                                  ),
                                  imageErrorBuilder: (context, error, stackTrace) {
                                    return Image.asset('assets/images/default_game.jpg',
                                        width: 100, height: 160, fit: BoxFit.fill);
                                  },
                                  fit: BoxFit.fill,
                                ),
                              ),
                            ),
                            const SizedBox(height: 10),
                            Container(
                              padding: const EdgeInsets.fromLTRB(2, 0, 2, 0),
                              child: Row(
                                children: [
                                  const SizedBox(width: 7),
                                  Text(
                                    game['title'],
                                    style: const TextStyle(
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold,
                                      color: MyColors.red,
                                    ),
                                  ),
                                  const SizedBox(width: 7),
                                ],
                              ),
                            ),
                          ],
                        ),
                        Column(
                          children: [
                            Container(
                              height: 200,
                              width: 2,
                              color: Colors.grey,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 20),
          const Divider(
            height: 5,
            color: MyColors.orange,
            thickness: 2,
            indent: 25,
            endIndent: 25,
          ),
          const SizedBox(height: 10),
          const Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 20),
              Text(
                'Last Activities:',
                style: TextStyle(
                  decoration: TextDecoration.underline,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: MyColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              children: lastActivities!.map<Widget>((activity) {
                return LastActivitySummary(
                    gameID: activity['game']['id'].toString(),
                    postID: activity['id'].toString(),
                    gameTitle: activity['game']['title'].toString(),
                    createdAt: activity['createdAt'].toString(),
                    userID: activity['user']['id'].toString(),
                    postTitle: activity['title'].toString(),
                    postContent: activity['body'].toString(),
                    gameCoverlink: activity['game']['coverLink'].toString(),
                    userProvider: widget.userProvider);
              }).toList(),
            ),
          ),
          const SizedBox(height: 10),
          const Divider(
            height: 5,
            color: MyColors.orange,
            thickness: 2,
            indent: 25,
            endIndent: 25,
          ),
          const SizedBox(height: 10),
        ],
      ),
      ),
    );
  }
}

