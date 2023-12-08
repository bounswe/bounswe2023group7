import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'login_page.dart';
import 'main.dart';
import 'reusable_widgets/game_summary.dart';
import 'helper/APIService.dart';
import 'create_game.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: Text(
          'Search',
          style: TextStyle(
            color: MyColors.white,
            fontSize: 30,
          ),
        ),
      ),
      body: Center(
        child: Text(
          'Search Page',
          style: TextStyle(
            color: MyColors.white,
            fontSize: 30,
          ),
        ),
      ),
    );
  }
}


