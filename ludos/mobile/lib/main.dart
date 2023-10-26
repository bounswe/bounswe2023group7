import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'login_page.dart';


void main() => runApp(MaterialApp(
  home: Home(),
));

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFF6b415e),
        appBar: AppBar(
          backgroundColor: const Color(0xFF5f1a37),
          centerTitle: true,
          title: const Text('Ludos'),
          leading: IconButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => LoginPage(),));
              },
              icon: const Icon(
                Icons.person_2,
              )
          ),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.notifications),
              tooltip: 'Comment Icon',
              onPressed: () {},
            ) //IconButton
          ],
        ),
        body: ListView(
          children: <Widget>[
            Column(

              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: 250.0,
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: const Text(
                            'Assassins Creed Mirage launch brings 18% player rise across AC series',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: Text('@senaal'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'The average total player increase across the series is 18.66% since the release of Assassins Creed Mirage. This sudden increased interest across so many old games in the series is very rare for any series.',
                    softWrap: true,
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
                      Text('10 minutes ago'),
                    ],
                  ),
                ),

                //SizedBox(height: 5.0),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF5f1a37),
                ),
              ],

            ),
            Column(

              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: 250.0,
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: const Text(
                            ' FAR CRY’S MULTIPLAYER GAME IS AN EXTRACTION-BASED SHOOTER',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: Text('@furkanulke'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'As expected with an extraction-based shooter, the game loop is focused on gathering gear, leveling up, and purchasing perks. Although sources were unable to dive deep into what perks entail, it was said that they are directly tied to the leveling system. ',
                    softWrap: true,
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
                      Text('40 minutes ago'),
                    ],
                  ),
                ),

                //SizedBox(height: 5.0),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF5f1a37),
                ),
              ],

            ),
            Column(

              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: 250.0,
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: const Text(
                            'Watch Dogs: Legion vs Watch Dogs 2',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: Text('@haticeerk'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'Anyone else really disappointed with Watch Dogs: Legion after REALLY loving Watch Dogs 2?',
                    softWrap: true,
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
                      Text('10 hours ago'),
                    ],
                  ),
                ),

                //SizedBox(height: 5.0),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF5f1a37),
                ),
              ],
            ),
            Column(

              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: 250.0,
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: const Text(
                            'Disco Elysium x Death note fan-fiction recommendations?',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          style: TextButton.styleFrom(foregroundColor: Colors.black),
                          onPressed: () {},
                          child: Text('@kardelen'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'Does anyone have any recommendations for Disco Elysium x Death note fan-fiction. I have seen the concept thrown around here a lot but I would absoluely love to read a story about it. Comment if you know any. Thanks!',
                    softWrap: true,
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
                      Text('10 days ago'),
                    ],
                  ),
                ),

                //SizedBox(height: 5.0),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF5f1a37),
                ),
              ],
            ),

          ],
        ),
        bottomNavigationBar: Container(
              color: const Color(0xFF5f1a37),
              padding: const EdgeInsets.all(10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.home)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.group)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.add_box)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.favorite)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.search_outlined)),
                ],
              )
        ),
    );
  }
}

