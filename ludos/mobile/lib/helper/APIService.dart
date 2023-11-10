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

  
  Future<http.Response> createGame(String title, String coverLink, 
  String systemRequirements, List<String> predecessors, List<String> successors, 
  String gameGuide, String gameStory, List<String> platforms, String ageRestriction, 
  String gameBio, List<String> tags, String releaseDate, String developer, 
  String publisher, String trivia) async {
    var uri = Uri.parse("$baseURL/game");
    final body = jsonEncode(<String, Object>{
      'title': title,
      'coverLink': coverLink,
      'systemRequirements':systemRequirements,
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
    final response = await http.post(uri, body: body, headers: {'content-type': "application/json"});

    return response;
  }
}
