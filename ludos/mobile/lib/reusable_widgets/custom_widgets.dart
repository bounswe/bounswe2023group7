import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/userProvider.dart';

import '../forum_page.dart';
import '../helper/APIService.dart';
import '../helper/colors.dart';
import '../login_page.dart';
import '../thread_page.dart';

class CustomWidgets{
  CustomWidgets._();

  static needLoginSnackbar(BuildContext context, String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(
        SnackBar(
          content: Row(
            children: [
              Icon(Icons.error, color: MyColors.blue),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  message,
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
            label: 'Log In',
            textColor: MyColors.blue,
            onPressed: () {
              ScaffoldMessenger.of(context)
                  .hideCurrentSnackBar();
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => LoginPage()),
              );
            },
          ),
        ),
    );
  }

  static statusNotOkay(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: Text(
            message,
            style: const TextStyle(
              color: MyColors.blue,
              fontSize: 16,
            ),
          ),
        ),
        backgroundColor: MyColors.blue2,
        duration: const Duration(seconds: 10),
        action: SnackBarAction(
          label: 'OK',
          textColor: MyColors.blue,
          onPressed: () {
            ScaffoldMessenger.of(context)
                .hideCurrentSnackBar();
          },
        ),
      ),
    );
  }

  static deleteConfirmDialogThread(UserProvider userProvider, BuildContext context, String gameId, String type, String id){
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            backgroundColor: MyColors.darkBlue,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(
                  20.0,
                ),
              ),
            ),
            contentPadding: EdgeInsets.only(
              top: 10.0,
            ),
            title: Text(
              "Delete ${type}?",
              style: TextStyle(fontSize: 20.0, color: MyColors.white),
            ),
            content: Container(
              height: 120,
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        "Your ${type} will be deleted permanently.",
                        style: TextStyle(fontSize: 15, color: MyColors.white),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      height: 60,
                      padding: const EdgeInsets.all(8.0),
                      child: ElevatedButton(
                        onPressed: () async {
                          http.Response token = await APIService().deleteThread(
                              id,
                              userProvider.token,
                          );
                          if (token.statusCode == 200) {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                builder: (context) => ForumPage(token: userProvider.token, userProvider: userProvider, gameid: gameId)
                              ));
                          } else {
                            Navigator.of(context).pop();
                            CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.orange,
                        ),
                        child: const Text(
                          "Delete",
                          style: TextStyle(
                            color: MyColors.white
                          )
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        });
  }

  static deleteConfirmDialogComment(UserProvider userProvider, BuildContext context, String threadId, String id){
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            backgroundColor: MyColors.darkBlue,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(
                  20.0,
                ),
              ),
            ),
            contentPadding: EdgeInsets.only(
              top: 10.0,
            ),
            title: Text(
              "Delete comment?",
              style: TextStyle(fontSize: 20.0, color: MyColors.white),
            ),
            content: Container(
              height: 120,
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        "Your comment will be deleted permanently.",
                        style: TextStyle(fontSize: 15, color: MyColors.white),
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      height: 60,
                      padding: const EdgeInsets.all(8.0),
                      child: ElevatedButton(
                        onPressed: () async {
                          http.Response token = await APIService().deleteComment(
                            id,
                            userProvider.token,
                          );
                          if (token.statusCode == 200) {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => ThreadPage(token: userProvider.token, userProvider: userProvider, threadId: threadId)
                                ));
                          } else {
                            Navigator.of(context).pop();
                            CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.orange,
                        ),
                        child: const Text(
                            "Delete",
                            style: TextStyle(
                                color: MyColors.white
                            )
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        });
  }

}
