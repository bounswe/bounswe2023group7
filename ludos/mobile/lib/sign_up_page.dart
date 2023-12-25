import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/login_page.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/APIService.dart';
import 'package:http/http.dart' as http;

class SignUpPage extends StatefulWidget {
  final UserProvider userProvider;

  const SignUpPage({Key? key, required this.userProvider})
      : super(key: key);
  @override
  SignUpPageState createState() => SignUpPageState();
}

class SignUpPageState extends State<SignUpPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: MyColors.darkBlue,
        appBar: AppBar(
          backgroundColor: MyColors.orange,
          title: const Text('Create An Account'),
        ),
        body: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(
                width: 100.0,
                height: 100.0,
                child: Image.asset('assets/images/ludos_transparent.png'),
              ),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                controller: usernameController,
                decoration: const InputDecoration(
                  icon: Icon(
                    Icons.person_2_sharp,
                    color: MyColors.lightBlue,
                  ),
                  labelText: 'Username',
                  labelStyle: TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                controller: emailController,
                decoration: const InputDecoration(
                  icon: Icon(
                    Icons.email,
                    color: MyColors.lightBlue,
                  ),
                  labelText: 'Email',
                  labelStyle: TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                        BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: MyColors.white),
                controller: passwordController,
                obscureText: _isObscure,
                decoration: InputDecoration(
                  icon: const Icon(
                    Icons.lock,
                    color: MyColors.lightBlue,
                  ),
                  labelText: 'Password',
                  labelStyle: const TextStyle(
                    color: MyColors.lightBlue,
                    fontWeight: FontWeight.bold,
                  ),
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
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.orange,
                    shape: const StadiumBorder()),
                onPressed: () async {
                  http.Response token = await APIService().signUp(
                      usernameController.text,
                      emailController.text,
                      passwordController.text);
                  int status = token.statusCode;
                  if (status == 200) {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => (LoginPage(userProvider: widget.userProvider)),
                    ));
                  }
                  if (status == 409) {
                    if (token.body.contains("email")) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('The email address has an account!')),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('The username already taken!')),
                      );
                    }
                  }
                  if (status == 400) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                          content: Text(
                              'Could not sign-up. Check your information.')),
                    );
                  }
                },
                child: const Text("Sign Up",
                    style: TextStyle(color: MyColors.darkBlue)),
              )
            ],
          ),
        ));
  }
}
