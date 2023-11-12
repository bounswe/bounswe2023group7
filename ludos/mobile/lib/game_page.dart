import 'package:flutter/material.dart';
import 'helper/colors.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';


class GamePage extends StatefulWidget {
  const GamePage({super.key});

  @override
  State<GamePage> createState() => _GamePageState();
}
class _GamePageState extends State<GamePage> {
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('God of War (2018)'),
      ),
      body:  SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            SizedBox(
              width: 200.0,
              height: 200.0,
              child: Image.asset('assets/images/header_gow.jpg'),
            ),
            const SizedBox(height: 10),
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  TextButton(
                    style: TextButton.styleFrom(
                        foregroundColor: MyColors.lightBlue),
                    onPressed: () {},
                    child: Text('adventure'),
                  ),
                  TextButton(
                    style: TextButton.styleFrom(
                        foregroundColor: MyColors.lightBlue),
                    onPressed: () {},
                    child: Text('singleplayer'),
                  ),
                  TextButton(
                    style: TextButton.styleFrom(
                        foregroundColor: MyColors.lightBlue),
                    onPressed: () {},
                    child: Text('action'),
                  ),
                  TextButton(
                    style: TextButton.styleFrom(
                        foregroundColor: MyColors.lightBlue),
                    onPressed: () {},
                    child: Text('mythology'),
                  ),
                ],
              ),
            ),
            Row(
              children: [
                RatingBar.builder(
                  initialRating: 3,
                  minRating: 1,
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
                const Text('          Rating: 4.3/5',style: TextStyle(
                  color: MyColors.orange,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                ),
              ],
            ),

            const SizedBox(height: 10),

            const Text(
              '     His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.',
              style: TextStyle(
                color: MyColors.white,
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