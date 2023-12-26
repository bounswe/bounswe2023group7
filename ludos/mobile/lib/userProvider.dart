import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  bool _isLoggedIn = false;
  String _username = '';
  String? _token = '';
  String _userType = '';

  bool get isLoggedIn => _isLoggedIn;
  String get username => _username;
  String? get token => _token;
  String get userType => _userType;


  UserProvider setLoggedIn(bool value, String username, String? token, String userType) {
    _isLoggedIn = value;
    _username = username;
    _token = token;
    _userType = userType;
    notifyListeners();
    return this;
  }
}
