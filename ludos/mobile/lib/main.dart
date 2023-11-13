import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/change_password.dart';
import 'login_page.dart';
import 'userProvider.dart';
import 'package:provider/provider.dart';
import 'helper/colors.dart';
import 'create_game.dart';

void main() => runApp(ChangeNotifierProvider(
      create: (context) => UserProvider(),
      child: MaterialApp(
        home: Home(),
      ),
    ));

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var userProvider = Provider.of<UserProvider>(context);
    return Scaffold(
      drawer: Drawer(
        child: Container(
          color: MyColors.darkBlue, // Drawer background color
          child: ListView(
            children: <Widget>[
              UserAccountsDrawerHeader(
                accountName: Text(
                  userProvider.username,
                  style:
                      const TextStyle(color: MyColors.darkBlue), // Text color
                ),
                accountEmail: null,
                currentAccountPicture: const CircleAvatar(
                  backgroundColor: MyColors.white,
                  child: Icon(Icons.person),
                ),
                decoration: const BoxDecoration(
                  color: MyColors.blue, // Header background color
                ),
              ),
              if (userProvider.isLoggedIn)
                ListTile(
                  title: const Text(
                    'Change Password',
                    style: TextStyle(color: MyColors.white),
                  ),
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => const ChangePassword(),
                    ));
                  },
                ),
              if (userProvider.isLoggedIn)

              ListTile(
                title: const Text(
                  'Log Out',
                  style: TextStyle(color: MyColors.white),
                ),
                onTap: () {
                  userProvider.setLoggedIn(false, '', '');
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => LoginPage(),
                  ));
                },
              ),

              if (!userProvider.isLoggedIn)
                ListTile(
                  title: const Text(
                    'Log In',
                    style: TextStyle(color: MyColors.white),
                  ),
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => LoginPage(),
                    ));
                  },
                ),
            ],
          ),
        ),
      ),
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Ludos'),
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
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: const Text(
                          'Assassins Creed Mirage launch brings 18% player rise across AC series',
                          softWrap: true,
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                    SizedBox(width: 5.0),
                    Container(
                      child: TextButton(
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: const Text(
                          '@senaal',
                          style: TextStyle(color: Color(0xFFf89c34)),
                        ),
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
                  style: TextStyle(color: Colors.white),
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
                      '10 minutes ago',
                      style: TextStyle(color: Colors.white),
                    ),
                  ],
                ),
              ),
              //SizedBox(height: 5.0),
              const Divider(
                height: 3.0,
                thickness: 3.0,
                color: Color(0xFF589cb4),
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
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: const Text(
                          ' FAR CRY’S MULTIPLAYER GAME IS AN EXTRACTION-BASED SHOOTER',
                          softWrap: true,
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                    SizedBox(width: 5.0),
                    Container(
                      child: TextButton(
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: Text(
                          '@furkanulke',
                          style: TextStyle(color: Color(0xFFf89c34)),
                        ),
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
                  style: TextStyle(color: Colors.white),
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
                      '40 minutes ago',
                      style: TextStyle(color: Colors.white),
                    ),
                  ],
                ),
              ),

              //SizedBox(height: 5.0),
              const Divider(
                height: 3.0,
                thickness: 3.0,
                color: Color(0xFF589cb4),
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
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: const Text(
                          'Watch Dogs: Legion vs Watch Dogs 2',
                          softWrap: true,
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                    SizedBox(width: 5.0),
                    Container(
                      child: TextButton(
                        style: TextButton.styleFrom(
                            foregroundColor: Color(0xFFf89c34)),
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
                  ],
                ),
              ),

              //SizedBox(height: 5.0),
              const Divider(
                height: 3.0,
                thickness: 3.0,
                color: Color(0xFF589cb4),
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
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: const Text(
                          'Disco Elysium x Death note fan-fiction recommendations?',
                          softWrap: true,
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                    SizedBox(width: 5.0),
                    Container(
                      child: TextButton(
                        style:
                            TextButton.styleFrom(foregroundColor: Colors.black),
                        onPressed: () {},
                        child: const Text(
                          '@kardelen',
                          style: TextStyle(color: Color(0xFFf89c34)),
                        ),
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
                  style: TextStyle(color: Colors.white),
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
                      '10 days ago',
                      style: TextStyle(color: Colors.white),
                    ),
                  ],
                ),
              ),

              //SizedBox(height: 5.0),
              const Divider(
                height: 3.0,
                thickness: 3.0,
                color: Color(0xFF589cb4),
              ),
            ],
          ),
        ],
      ),
      bottomNavigationBar: Container(
          color: const Color(0xFF2f5b7a),
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
                  onPressed: () {
                     Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const CreateGamePage(key: null,),
                  ));
                  },
                  icon: const Icon(Icons.games)),
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
