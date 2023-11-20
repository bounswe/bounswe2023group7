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
    final response = await http
        .post(uri, body: body, headers: {'content-type': "application/json"});
    Map<String, dynamic> responseBody = jsonDecode(response.body);
    String? authToken = responseBody['accessToken'];
    (String?, int) res = (authToken, response.statusCode);
    return res;
  }

  Future<http.Response> signUp(
      String username, String email, String password) async {
    var uri = Uri.parse("$baseURL/user");
    final body = jsonEncode(<String, Object>{
      'username': username,
      'email': email,
      'password': password,
    });
    final response = await http
        .post(uri, body: body, headers: {'content-type': "application/json"});
    return response;
  }

  Future<http.Response> changePassword(
      String oldPassword, String newPassword, String? authToken) async {
    var uri = Uri.parse("$baseURL/user/change-password");
    final body = jsonEncode(<String, Object>{
      'oldPassword': oldPassword,
      'newPassword': newPassword
    });
    final response = await http.put(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> createGame(
      String title,
      String coverLink,
      String systemRequirements,
      List<String> predecessors,
      List<String> successors,
      String gameGuide,
      String gameStory,
      List<String> platforms,
      String ageRestriction,
      String gameBio,
      List<String> tags,
      String releaseDate,
      String developer,
      String publisher,
      String trivia) async {
    var uri = Uri.parse("$baseURL/game");
    final body = jsonEncode(<String, Object>{
      'title': title,
      'coverLink': coverLink,
      'systemRequirements': systemRequirements,
      'predecessors': predecessors,
      'successors': successors,
      'gameGuide': gameGuide,
      'gameStory': gameStory,
      'platforms': platforms,
      'ageRestriction': ageRestriction,
      'gameBio': gameBio,
      'tags': tags,
      'releaseDate': releaseDate,
      'developer': developer,
      'publisher': publisher,
      'trivia': trivia,
    });
    final response = await http
        .post(uri, body: body, headers: {'content-type': "application/json"});
    return response;
  }

  Future<http.Response> resetPassword(String email) async {
    var uri = Uri.parse("$baseURL/user/reset-password");
    final body = jsonEncode(<String, Object>{
      'email': email,
    });
    final response = await http
        .post(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }

  Future<http.Response> verifyCode(
      String email, String code, String newPassword) async {
    var uri = Uri.parse("$baseURL/user/verify-code");
    final body = jsonEncode(<String, Object>{
      'code': code,
      'email': email,
      'newPassword': newPassword,
    });
    final response = await http
        .post(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }

  Future<http.Response> listGames() async {
    var uri = Uri.parse("$baseURL/game?limit=10");
    final response =
        await http.get(uri, headers: {'content-type': "application/json"});

    return response;
  }

  Future<http.Response> getGame(String id) async {
    var uri = Uri.parse("$baseURL/game/$id");
    final response =
        await http.get(uri, headers: {'content-type': "application/json"});

    return response;
  }
}
