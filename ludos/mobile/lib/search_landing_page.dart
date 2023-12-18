import 'package:flutter/material.dart';
import 'reusable_widgets/custom_navigation_bar.dart';
import 'userProvider.dart';
import 'helper/colors.dart';
import 'search_page_game.dart';
import 'search_page_user.dart';
import 'search_page.dart';
import 'detailed_game_search.dart';
import 'detailed_post_search.dart';

class SearchLandingPage extends StatelessWidget {
  final UserProvider userProvider;

  const SearchLandingPage({
    required this.userProvider,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: MyColors.orange,
        title: const Text(
          'Search',
          style: TextStyle(
            color: MyColors.white,
            fontSize: 25,
          ),
        ),
      ),
            body: Stack(
              children: [
            // Logo as a background with transparency
            Positioned.fill(
            child: Opacity(
            opacity: 0.75,
              child: Image.asset(
                'assets/images/ludos_transparent.png',
                fit: BoxFit.fill,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Search Games Button
              Expanded(
                child: Container(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Colors.transparent,
                      padding: const EdgeInsets.all(10.0),
                    ),
                    onPressed: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => DetailedGameSearch(
                          userProvider: userProvider
                        ),
                      ));
                    },
                    child: Container(
                      color: Colors.black.withOpacity(0.05),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: ['G', 'A', 'M', 'E', 'S']
                            .map((letter) => Text(
                          letter,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 40,
                          ),
                        )).toList(),
                      ),
                    ),
                  ),
                ),
              ),
              Container(
                width: 10.0,
                color: Colors.grey,
              ),
              // Search Threads Button
              Expanded(
                child: Container(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Colors.transparent,
                      padding: const EdgeInsets.all(10.0),
                    ),
                    onPressed: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => DetailedPostSearch(
                          userProvider: userProvider
                        ),
                      ));
                    },
                    child: Container(
                      color: Colors.black.withOpacity(0.05),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: ['T', 'H', 'R', 'E', 'A', 'D', 'S']
                            .map((letter) => Text(
                          letter,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 40,
                          ),
                        )).toList(),
                      ),
                    ),
                  ),
                ),
              ),
              Container(
                width: 10.0,
                color: Colors.grey,
              ),
              // Search Users Button
              Expanded(
                child: Container(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Colors.transparent,
                      padding: const EdgeInsets.all(10.0),
                    ),
                    onPressed: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => SearchPage(userProvider: userProvider),
                      ));
                    },
                    child: Container(
                      color: Colors.black.withOpacity(0.05),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: ['U', 'S', 'E', 'R', 'S']
                            .map((letter) => Text(
                          letter,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 40,
                          ),
                        )).toList(),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
              ],
            ),
      bottomNavigationBar: CustomNavigationBar(userProvider: userProvider),
    );
  }
}
