import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  bool _isLoggedIn = false;
  String _username = '';

  bool get isLoggedIn => _isLoggedIn;
  String get username => _username;

  void setLoggedIn(bool value, String username) {
    _isLoggedIn = value;
    _username = username;
    notifyListeners();
  }
}
