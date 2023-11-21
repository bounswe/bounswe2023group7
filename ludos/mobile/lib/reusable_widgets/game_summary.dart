import 'package:flutter/material.dart';
import '/helper/colors.dart';
import '/reusable_widgets/single_rating_icon.dart';

class GameSummary extends StatefulWidget {
  final String title;
  final double averageRating;
  final String coverLink;
  final int numOfFollowers;
  final String gameStory;
  final List<dynamic> tags;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;

  const GameSummary({
    Key? key,
    required this.title,
    required this.averageRating,
    required this.coverLink,
    required this.numOfFollowers,
    required this.gameStory,
    required this.tags,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
  }) : super(key: key);

  @override
  State<GameSummary> createState() => _GameSummaryState(
        title: title,
        averageRating: averageRating,
        coverLink: coverLink,
        numOfFollowers: numOfFollowers,
        gameStory: gameStory,
        tags: tags,
        textColor: textColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
      );
}

class _GameSummaryState extends State<GameSummary> {
  final String title;
  final double averageRating;
  final String coverLink;
  final int numOfFollowers;
  final String gameStory;
  final List<dynamic> tags;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;

  _GameSummaryState({
    required this.title,
    required this.averageRating,
    required this.coverLink,
    required this.numOfFollowers,
    required this.gameStory,
    required this.tags,
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
          onPressed: () {
            // Handle button press for the specific game
            // Navigate to the game's profile page
          },
          child: Column(
            children: [
              const SizedBox(height: 10),
              Row(
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      color: MyColors.darkBlue,
                      fontSize: 30.0,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
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
                          'assets/images/default_game.jpg',
                        ),
                        imageErrorBuilder: (context, error, stackTrace) {
                          return Image.asset('assets/images/default_game.jpg',
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
                                        size: 20, color: MyColors.lightBlue),
                                    Text("+$numOfFollowers favorites",
                                        style: const TextStyle(
                                          color: MyColors.lightBlue,
                                          fontSize: 16.0,
                                        ))
                                  ]),
                              Row(
                                children: List<Widget>.generate(
                                  5, // Total number of stars
                                  (index) {
                                    double diff = 4.5 - index;
                                    if (diff >= 1.0) {
                                      // Full star
                                      return const SingleRatingIcon(
                                          icon: Icons.star,
                                          size: 20,
                                          iconColor: MyColors.lightBlue,
                                          rating: 10.0);
                                    } else if (diff >= 0.5) {
                                      // Floating star
                                      return SingleRatingIcon(
                                          icon: Icons.star,
                                          size: 20,
                                          iconColor: MyColors.lightBlue,
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
                          "Here will be brief game story.",
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
              Row(
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
              const SizedBox(height: 20),
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
