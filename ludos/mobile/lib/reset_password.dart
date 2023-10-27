import 'dart:async';
import 'package:flutter/material.dart';
import 'login_page.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {

  int countdown = 3;
  late Timer timer;
  bool obscureText1 = true;
  bool obscureText2 = true;
  String newPassword = '';
  String confirmNewPassword = '';
  String response = '';

  @override
  void initState() {
    super.initState();
  }

    void startCountdown() {
      // Start the countdown when the page is loaded.
      timer = Timer.periodic(const Duration(seconds: 3), (timer) {
        if (countdown > 0) {
          setState(() {
            countdown = countdown - 1;
            response =
            'Password updated successfully! You will be directed to login page in $countdown seconds...';
          });
        } else {
          // When the countdown reaches 0, navigate to the Sign-Up page.
          _navigateToLoginPage(context);
        }
      });
  }

  @override
  void dispose() {
    timer?.cancel(); // Don't forget to cancel the timer to avoid memory leaks.
    super.dispose();
  }

  void _navigateToLoginPage(BuildContext context) {
      if (timer != null) {
        timer!.cancel(); // Cancel the timer if it's running
      }
      // Navigate to the Sign-Up page after a 2-second delay.
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => LoginPage()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF6b415e),
      appBar: AppBar(
        backgroundColor: const Color(0xFF5f1a37),
        title: const Text('Forgot Password'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            const Text(
              'Please enter your new password.',
              style: TextStyle(
                color: Colors.white60,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              onChanged: (value) {
                setState(() {
                  newPassword = value;
                });
              },
              obscureText: obscureText1,
              decoration: InputDecoration(
                suffixIcon: IconButton(
                  icon: Icon(obscureText1 ? Icons.visibility : Icons.visibility_off),
                  onPressed: () {
                    setState(() {
                      obscureText1 = !obscureText1;
                    });
                  },
                  color: Colors.white,
                ),
                labelText: 'New Password',
                labelStyle: const TextStyle(
                    fontStyle: FontStyle.italic,
                    fontSize: 15,
                    color: Color.fromARGB(255, 219, 184, 199),
                    fontWeight: FontWeight.bold),
                focusedBorder: const UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF5f1a37), width: 2.0),
                ),
              ),
              cursorColor: const Color(0xFF5f1a37),
            ),
            const SizedBox(height: 20),
            TextField(
              onChanged: (value) {
                setState(() {
                  confirmNewPassword = value;
                });
              },
              obscureText: obscureText2,
              decoration: InputDecoration(
                labelText: 'Type New Password Again',
                suffixIcon: IconButton(
                  icon: Icon(obscureText2 ? Icons.visibility : Icons.visibility_off),
                  onPressed: () {
                    setState(() {
                      obscureText2 = !obscureText2;
                    });
                  },
                  color: Colors.white,
                ),
                labelStyle: const TextStyle(
                    fontStyle: FontStyle.italic,
                    fontSize: 15,
                    color: Color.fromARGB(255, 219, 184, 199),
                    fontWeight: FontWeight.bold),
                focusedBorder: const UnderlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF5f1a37), width: 2.0),
                ),
              ),
              cursorColor: const Color(0xFF5f1a37),
            ),
            const SizedBox(height: 20),
            Text(
              response,
              style: const TextStyle(
                color: Colors.white60,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF5f1a37)),
              onPressed: () {
                // Logic for checking equality of newPassword and confirmNewPassword
                // If they are equal, then update the password in the database
                // else, show an error message
                if(newPassword == confirmNewPassword){
                  // make http request to update password
                  // assign response type to the response variable
                  // if response is successful, then navigate to login page
                  // else, show an error message
                  startCountdown();
             /*     setState(() {
                    response = 'Password updated successfully! You will be directed to login page in $countdown seconds...';
                    //print(response);
                  });
                  */
                }
                else{
                  setState(() {
                    response = 'Passwords do not match!';
                    //print(response);
                  });
                }
              },
              child: const Text('Reset Password'),
            ),
          ],
        ),
      ),
    );
  }
}
