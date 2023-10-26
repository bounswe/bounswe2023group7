import 'package:flutter/material.dart';

class SignUpPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFF6b415e),
        appBar: AppBar(
          backgroundColor: const Color(0xFF5f1a37),
          title: const Text('Sign-Up Page'),
        ),
        body: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Username',
                  labelStyle: TextStyle(
                      color: Color.fromARGB(255, 219, 184, 199),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: Color(0xFF5f1a37), width: 2.0),
                  ),
                ),
                cursorColor: Color(0xFF5f1a37),
              ),
              const SizedBox(height: 20),
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  labelStyle: TextStyle(
                      color: Color.fromARGB(255, 219, 184, 199),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: Color(0xFF5f1a37), width: 2.0),
                  ),
                ),
                cursorColor: Color(0xFF5f1a37),
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
                  onPressed: () {},
                  child: const Text("Sign Up"))
            ],
          ),
        ));
  }
}