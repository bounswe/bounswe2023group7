import 'package:flutter/material.dart';
import 'helper/colors.dart';

class GamePropertiesPage extends StatefulWidget {
  final Map<String, dynamic> gameData;
  const GamePropertiesPage({Key? key, required this.gameData}) : super(key: key);
  @override
  _GamePropertiesPageState createState() => _GamePropertiesPageState();
}

class _GamePropertiesPageState extends State<GamePropertiesPage> {
  @override
  Widget build(BuildContext context) {
    Map<String, dynamic> gameData = widget.gameData;
    return Scaffold(
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Properties'),
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(gameData['coverLink']),
            fit: BoxFit.fill,
            opacity: 0.2,
          ),
        ),
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              decoration: BoxDecoration(
                color: const Color(0xff7c94b6),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.2), BlendMode.dstATop),
                  image: const NetworkImage(
                    'assets/images/ludos_transparent.png',
                  ),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Release Date: ',
                  style: TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
                Text(
                  gameData['releaseDate'].toString(),
                  style: const TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Developer: ',style: TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
                Text(gameData['developer'].toString()
                  ,style: const TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Publisher: ',style: TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
                Text(gameData['publisher'].toString()
                  ,style: const TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),

            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Age Restriction: ',style: TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
                Text(gameData['ageRestriction'].toString()
                  ,style: const TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Average Completion Duration: ',style: TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
                Text((gameData['averageCompletionDuration'] == null
                    ? 'Unknown' : gameData['averageCompletionDuration']).toString(),
                  style: const TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),

            const SizedBox(height: 20),
            const Text('Predecessors '
              ,style: TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 10),
            SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    if (gameData['predecessors'] != null)
                      for (var i = 0; i < gameData['predecessors'].length; i++)
                        Text('${gameData['predecessors'][i].toString()}   ',
                          style: const TextStyle(
                          color: MyColors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                        ),
                  ],
                ),

              ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 20),
            const Text('Successors'
              ,style: TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    if (gameData['successors'] != null)
                      for (var i = 0; i < gameData['successors'].length; i++)
                        Text('${gameData['successors'][i].toString()}  ',
                          style: const TextStyle(
                            color: MyColors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                  ],
                ),

              ),
            const Divider(
              height: 3.0,
              thickness: 3.0,
              color: Color(0xFFFFFFFF),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}