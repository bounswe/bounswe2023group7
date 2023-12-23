import 'package:flutter/material.dart';
import '../games_page.dart';
import '../upcoming_titles.dart';
import '../userProvider.dart';
import '../helper/colors.dart';
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
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => UpcomingTitlePage(userProvider: userProvider, token: userProvider.token),
                  ));
                },
                icon: const Icon(Icons.rocket)),
            IconButton(
                color: MyColors.white,
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    //builder: (context) => GamesPage(token: userProvider.token, userProvider: userProvider),
                    builder: (context) => SearchLandingPage(userProvider: userProvider),
                  ));
                },
                icon: const Icon(Icons.search_outlined)),
          ],
        ));
  }
}


