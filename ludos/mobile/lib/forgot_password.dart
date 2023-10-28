import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'activation_for_password_reset.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({super.key});

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {

  String emailAddress = '';
  String responseForEmail = "message indicates whether email address is valid or not";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF6b415e),
      appBar: AppBar(
        backgroundColor: const Color(0xFF5f1a37),
        title: const Text('Forgot Password'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget> [
              const Text(
                'Please enter your email address. You will receive a link to create a new password via email.',
                style: TextStyle(
                  color: Colors.grey,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                onChanged: (value){
                  setState(() {
                    emailAddress = value;
                  });
                },
                decoration: const InputDecoration(
                  labelText: 'Email',
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
                responseForEmail,
                style: const TextStyle(
                  color: Colors.grey,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 15),
              TextButton(
                style: TextButton.styleFrom(
                    backgroundColor: const Color(0xFF5f1a37)),
                  onPressed: (){
                  // Logic for sending http request to send activation code to email address
                    // by triggering corresponding API endpoint
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => (const EnterActivation())));

                    // Logic to set responseForEmail variable to the response from the API
                    // to check whether given input corresponds to a valid email address

                  },
                  child: const Text(
                    'Send Activation Code',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                        color: Colors.white,
                        ),),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
