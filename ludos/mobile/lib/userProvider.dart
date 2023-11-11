import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  bool _isLoggedIn = false;
  String _username = '';
  String? _token = '';

  bool get isLoggedIn => _isLoggedIn;
  String get username => _username;
  String? get token => _token;

  void setLoggedIn(bool value, String username, String? token) {
    _isLoggedIn = value;
    _username = username;
    _token = token;
    notifyListeners();
  }
}
