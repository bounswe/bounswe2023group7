import 'package:flutter/material.dart';
import '/helper/colors.dart';

class PostSummary extends StatefulWidget {
  final String game;
  final String title;
  final String username;
  final int thumbUps;
  final int thumbDowns;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;

  const PostSummary({
    Key? key,
    required this.game,
    required this.title,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
  }) : super(key: key);

  @override
  State<PostSummary> createState() => _PostSummaryState(
    game: game,
    title: title,
    username: username,
    thumbUps: thumbUps,
    thumbDowns: thumbDowns,
    textColor: textColor,
    backgroundColor: backgroundColor,
    fontSize: fontSize,
  );
}

class _PostSummaryState extends State<PostSummary> {
  final String game;
  final String title;
  final String username;
  final int thumbUps;
  final int thumbDowns;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;

  _PostSummaryState({
    required this.game,
    required this.title,
    required this.username,
    required this.thumbUps,
    required this.thumbDowns,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          style: ElevatedButton.styleFrom(
          backgroundColor: backgroundColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
              )),
          onPressed: () { //Navigates to the post itself
          },
          child: Column(
              children: [
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:
                  [
                    Text(
                      game,  //may need to navigate also the game
                      style: const TextStyle(
                        color: MyColors.darkBlue,
                        fontSize: 15.0,
                      ),
                    ),
                    SizedBox(width: 5.0),
                    Text(
                      username, //may need to navigate also the user
                      style: const TextStyle(
                        color: MyColors.darkBlue,
                        fontSize: 15.0,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: Text(
                        title,
                        softWrap: true,
                        style: const TextStyle(
                          color: MyColors.darkBlue,
                          fontSize: 20.0,
                        ),
                      ),
                  ),
                Container(
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        IconButton(
                            color: Colors.white,
                            onPressed: () {},
                            icon: const Icon(Icons.thumb_up_sharp)),
                        IconButton(
                            color: Colors.white,
                            onPressed: () {},
                            icon: const Icon(Icons.thumb_down_sharp)),
                        IconButton(
                            color: Colors.white,
                            onPressed: () {},
                            icon: const Icon(Icons.comment)),
                        const Text(
                          '10 hours ago',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                ),
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