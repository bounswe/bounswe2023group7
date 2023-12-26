import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:ludos_mobile_app/user_profile_page.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import 'helper/APIService.dart';
import 'helper/colors.dart';


class EditProfilePage extends StatefulWidget {
  final Map<String, dynamic> userData;
  const EditProfilePage({Key? key, required this.userData}) : super(key: key);
  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  bool isNotificationEnabledController = true;
  final TextEditingController fullNameController = TextEditingController();
  final TextEditingController avatarController = TextEditingController();
  final TextEditingController aboutMeController = TextEditingController();
  final TextEditingController steamUrlController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    Future<void> _pickImage() async {
      final picker = ImagePicker();
      final pickedFile = await picker.pickImage(source: ImageSource.gallery);

      if (pickedFile != null) {
        setState(() {
          // Update the avatarController text with the selected image path
          avatarController.text = pickedFile.path;
        });
      }
    }
    var userProvider = Provider.of<UserProvider>(context);
    Map<String, dynamic> userData = widget.userData;
    return Scaffold(
        backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: MyColors.darkBlue,
        title: const Text('Edit Profile'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(

                style: const TextStyle(color: MyColors.white),
                controller: fullNameController,

                decoration:   InputDecoration(
                  fillColor: MyColors.white,
                  prefixIcon: const Icon(Icons.text_format_outlined),
                  labelText: 'Full Name',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                      BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                  hintText: userData['fullName'],
                  hintStyle: TextStyle(color: MyColors.lightBlue.withOpacity(0.7)),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 20),

              TextField(
                style: const TextStyle(color: MyColors.white),
                controller: avatarController,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.account_circle),
                  suffixIcon: IconButton(
                    onPressed: _pickImage,
                    icon: const Icon(Icons.cloud_upload),
                    color: MyColors.lightBlue,
                  ),
                  labelText: 'Avatar',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                      BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                  hintText: userData['avatar'],
                  hintStyle: TextStyle(color: MyColors.lightBlue.withOpacity(0.7)),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 20),
              TextField(
                style: const TextStyle(color: MyColors.white),
                controller: aboutMeController,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.comment),
                  labelText: 'About Me',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                      BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                  hintText: userData['aboutMe'],
                  hintStyle: TextStyle(color: MyColors.lightBlue.withOpacity(0.7)),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 20),
              TextField(
                style: const TextStyle(color: MyColors.white),
                controller: steamUrlController,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.videogame_asset),
                  labelText: 'Steam Url',
                  labelStyle: const TextStyle(
                      color: MyColors.lightBlue, fontWeight: FontWeight.bold),
                  prefixIconColor: MyColors.lightBlue,
                  border: const UnderlineInputBorder(
                      borderSide:
                      BorderSide(color: MyColors.lightBlue, width: 2.0)),
                  focusedBorder: const UnderlineInputBorder(
                    borderSide:
                    BorderSide(color: MyColors.lightBlue, width: 2.0),
                  ),
                  hintText: userData['steamUrl'],
                  hintStyle: TextStyle(color: MyColors.lightBlue.withOpacity(0.7)),
                ),
                cursorColor: MyColors.lightBlue,
              ),
              const SizedBox(height: 16.0),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children:[
                      const Text('Notifications',
                          style: TextStyle(
                              color: MyColors.lightBlue,
                              fontWeight: FontWeight.bold
                          )
                      ),
                      Switch(
                        value: isNotificationEnabledController,
                        onChanged: (value) {
                          setState(() {
                            isNotificationEnabledController = value;
                          });
                        },
                      ),
              ]

                  ),

                  ElevatedButton(
                    onPressed: () async {
                      if(fullNameController.text == ""){
                        fullNameController.text = userData['fullName'];
                      }
                      if(avatarController.text == ""){
                        avatarController.text = userData['avatar'];
                      }
                      if(aboutMeController.text == ""){
                        aboutMeController.text = userData['fullName'];
                      }
                      if(steamUrlController.text == ""){
                        steamUrlController.text = userData['steamUrl'];
                      }
                      http.Response token = await APIService()
                          .editProfile(
                          userProvider.token, fullNameController.text, isNotificationEnabledController, avatarController.text, aboutMeController.text, steamUrlController.text);
                      int status = token.statusCode;
                      if (status == 200) {
                        ScaffoldMessenger.of(context)
                            .showSnackBar(
                            SnackBar(
                              content: const Row(
                                children: [
                                  Icon(
                                    Icons.check_circle_outline,
                                    color: MyColors.blue,
                                  ),
                                  SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      'Your profile is updated successfully. You will be redirected to the your profile.',
                                      style: TextStyle(
                                        color: MyColors.blue,
                                        fontSize: 16,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              backgroundColor: MyColors.blue2,
                              duration: const Duration(seconds: 5),
                              action: SnackBarAction(
                                label: 'OK',
                                textColor: MyColors.blue,
                                onPressed: () {
                                  ScaffoldMessenger.of(context)
                                      .hideCurrentSnackBar();
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => UserProfilePage(id: userProvider.username,userProvider: userProvider),
                                      ));
                                },
                              ),
                            ),
                          )
                          .closed
                          .then((reason) => Navigator.push(
                          context,
                          MaterialPageRoute(
                          builder: (context) => UserProfilePage(id: userProvider.username,userProvider: userProvider))
                          ));

                      }else {
                      CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
                      }

                    },
                    child: const Text('Save'),
                  ),

                ],
              )

            ],
          ),
        ),
      ),
    );
  }
}
