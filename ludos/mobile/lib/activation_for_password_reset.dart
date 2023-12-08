import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'helper/colors.dart';
import 'dart:async';
import 'login_page.dart';
import 'helper/APIService.dart';

class EnterActivation extends StatefulWidget {
  final String email;
  const EnterActivation({Key? key, required this.email}) : super(key: key);

  @override
  State<EnterActivation> createState() => _EnterActivationState();
}

class _EnterActivationState extends State<EnterActivation> {
  int countdown = 3;
  Timer? timer;
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
    timer?.cancel(); // Cancel the timer if it's still active.
    // Navigate to the Sign-Up page after a 2-second delay.
    Navigator.of(context)
        .pushReplacement(MaterialPageRoute(builder: (context) => LoginPage()));
  }

  String activationCode = '';
  String responseForActivationCode =
      "message indicates whether activation code is valid or not";
  final TextEditingController codeController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();
  final TextEditingController secondController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text(
          'Forgot Password',
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            //crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              const SizedBox(height: 20),
              const Text(
                'Please enter the activation code sent to your email address.',
                style: TextStyle(
                  color: MyColors.red,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                onChanged: (value) {
                  setState(() {
                    activationCode = value;
                    //print(activationCode);
                  });
                },
                controller: codeController,
                decoration: const InputDecoration(
                  labelText: 'Activation Code',
                  labelStyle: TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIcon: Icon(Icons.code),
                  prefixIconColor: MyColors.lightBlue,
                  border: UnderlineInputBorder(
                      borderSide:
                          BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 25),
              const Text(
                'Please enter your new password.',
                style: TextStyle(
                  color: MyColors.red,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                onChanged: (value) {
                  setState(() {
                    newPassword = value;
                  });
                },
                controller: newPasswordController,
                obscureText: obscureText1,
                decoration: InputDecoration(
                  suffixIcon: IconButton(
                    icon: Icon(
                        obscureText1 ? Icons.visibility : Icons.visibility_off),
                    onPressed: () {
                      setState(() {
                        obscureText1 = !obscureText1;
                      });
                    },
                    color: MyColors.lightBlue,
                  ),
                  labelText: 'New Password',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIcon: const Icon(Icons.password),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                          BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                onChanged: (value) {
                  setState(() {
                    confirmNewPassword = value;
                  });
                },
                controller: secondController,
                obscureText: obscureText2,
                decoration: InputDecoration(
                  labelText: 'Type New Password Again',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  suffixIcon: IconButton(
                    icon: Icon(
                        obscureText2 ? Icons.visibility : Icons.visibility_off),
                    onPressed: () {
                      setState(() {
                        obscureText2 = !obscureText2;
                      });
                    },
                    color: MyColors.lightBlue,
                  ),
                  prefixIcon: const Icon(Icons.password),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                          BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 20),
              Text(
                response,
                style: const TextStyle(
                  color: MyColors.red,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFf89c34),
                    shape: const StadiumBorder()),
                onPressed: () async {
                  // Logic for checking equality of newPassword and confirmNewPassword
                  // If they are equal, then update the password in the database
                  // else, show an error message
                  if (newPasswordController.text == secondController.text) {
                    http.Response token = await APIService().verifyCode(
                        widget.email,
                        codeController.text,
                        newPasswordController.text);
                    // make http request to update password
                    // assign response type to the response variable
                    // if response is successful, then navigate to login page
                    // else, show an error message
                    if (token.statusCode == 200) {
                      startCountdown();
                    } else {
                      CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
                    }

                    /*setState(() {
                    response = 'Password updated successfully! You will be directed to login page in $countdown seconds...';
                    //print(response);
                  });
                  */
                  } else {
                    CustomWidgets.statusNotOkay(context,  "Passwords do not match!");
                  }
                },
                child: const Text(
                  'Reset Password',
                  style: TextStyle(color: MyColors.darkBlue),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFf89c34),
                    shape: const StadiumBorder()),
                onPressed: () async {
                  // logic to resend activation code to email address
                  http.Response token =
                      await APIService().resetPassword(widget.email);
                },
                child: const Text(
                  'Resend Verification Code',
                  style: TextStyle(color: MyColors.darkBlue),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
