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

  Future<int> signUp(String username, String email, String password) async {
    var uri = Uri.parse("$baseURL/user");
    final body = jsonEncode(<String, Object>{
      'username': username,
      'email': email,
      'password': password,
    });
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});

    return response.statusCode;
  }
}
