import 'dart:convert';

import 'package:flutter/material.dart';
import 'sign_up_page.dart';
import 'forgot_password.dart';
import 'main.dart';
import 'helper/colors.dart';
import 'helper/APIService.dart';
import 'package:provider/provider.dart';
import 'userProvider.dart';

class LoginPage extends StatefulWidget {

  final UserProvider userProvider;
  const LoginPage({Key? key, required this.userProvider})
      : super(key: key);
  @override
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  late Map<String, dynamic> userData = {};
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    return  WillPopScope(
        onWillPop: () async {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home(userProvider: widget.userProvider)));
      return false;
    },
    child: Scaffold(
      backgroundColor: MyColors.darkBlue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const SizedBox(height: 100),
              SizedBox(
                width: 100.0,
                height: 100.0,
                child: Image.asset('assets/images/ludos_transparent.png'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'Username',
                  labelStyle: TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIcon: Icon(Icons.person),
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
              const SizedBox(height: 20),
              TextFormField(
                controller: passwordController,
                obscureText: _isObscure,
                style: const TextStyle(color: MyColors.white),
                decoration: InputDecoration(
                  labelText: 'Password',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIcon: const Icon(Icons.lock),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                          BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _isObscure ? Icons.visibility_off : Icons.visibility,
                      color: MyColors.lightBlue,
                    ),
                    onPressed: () {
                      setState(() {
                        _isObscure = !_isObscure;
                      });
                    },
                  ),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.orange,
                    shape: const StadiumBorder()),
                onPressed: () async {
                  (String?, int) token = await APIService()
                      .login(emailController.text, passwordController.text);
                  if (token.$2 == 200) {
                    var userT = await APIService().userInfo(token.$1);
                    String typeOfUser = '';
                    if(userT.statusCode == 200){
                      userData = json.decode(userT.body);
                      typeOfUser = userData['userType'].toString();
                    }
                    var userProvider = Provider.of<UserProvider>(context, listen: false)
                        .setLoggedIn(true, emailController.text, token.$1, typeOfUser);

                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => Home(userProvider: userProvider),
                    ));
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                          content: Text(
                              'Could not log-in. Check your information.')),
                    );
                  }
                },
                child: const Text(
                  'Login',
                  style: TextStyle(color: MyColors.darkBlue),
                ),
              ),
              TextButton(
                style: TextButton.styleFrom(
                    backgroundColor: MyColors.orange,
                    shape: const StadiumBorder()),
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => ForgotPassword(userProvider: widget.userProvider,),
                  ));
                },
                child: const Text(
                  'Forgot password?',
                  style: TextStyle(color: MyColors.darkBlue),
                ),
              ),
              const SizedBox(height: 10),
              TextButton(
                style: TextButton.styleFrom(
                    backgroundColor: MyColors.orange,
                    shape: const StadiumBorder()),
                onPressed: () {
                  // Navigate to the sign-up page when the button is pressed.
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => SignUpPage(userProvider: widget.userProvider,),
                  ));
                },
                child: const Text(
                  'Create an account',
                  style: TextStyle(color: MyColors.darkBlue),
                ),
              ),
            ],
          ),
        ),
      ),
    ),
    );
  }
}
