import 'package:flutter/material.dart';
import 'helper/colors.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'helper/APIService.dart';
class GamePage extends StatefulWidget {

  final String id;
  const GamePage({required this.id, Key? key}) : super(key: key);
  @override
  State<GamePage> createState() => _GamePageState();
}
class _GamePageState extends State<GamePage> {
  final APIService apiService = APIService();
  Map<String, dynamic> gameData = {};
  @override
  void initState() {
    super.initState();
    loadGameData();
  }

  Future<void> loadGameData() async {
    try {
      gameData = await apiService.getGame(widget.id);

      setState(() {});
    } catch (e) {
      print('Error loading game data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: Text('${gameData['title']}'),
      ),
      body:  SingleChildScrollView(

        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            if(gameData['coverLink'] != null)
              Image.network(
                gameData['coverLink'].toString(),
                errorBuilder:
                    (BuildContext context, Object exception, StackTrace? stackTrace) {
                  return const Text('');
                },
              ),

            const SizedBox(height: 10),
            if (gameData['releaseDate'] != null)
              Text('Release Date: ${gameData['releaseDate']}',style: const TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
              ),
            const SizedBox(height: 10),
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  if (gameData['tags'] != null)
                    for (var i = 0; i < gameData['tags'].length; i++)
                          TextButton(
                            style: TextButton.styleFrom(
                                foregroundColor: MyColors.lightBlue),
                            onPressed: () {},
                            child: Text(gameData['tags'][i].toString()),
                          ),
                  ],
              ),
            ),
            const SizedBox(height: 10),
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  if (gameData['tags'] != null)
                    for (var i = 0; i < gameData['platforms'].length; i++)
                      TextButton(
                        style: TextButton.styleFrom(
                            foregroundColor: MyColors.lightBlue),
                        onPressed: () {},
                        child: Text(gameData['platforms'][i].toString()),
                      ),
                ],
              ),
            ),
            Row(
              children: [
                if (gameData['userRating'] != null)
                RatingBar.builder(
                  initialRating: gameData['userRating'].toDouble(),
                  minRating: 0,
                  direction: Axis.horizontal,
                  allowHalfRating: true,
                  itemCount: 5,
                  itemSize: 40,
                  itemBuilder: (context, _) => const Icon(
                    Icons.star,
                    color: MyColors.orange,
                  ),
                  onRatingUpdate: (rating) {
                    print(rating);
                  },
                ),
                SizedBox(width: 8), // Add some spacing between RatingBar and Text
                if (gameData['averageRating'] != null)
                  Text('${gameData['averageRating']}/5'.padLeft(22),style: const TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
              ],
            ),

            const SizedBox(height: 10),
            if(gameData['gameStory'] != null)
              Text(
                gameData['gameStory'].toString(),
                style: const TextStyle(
                  color: MyColors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            const SizedBox(height: 20),
            if(gameData['averageUserCompilationDuration'] != null)
              Text('Average User Compilation Time: ${gameData['averageUserCompilationDuration']}',style: const TextStyle(
                color: MyColors.orange,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                      'A stunningly beautiful game with characters you grow to love. This is quite the adventure and I was all in within a few minutes of starting. In the midst of Norse mythology, it is a sweet and heartwarming story about a father and a son building a relationship.',
                      softWrap: true,
                      style: TextStyle(color: Colors.white)),
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
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(
                              foregroundColor: Color(0xFFf89c34)),
                          onPressed: () {},
                          child: Text('@sena'),
                        ),
                      ),

                    ],
                  ),
                ),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                      'Great story, characters, voice acting, cinematics, etc. The game world is huge and diverse and you travel by foot, by boat and (ultimately) by fast travel through mystic gates. ',
                      softWrap: true,
                      style: TextStyle(color: Colors.white)),
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
                        '2 days ago',
                        style: TextStyle(color: Colors.white),
                      ),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(
                              foregroundColor: Color(0xFFf89c34)),
                          onPressed: () {},
                          child: Text('@sena'),
                        ),
                      ),

                    ],
                  ),
                ),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF589cb4),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}