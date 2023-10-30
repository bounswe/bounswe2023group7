import 'package:flutter/material.dart';
import 'main.dart';
import 'helper/APIService.dart';

class SignUpPage extends StatelessWidget {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFF101c2c),
        appBar: AppBar(
          backgroundColor: const Color(0xFFf89c34),
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
                 style: const TextStyle(color: Color(0xFFFDFDFF)),
                 controller: usernameController,
                 decoration: const InputDecoration(
                  icon: Icon(
                    Icons.person_2_sharp,
                    color: Color(0xFF40749c),
                  ),
                  labelText: 'Username',
                  labelStyle: TextStyle(
                      color: Color(0xFF40749c),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: Color(0xFF40749c), width: 2.0),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: Color(0xFFFDFDFF)),
                controller: emailController,
                decoration: const InputDecoration(
                  icon: Icon(
                    Icons.email,
                    color: Color(0xFF40749c),
                  ),
                  labelText: 'Email',
                  labelStyle: TextStyle(
                      color: Color(0xFF40749c),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: Color(0xFF40749c), width: 2.0),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                style: const TextStyle(color: Color(0xFFFDFDFF)),
                controller: passwordController,
                obscureText: true,
                decoration: const InputDecoration(
                  icon: Icon(
                    Icons.lock,
                    color: Color(0xFF40749c),
                  ),
                  labelText: 'Password',
                  labelStyle: TextStyle(
                      color: Color(0xFF40749c),
                      fontWeight: FontWeight.bold),
                  focusedBorder: UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: Color(0xFF40749c), width: 2.0),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFf89c34),
                      shape: const StadiumBorder()),
                  onPressed: () async {
                    int token = await APIService()
                        .signUp(usernameController.text, emailController.text, passwordController.text);
                    if (token == 200) {
                      // If logged-in successfully, go to the Home page
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => (Home()),
                      ));
                    }
                    if (token == 409) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text(
                                'The username already taken!')),
                      );
                    }
                    if (token == 400) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text(
                                'Could not sign-up. Check your information.')),
                      );
                    }
                  },
                  child: const Text("Sign Up",
                      style: TextStyle(
                          color: Color(0xFF101c2c))),
              )
            ],
          ),
        ));
  }
}