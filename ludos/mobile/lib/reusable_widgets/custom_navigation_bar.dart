import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/change_password.dart';
import 'package:ludos_mobile_app/user_profile_page.dart';
import 'package:ludos_mobile_app/reusable_widgets/forum_thread.dart';
import 'package:ludos_mobile_app/reusable_widgets/home_game_sum.dart';
import '../helper/APIService.dart';
import '../login_page.dart';
import '../games_page.dart';
import '../userProvider.dart';
import 'package:provider/provider.dart';
import '../helper/colors.dart';
import '../search_page.dart';
import '../main.dart';

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
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => Home(),
                  ));
                },
                icon: const Icon(Icons.home)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                },
                icon: const Icon(Icons.group)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => GamesPage(token: userProvider.token, userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.games)),
            IconButton(
                color: MyColors.white,
                onPressed: () {},
                icon: const Icon(Icons.favorite)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    //builder: (context) => GamesPage(token: userProvider.token, userProvider: userProvider),
                    builder: (context) => SearchPage(userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.search_outlined)),
          ],
        ));
  }
}


