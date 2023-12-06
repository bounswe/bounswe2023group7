import 'package:flutter/material.dart';

import '../helper/colors.dart';
import '../login_page.dart';

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
}
