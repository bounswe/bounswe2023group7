import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';


class APIService {

  var baseURL = "http://3.125.225.39:8080";

  Future<int> login(String username, String password) async {
    var uri = Uri.parse("$baseURL/user/login");

    final body = jsonEncode(<String, String>{
      'username': username,
      'password': password,
    });
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});

    return response.statusCode;
  }

  Future<http.Response> signUp(String username, String email, String password) async {
    var uri = Uri.parse("$baseURL/user");
    final body = jsonEncode(<String, Object>{
      'username': username,
      'email': email,
      'password': password,
    });
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }

   Future<http.Response> resetPassword(String email) async {
    var uri = Uri.parse("$baseURL/user/reset-password");
    final body = jsonEncode(<String, Object>{
      'email': email,
    });
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }

    Future<http.Response> verifyCode(String email, String code, String newPassword) async {
    var uri = Uri.parse("$baseURL/user/verify-code");
    final body = jsonEncode(<String, Object>{
      'code': code,
      'email': email,
      'newPassword': newPassword,
    });
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }

    Future<http.Response> changePassword(String newPassword, String oldPassword) async {
    var uri = Uri.parse("$baseURL/user/change-password");
    final body = jsonEncode(<String, Object>{
      'newPassword': newPassword,
      'oldPassword': oldPassword,
    });
    final response = await http.put(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }

}
