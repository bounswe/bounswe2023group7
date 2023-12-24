import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '../game_page.dart';
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
  final String id;
  final String? token;
  final UserProvider userProvider;

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
    required this.id,
    required this.token,
    required this.userProvider
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
        id: id,
        token: token,
        userProvider: userProvider
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
  final String id;
  final String? token;
  final UserProvider userProvider;

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
    required this.id,
    required this.token,
    required this.userProvider,
  });

  String truncateString(String input) {
  const maxLength = 110;
  return input.length <= maxLength ? input : '${input.substring(0, maxLength)}...';
}

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Stack(
            children: [
              Positioned.fill(
                child: Opacity(
                  opacity: 0.6,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(15.0),
                    child: Container(
                      color: Colors.black.withOpacity(0.01),
                      child: FadeInImage(
                        image: NetworkImage(coverLink),
                        placeholder: const AssetImage('assets/images/ludos_transparent.png'),
                        imageErrorBuilder: (context, error, stackTrace) {
                          return Image.asset(
                            'assets/images/ludos_transparent.png',
                            fit: BoxFit.fill,
                          );
                        },
                        fit: BoxFit.fill,
                      ),
                    ),
                  ),
                ),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    onPrimary: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    )),
                onPressed: () {

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => GamePage(
                        id: id,
                        token: token,
                        userProvider: userProvider,
                        onRefresh: () {},
                      ),
                    ),
                  );


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
                            color: MyColors.white,
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
                        Container(
                          color: Colors.white.withOpacity(0.25),
                          height: 25,
                          width: 290,
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
                                              size: 25, color: MyColors.orange),
                                          Text("+$numOfFollowers favorites",
                                              style: const TextStyle(
                                                color: MyColors.orange,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 18.0,
                                              ))
                                        ]),
                                    const SizedBox(width: 10),
                                    Row(
                                      children: List<Widget>.generate(
                                        5, // Total number of stars
                                            (index) {
                                          double diff = averageRating - index;
                                          if (diff >= 1.0) {
                                            // Full star
                                            return const SingleRatingIcon(
                                                icon: Icons.star,
                                                size: 25,
                                                iconColor: MyColors.orange,
                                                rating: 10.0);
                                          } else if (diff >= 0.5) {
                                            // Floating star
                                            return SingleRatingIcon(
                                                icon: Icons.star,
                                                size: 25,
                                                iconColor: MyColors.orange,
                                                rating: diff * 10.0);
                                          } else {
                                            // Empty star
                                            return const SingleRatingIcon(
                                                icon: Icons.star,
                                                size: 25,
                                                iconColor: MyColors.lightBlue,
                                                rating: 0.0);
                                          }
                                        },
                                      ).toList(),
                                    ),
                                  ]),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            height: 120,
                            child: Text(
                              truncateString(gameStory),
                              softWrap: true,
                              style: TextStyle(
                                color: MyColors.white,
                                fontSize: fontSize,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
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
                          return Row( 
                            children: [
                              ElevatedButton(
                                onPressed: () {
                                  // Handle button press for the specific tag
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: MyColors.orange.withOpacity(0.95),
                                  textStyle: const TextStyle(color: MyColors.lightBlue),
                                ),
                                child: Text(
                                  tag,
                                  style: const TextStyle(
                                    color: MyColors.darkBlue,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 17.0,
                                  ),
                                ),
                              ),
                              const SizedBox(
                                width: 5
                              )
                             ],
                          );
                        }).toList(),
                      ),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ]
        ),
        Container(
          color: MyColors.darkBlue,
          child: const SizedBox(height: 20.0),
        ),
      ],
    );
  }
}
