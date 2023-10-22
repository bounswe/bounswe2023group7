import 'package:flutter/material.dart';

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
                            'Take-Two Boss Supportive of Microsoft-Activision Deal: Whats Good for Them Is Good for the Industry',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          onPressed: () {},
                          child: Text('@Kat Baıley'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'As Microsoft continues in its efforts to acquire Activision Blizzard and multiple regulators make their decisions on the deal,',
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
                          onPressed: () {},
                          child: Text(
                            'Take-Two Boss Supportive of Microsoft-Activision Deal: Whats Good for Them Is Good for the Industry',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          onPressed: () {},
                          child: Text('@Kat Baıley'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'As Microsoft continues in its efforts to acquire Activision Blizzard and multiple regulators make their decisions on the deal,',
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
                          onPressed: () {},
                          child: Text(
                            'Take-Two Boss Supportive of Microsoft-Activision Deal: Whats Good for Them Is Good for the Industry',
                            softWrap: true,
                          ),
                        ),

                      ),
                      SizedBox(width: 5.0),
                      Container(
                        child: TextButton(
                          onPressed: () {},
                          child: Text('@Kat Baıley'),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(15.0),
                  child: const Text(
                    'As Microsoft continues in its efforts to acquire Activision Blizzard and multiple regulators make their decisions on the deal,',
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

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF6b415e),
      appBar: AppBar(
        backgroundColor: const Color(0xFF5f1a37),
        title: const Text('Login Page'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const TextField(
              decoration: InputDecoration(labelText: 'Email'),
            ),
            const SizedBox(height: 20),
            const TextField(
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Perform login logic here (not included in this example).
                // You can add your authentication logic to validate the email and password.
              },
              child: Text('Login'),
            ),
            SizedBox(height: 20),
            TextButton(
              onPressed: () {
                // Navigate to the sign-up page when the button is pressed.
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => SignUpPage(),
                ));
              },
              child: const Text('Create an account'),
            ),
          ],
        ),
      ),
    );
  }
}

class SignUpPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign-Up Page'),
      ),
      body: const Center(
        child: Text('Sign up for a new account here.'),
      ),
    );
  }
}


