import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'activation_for_password_reset.dart';
import 'helper/colors.dart';
import 'helper/APIService.dart';

class ForgotPassword extends StatefulWidget {
  final UserProvider userProvider;

  const ForgotPassword({Key? key, required this.userProvider})
      : super(key: key);
  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  final TextEditingController emailController = TextEditingController();

  String emailAddress = '';
  //message indicates whether email address is valid or not
  String responseForEmail = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Forgot Password'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'Please enter your email address. You will receive a link to create a new password via email.',
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
                    emailAddress = value;
                  });
                },
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'Email',
                  labelStyle: TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIcon: Icon(Icons.mail),
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
                responseForEmail,
                style: const TextStyle(
                  color: Color(0xFFFDFDFF),
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 15),
              TextButton(
                style: TextButton.styleFrom(
                  backgroundColor: const Color(0xFFf89c34),
                  shape: const StadiumBorder(),
                ),
                onPressed: () async {
                  http.Response token =
                      await APIService().resetPassword(emailController.text);
                  // Logic for sending http request to send activation code to email address
                  // by triggering corresponding API endpoint
                  if (token.statusCode == 200) {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => (EnterActivation(
                              email: emailController.text,
                          userProvider: widget.userProvider,
                            ))));
                  } else {
                    CustomWidgets.statusNotOkay(context, "No user found with this email");
                  }
                  print(token.body);
                  // Logic to set responseForEmail variable to the response from the API
                  // to check whether given input corresponds to a valid email address
                },
                child: const Text(
                  'Send Activation Code',
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
