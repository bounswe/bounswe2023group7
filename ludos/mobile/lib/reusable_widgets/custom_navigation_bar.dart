import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/change_password.dart';
import 'package:ludos_mobile_app/user_profile_page.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_thread.dart';
import 'package:ludos_mobile_app/reusable_widgets/home_game_sum.dart';
import '../group/groups.dart';
import '../helper/APIService.dart';
import '../login_page.dart';
import '../games_page.dart';
import '../userProvider.dart';
import 'package:provider/provider.dart';
import '../helper/colors.dart';
import '../detailed_user_search.dart';
import '../main.dart';
import '../search_landing_page.dart';

class CustomNavigationBar extends StatelessWidget {
  final UserProvider userProvider;
  const CustomNavigationBar({super.key, required this.userProvider});

  @override
  Widget build(BuildContext context) {
    return Container(color: MyColors.orange,
        padding: const EdgeInsets.all(10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (context) => Home(userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.home)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (context) => GroupsPage(token: userProvider.token, userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.group)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (context) => GamesPage(token: userProvider.token, userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.games)),
            IconButton(
                color: MyColors.white,
                onPressed: () {

                },
                icon: const Icon(Icons.favorite)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (context) => SearchLandingPage(userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.search_outlined)),
          ],
        ));
  }
}


