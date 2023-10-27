import 'package:flutter/material.dart';
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
      backgroundColor: const Color(0xFF6b415e),
      appBar: AppBar(
        backgroundColor: const Color(0xFF5f1a37),
        title: const Text('Forgot Password'),
      ),
      body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              //crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                const Text(
                  'Please enter the activation code sent to your email address.',
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
                      activationCode = value;
                      //print(activationCode);
                    });
                  },
                  decoration: const InputDecoration(
                    labelText: 'Activation Code',
                    labelStyle: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontSize: 15,
                        color: Color.fromARGB(255, 219, 184, 199),
                        fontWeight: FontWeight.bold),
                    focusedBorder: UnderlineInputBorder(
                      borderSide:
                          BorderSide(color: Color(0xFF5f1a37), width: 2.0),
                    ),
                  ),
                  cursorColor: const Color(0xFF5f1a37),
                ),
                const SizedBox(height: 25),
                Text(
                 responseForActivationCode,
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
                    // logic to compare activation code with the one sent to the email address
                    // also responseForActivationCode should be updated accordingly
                    // if activation code is valid, then navigate to reset password page

                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => (const ResetPassword())));

                  },
                  child: const Text('Reset Password'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF5f1a37)),
                  onPressed: () {
                    // logic to resend activation code to email address
                  },
                  child: const Text('Resend Verification Code'),
                ),
              ],
            ),
        ),
      );
  }
}
