import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';


class APIService {
  var baseURL = "http://3.125.225.39:8080";
  Future<(String?, int)> login(String username, String password) async {
    var uri = Uri.parse("$baseURL/user/login");

    final body = jsonEncode(<String, String>{
      'username': username,
      'password': password,
    });
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});
    Map<String, dynamic> responseBody = jsonDecode(response.body);
    String? authToken = responseBody['accessToken'];
    (String?, int) res = (authToken,response.statusCode);
    return res;
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

  Future<http.Response> changePassword(String oldPassword, String newPassword, String? authToken) async {
    var uri = Uri.parse("$baseURL/user/change-password");
    final body = jsonEncode(<String, Object>{
      'oldPassword': oldPassword,
      'newPassword': newPassword
    });
    final response = await http.put(uri, body: body, headers: {'content-type': "application/json", 'Authorization': 'Bearer $authToken'});
    return response;
  }
}
