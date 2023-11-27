import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

class APIService {
  var baseURL = "http://3.125.225.39:8080";
  String? token = "";
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
    token = authToken;
    print("token");
    print(token);
    print("token");
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
      String? authToken,
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
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }

  Future<http.Response> createThread(
      String? authToken,
      String title,
      String content,
      List<String> media,
      List<String> tags,
      String gameid) async {
    var uri = Uri.parse("$baseURL/post");
    final body = jsonEncode(<String, Object>{
      'title': title,
      'body': content,
      'gameId': gameid,
      'media': media,
      'tags': tags,
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

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

  Future<http.Response> listGames(String? authToken, {String limit = "20"}) async {
    var uri = Uri.parse("$baseURL/game?limit=$limit");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }

  Future<http.Response> listSearchedGames(String? authToken, String? searchKey, {String limit = "20"}) async {
    String searchQueryParam = searchKey != null ? "searchKey=$searchKey" : "";
    var uri = Uri.parse("$baseURL/game?$searchQueryParam");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> listThreads(String gameId, String? authToken) async {
    var uri = Uri.parse("$baseURL/post?gameId=$gameId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to load threads');
    }
  }

  Future<http.Response> followGame(String? authToken, String gameID) async {
    var uri = Uri.parse("$baseURL/game/follow/$gameID");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> unfollowGame(String? authToken, String gameID) async {
    var uri = Uri.parse("$baseURL/game/unfollow/$gameID");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> userInfo(String? authToken) async {
    var uri = Uri.parse("$baseURL/user/info");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }
  Future<http.Response> userById(String? authToken, String userID) async {
    var uri = Uri.parse("$baseURL/user/byId/$userID");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<Map<String, dynamic>> getGame(String id, String? authToken) async {
    var uri = Uri.parse("$baseURL/game/$id");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    if (response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Failed to load game data');
    }
  }

  Future<http.Response> createReview(
      String? authToken, String gameId, String content, double rate) async {
    var uri = Uri.parse("$baseURL/review/$gameId");
    final body =
        jsonEncode(<String, Object>{'content': content, 'rating': rate});
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }

  Future<http.Response> likeReview(String? authToken, String reviewId) async {
    var uri = Uri.parse("$baseURL/review/$reviewId/like");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> dislikeReview(
      String? authToken, String reviewId) async {
    var uri = Uri.parse("$baseURL/review/$reviewId/dislike");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> listReviews(String? authToken, String gameId) async {
    var uri = Uri.parse("$baseURL/review/game/$gameId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }

  Future<http.Response> userInfoById(String? userId, String? authToken) async {
    var uri = Uri.parse("$baseURL/user/byId/$userId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<Map<String, dynamic>> getThread(
      String threadId, String? authToken) async {
    var uri = Uri.parse("$baseURL/post/$threadId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    if (response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Failed to load thread data');
    }
  }

  Future<http.Response> likeThread(String? authToken, String threadId) async {
    var uri = Uri.parse("$baseURL/post/like/$threadId");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> dislikeThread(
      String? authToken, String threadId) async {
    var uri = Uri.parse("$baseURL/post/dislike/$threadId");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> createComment(
      String? authToken, String parentId, String text) async {
    var uri = Uri.parse("$baseURL/comment/write-comment");
    final body = jsonEncode(<String, Object>{
      'parentId': parentId,
      'text': text,
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> listComments(String parentId, String? authToken) async {
    var uri = Uri.parse("$baseURL/comment/$parentId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }


  Future<http.Response> listAllThreads(String? authToken, {String limit = "20"}) async {
    var uri = Uri.parse("$baseURL/post?limit=$limit");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }


  Future<http.Response> editGame(
      String? authToken,
      String gameId,
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
    var uri = Uri.parse("$baseURL/game/$gameId/edit");
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
    print(body);
    print(gameId);
    final response = await http.put(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> listThreadsBySearch(String searchKey, String gameId, String? authToken) async {
    var uri = Uri.parse("$baseURL/post?gameId=$gameId&searchKey=$searchKey");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to load threads');
    }
  }

  Future<http.Response> createRate(
      String? authToken, String gameId, double rate) async {
    var uri = Uri.parse("$baseURL/rating/$gameId");
    final body =
    jsonEncode(<String, Object>{'rating': rate});
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }

}
