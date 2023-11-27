import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '../game_page.dart';
import '/helper/colors.dart';
import '/reusable_widgets/single_rating_icon.dart';

class HomeGameSum extends StatefulWidget {
  final String title;
  final double averageRating;
  final String coverLink;
  final String id;
  final String? token;
  final UserProvider userProvider;

  const HomeGameSum({
    Key? key,
    required this.title,
    required this.averageRating,
    required this.coverLink,
    required this.id,
    required this.token,
    required this.userProvider
  }) : super(key: key);

  @override
  State<HomeGameSum> createState() => _HomeGameSumState(
      title: title,
      averageRating: averageRating,
      coverLink: coverLink,
      id: id,
      token: token,
      userProvider: userProvider
  );
}

class _HomeGameSumState extends State<HomeGameSum> {
  final String title;
  final double averageRating;
  final String coverLink;
  final String id;
  final String? token;
  final UserProvider userProvider;

  _HomeGameSumState({
    required this.title,
    required this.averageRating,
    required this.coverLink,
    required this.id,
    required this.token,
    required this.userProvider,
  });

  Widget build(BuildContext context) {
    return Row(
        children : [
          Container(
            width: 170.0,
            height: 250.0,
            decoration: BoxDecoration(
                border: Border.all(
                  color: MyColors.blue,
                  width: 3.0,
                ),

            borderRadius: const BorderRadius.all(Radius.circular(20)),),
            child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.blue.withOpacity(0.20),

                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  )),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => GamePage(id: id, token: token, userProvider: userProvider,  onRefresh: () {}),
                    ),
                  );
                  // Handle button press for the specific game
                  // Navigate to the game's profile page
                },
                child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
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
                  const SizedBox(height: 10),
                  Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.all(3.0),
                    child: Text(
                          title,
                          softWrap: true,
                          style: const TextStyle(
                            color: MyColors.blue,
                            fontSize: 15.0,
                          ),
                        ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List<Widget>.generate(
                      5, // Total number of stars
                          (index) {
                        double diff = 4.5 - index;
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

                ],
              ),
          ),
          ),
        const SizedBox(width: 10),
    ],
    );
  }
}
