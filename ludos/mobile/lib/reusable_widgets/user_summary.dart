import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '../helper/APIService.dart';
import '../visit_user_page.dart';
import '/helper/colors.dart';

class UserSummary extends StatefulWidget {
  final String id;
  final String email;
  final String username;
  final String fullName;
  final String? avatar;
  final String? token;
  final UserProvider userProvider;

  const UserSummary({
    Key? key,
    required this.email,
    required this.username,
    required this.fullName,
    this.avatar,
    required this.id,
    required this.token,
    required this.userProvider
  }) : super(key: key);

  @override
  State<UserSummary> createState() => _UserSummaryState(
      email: email,
      username: username,
      fullName: fullName,
      avatar: avatar,
      id: id,
      token: token,
      userProvider: userProvider
  );
}

class _UserSummaryState extends State<UserSummary> {
  final String email;
  final String username;
  final String fullName;
  final String? avatar;
  final String id;
  final String? token;
  final UserProvider userProvider;
  String userType = ' ';

  _UserSummaryState({
    required this.email,
    required this.username,
    required this.fullName,
    this.avatar,
    required this.id,
    required this.token,
    required this.userProvider,
  });

  Future<void> fetchUserType(String userID) async {
    try {
      final response = await APIService().userById(widget.userProvider.token, userID); // Replace with the actual API endpoint
      setState(() {
        if (response.statusCode == 200) {
          final Map<String, dynamic> userData = json.decode(response.body);
          String type = userData['userType'];
          if(type == '') {
            type = 'USER';
          }
          userType = type.toUpperCase();
        } else {
          userType = 'Error';
          print("Error fetching user details: ${response.statusCode} - ${response.body}");
        }
      });

    } catch (error) {
      print("Error fetching user details: $error");
    }
  }

  String truncateString(String input) {
    const maxLength = 80;
    return input.length <= maxLength ? input : '${input.substring(0, maxLength)}...';
  }

  @override
  void initState() {
    super.initState();
    fetchUserType(id);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
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
                builder: (context) => VisitUserPage(
                  id: id,
                  username: username,
                  userProvider: userProvider,
                  // onRefresh: () {},
                ),
              ),
            );

          },
          child: Column(
            children: [
              const SizedBox(height: 10),
              Row(
                children: [
                  const SizedBox(width: 10),
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: MyColors.white,
                    child: CircleAvatar(
                      radius: 38,
                      backgroundImage: avatar != null
                          ? NetworkImage(avatar!)
                          : const AssetImage('assets/images/ludos_transparent.png') as ImageProvider,
                    ),
                  ),

                  const SizedBox(width: 30),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          username,
                          style: const TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 20.0,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          fullName,
                          style: const TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 16.0,
                          ),
                        ),
                        const SizedBox(height: 5),
                        /*
                        Text(
                          email,
                          style: const TextStyle(
                            color: MyColors.white,
                            fontSize: 16.0,
                          ),
                        ),
                        const SizedBox(height: 5),
                        */
                        Text(
                          userType,
                          style: const TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 18.0,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 10),
                ],
              ),
              const SizedBox(height: 10),
              /*
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      FadeInImage(
                        width: 100,
                        height: 160,
                        image: NetworkImage(coverLink),
                        placeholder: const AssetImage(
                          'assets/images/ludos_transparent.png',
                        ),
                        imageErrorBuilder: (context, error, stackTrace) {
                          return Image.asset('assets/images/ludos_transparent.png',
                              width: 100, height: 160, fit: BoxFit.fill);
                        },
                        fit: BoxFit.fill,
                      ),
                    ],
                  ),
                  Container(
                    height: 160,
                    width: 210,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                  mainAxisAlignment:
                                  MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Icon(Icons.favorite,
                                        size: 20, color: MyColors.red),
                                    Text("+$numOfFollowers favorites",
                                        style: const TextStyle(
                                          color: MyColors.red,
                                          fontSize: 16.0,
                                        ))
                                  ]),
                              Row(
                                children: List<Widget>.generate(
                                  5, // Total number of stars
                                      (index) {
                                    double diff = averageRating - index;
                                    if (diff >= 1.0) {
                                      // Full star
                                      return const SingleRatingIcon(
                                          icon: Icons.star,
                                          size: 20,
                                          iconColor: MyColors.red,
                                          rating: 10.0);
                                    } else if (diff >= 0.5) {
                                      // Floating star
                                      return SingleRatingIcon(
                                          icon: Icons.star,
                                          size: 20,
                                          iconColor: MyColors.red,
                                          rating: diff * 10.0);
                                    } else {
                                      // Empty star
                                      return const SingleRatingIcon(
                                          icon: Icons.star,
                                          size: 20,
                                          iconColor: MyColors.lightBlue,
                                          rating: 0.0);
                                    }
                                  },
                                ).toList(),
                              ),
                            ]),
                        const SizedBox(height: 10),
                        Text(
                          truncateString(gameStory),
                          softWrap: true,
                          style: TextStyle(
                            color: MyColors.darkBlue,
                            fontSize: fontSize,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: tags.map((tag) {
                    return ElevatedButton(
                      onPressed: () {
                        // Handle button press for the specific tag
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: MyColors.orange,
                        textStyle: const TextStyle(color: MyColors.darkBlue),
                      ),
                      child: Text(
                        tag,
                        style: const TextStyle(
                          color: MyColors.darkBlue,
                          fontWeight: FontWeight.bold,
                          fontSize: 17.0,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 20),
              */
            ],
          ),
        ),
        Container(
          color: MyColors.darkBlue,
          child: const SizedBox(height: 20.0),
        ),
      ],
    );
  }
}
