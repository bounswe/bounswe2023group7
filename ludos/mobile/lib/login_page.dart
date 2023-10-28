import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'sign_up_page.dart';
import 'forgot_password.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF6b415e),
      appBar: AppBar(
        backgroundColor: const Color(0xFF5f1a37),
        title: const Text('Login Page'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  labelStyle: TextStyle(
                      color: Color.fromARGB(255, 219, 184, 199),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: const Color(0xFF5f1a37), width: 2.0),
                  ),
                ),
                cursorColor: const Color(0xFF5f1a37),
              ),
              const SizedBox(height: 20),
              const TextField(
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Password',
                  labelStyle: TextStyle(
                      color: Color.fromARGB(255, 219, 184, 199),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: const Color(0xFF5f1a37), width: 2.0),
                  ),
                ),
                cursorColor: const Color(0xFF5f1a37),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF5f1a37)),
                onPressed: () {
                  // Perform login logic here (not included in this example).
                  // You can add your authentication logic to validate the email and password.
                },
                child: const Text('Login'),
              ),
              TextButton(
                style: TextButton.styleFrom(
                    backgroundColor: const Color(0xFF6b415e)),
                onPressed: () {
                  // Navigate to the sign-up page when the button is pressed.
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const ForgotPassword(),
                  ));
                },
                child: const Text(
                  'Forgot password ?',
                  style: TextStyle(color: Colors.black),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                      iconSize: 50,
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(FontAwesomeIcons.facebook, size: 40.0)),
                  IconButton(
                      iconSize: 50,
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(FontAwesomeIcons.instagram, size: 40.0)),
                  IconButton(
                      iconSize: 50,
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(FontAwesomeIcons.google, size: 40.0)),
                ],
              ),
              const SizedBox(height: 20),
              //const SizedBox(height: 10),
              TextButton(
                style: TextButton.styleFrom(
                    backgroundColor: const Color(0xFF5f1a37)),
                onPressed: () {
                  // Navigate to the sign-up page when the button is pressed.
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => SignUpPage(),
                  ));
                },
                child: const Text(
                  'Create an account',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}