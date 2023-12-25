import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:provider/provider.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';
import 'main.dart';

class ChangePassword extends StatefulWidget {
  const ChangePassword({super.key});

  @override
  State<ChangePassword> createState() => _ChangePasswordState();
}
class _ChangePasswordState extends State<ChangePassword> {
  final TextEditingController oldPasswordController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();
  bool obscureText1 = true;
  bool obscureText2 = true;
  bool obscureText3 = true;
  String newPassword = '';
  String confirmNewPassword = '';

  @override
  Widget build(BuildContext context) {
    var userProvider = Provider.of<UserProvider>(context);

    return  WillPopScope(
        onWillPop: () async {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home()));
      return false;
    },
    child: Scaffold(
      backgroundColor: const Color(0xFF101c2c),
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Change Password'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            const SizedBox(height: 10),
            const Text(
              'Please enter your current password and new password.',
              style: TextStyle(
                color: MyColors.red,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              style: const TextStyle(color: MyColors.white),
              controller: oldPasswordController,
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
                labelText: 'Old Password',
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
            TextField(
              style: const TextStyle(color: MyColors.white),
              controller: newPasswordController,
              onChanged: (value) {
                setState(() {
                  newPassword = value;
                });
              },
              obscureText: obscureText2,
              decoration: InputDecoration(
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
            TextField(
              style: const TextStyle(color: MyColors.white),
              onChanged: (value) {
                setState(() {
                  confirmNewPassword = value;
                });
              },
              obscureText: obscureText3,
              decoration: InputDecoration(
                labelText: 'Type New Password Again',
                labelStyle: const TextStyle(
                    color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                suffixIcon: IconButton(
                  icon: Icon(
                      obscureText3 ? Icons.visibility : Icons.visibility_off),
                  onPressed: () {
                    setState(() {
                      obscureText3 = !obscureText3;
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
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFf89c34),
                  shape: const StadiumBorder()),
              onPressed: () async {
                if (newPassword == confirmNewPassword) {
                  http.Response token = await APIService()
                      .changePassword(
                      oldPasswordController.text, newPasswordController.text,userProvider.token);
                  int status = token.statusCode;
                  if (status == 200) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                          content: Text(
                              'The password successfully changed!')),
                    );
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => (Home()),
                    ));
                  }
                  if (status == 400) {
                    ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text(
                                'The new password cannot be the old password!')),
                    );
                  }
                  if (status == 401) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text(
                                'The old password is incorrect!')),
                      );
                  }
                }
                else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                        content: Text(
                            'The passwords are not match!')),
                  );
                }
              }
              ,
              child: const Text('Change Password',
                style: TextStyle(color: MyColors.darkBlue)),
            ),
          ],
        ),
      ),
    ),
    );
  }
}