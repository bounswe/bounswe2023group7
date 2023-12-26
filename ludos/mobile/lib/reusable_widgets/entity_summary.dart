import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/entity_page.dart';
import 'package:ludos_mobile_app/helper/EntityContent.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import '/helper/colors.dart';

class EntitySummary extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String type;
  final String id;
  final String name;
  final EntityContent content;

  const EntitySummary(
      {Key? key,
      required this.type,
      required this.name,
      required this.content,
      required this.id,
      required this.token,
      required this.userProvider})
      : super(key: key);

  @override
  State<EntitySummary> createState() => _EntitySummaryState(
      type: type,
      name: name,
      content: content,
      id: id,
      token: token,
      userProvider: userProvider);
}

class _EntitySummaryState extends State<EntitySummary> {
  final String? token;
  final UserProvider userProvider;
  final String type;
  final String id;
  final String name;
  final EntityContent content;

  _EntitySummaryState(
      {required this.type,
      required this.name,
      required this.content,
      required this.id,
      required this.token,
      required this.userProvider});

  Widget build(BuildContext context) {
    return SelectionArea(
        child: Row(
      children: [
        Container(
          width: 170.0,
          height: 250.0,
          decoration: BoxDecoration(
            border: Border.all(
              color: MyColors.blue,
              width: 3.0,
            ),
            borderRadius: const BorderRadius.all(Radius.circular(20)),
          ),
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
                  builder: (context) => EntityPage(
                      id: id,
                      token: token,
                      userProvider: userProvider,
                      onRefresh: () {}),
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
                      image: NetworkImage(content.image),
                      placeholder: const AssetImage(
                        'assets/images/ludos_transparent.png',
                      ),
                      imageErrorBuilder: (context, error, stackTrace) {
                        return Image.asset(
                            'assets/images/ludos_transparent.png',
                            width: 100,
                            height: 160,
                            fit: BoxFit.fill);
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
                    type[0].toUpperCase() + type.substring(1),
                    softWrap: true,
                    style: const TextStyle(
                      color: MyColors.blue,
                      fontSize: 15.0,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.all(3.0),
                  child: Text(
                    name.length > 15 ? '${name.substring(0, 15)}...' : name,
                    softWrap: true,
                    style: const TextStyle(
                      color: MyColors.blue,
                      fontSize: 15.0,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 10),
      ],
    ));
  }
}
