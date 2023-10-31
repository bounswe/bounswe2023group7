import 'package:flutter/material.dart';
import 'helper/colors.dart';
import 'reset_password.dart';

class EnterActivation extends StatefulWidget {
  const EnterActivation({super.key});

  @override
  State<EnterActivation> createState() => _EnterActivationState();
}

class _EnterActivationState extends State<EnterActivation> {
  String activationCode = '';
  String responseForActivationCode = "message indicates whether activation code is valid or not";
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
                  TextField(
                    style: const TextStyle(color: MyColors.white),
                    onChanged: (value) {
                      setState(() {
                        activationCode = value;
                        //print(activationCode);
                      });
                    },
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
                  Text(
                   responseForActivationCode,
                      style: const TextStyle(
                        color: MyColors.red,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                  ),
                  const SizedBox(height: 40),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFf89c34),
                        shape: const StadiumBorder()
                    ),
                    onPressed: () {
                      // logic to compare activation code with the one sent to the email address
                      // also responseForActivationCode should be updated accordingly
                      // if activation code is valid, then navigate to reset password page

                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => (const ResetPassword())));

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
                        shape: const StadiumBorder()
                    ),
                    onPressed: () {
                      // logic to resend activation code to email address
                    },
                    child: const Text('Resend Verification Code',
                        style: TextStyle(color: MyColors.darkBlue),),
                  ),
                ],
              ),
          ),
      ),
      );
  }
}
