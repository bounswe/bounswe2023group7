import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'dart:io';

class APIService {
  var baseURL = "http://164.92.195.35:8080";

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

    print("APICALL: login called");
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
    print("APICALL: signUp called");
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
    print("APICALL: change password called");
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
    print("APICALL: create game called");
    return response;
  }

  Future<http.Response> createThread(
      String? authToken,
      String title,
      String content,
      List<String> media,
      List<String> tags,
      Map<String, dynamic> upcomingTitle,
      String gameid) async {
    var uri = Uri.parse("$baseURL/post");
    final body = jsonEncode(<String, Object>{
      'title': title,
      'body': content,
      'gameId': gameid,
      'media': media,
      'tags': tags,
      'upcomingTitle': upcomingTitle
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: create thread called");
    return response;
  }

  Future<http.Response> resetPassword(String email) async {
    var uri = Uri.parse("$baseURL/user/reset-password");
    final body = jsonEncode(<String, Object>{
      'email': email,
    });
    final response = await http
        .post(uri, body: body, headers: {'content-type': "application/json"});
    print("APICALL: reset password called");
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
    print("APICALL: verify code called");
    return response;
  }

  /*
  Future<http.Response> listGames(String? authToken, {String limit = "20"}) async {
    var uri = Uri.parse("$baseURL/game?limit=$limit");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    return response;
  }
  */

  Future<http.Response> listGames(String? authToken,
      {int page = 1,
      int limit = 10,
      String? searchKey,
      String? tags,
      String? platforms,
      String? publisher,
      String? developer,
      String order = "ASC",
      bool isFollowed = false,
      String orderByKey = "id"}) async {
    // Create a map to store query parameters
    final Map<String, String> queryParams = {
      'page': page.toString(),
      'limit': limit.toString(),
      'order': order,
      'isFollowed': isFollowed.toString(),
      'orderByKey': orderByKey,
    };

    // Add optional parameters if provided
    if (searchKey != null) queryParams['searchKey'] = searchKey;
    if (tags != null) queryParams['tags'] = tags;
    if (platforms != null) queryParams['platforms'] = platforms;
    if (publisher != null) queryParams['publisher'] = publisher;
    if (developer != null) queryParams['developer'] = developer;

    // Create the URI with query parameters
    var uri = Uri.parse("$baseURL/game").replace(queryParameters: queryParams);

    // Make the HTTP request
    final response = await http.get(uri, headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer $authToken',
    });
    print("APICALL: list games called");
    return response;
  }

  Future<http.Response> listSearchedGames(String? authToken, String? searchKey,
      {String limit = "20"}) async {
    String searchQueryParam = searchKey != null ? "searchKey=$searchKey" : "";
    var uri = Uri.parse("$baseURL/game?$searchQueryParam");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: list search games called");
    return response;
  }

  Future<http.Response> listThreads(String gameId, String? authToken) async {
    var uri = Uri.parse("$baseURL/post?gameId=$gameId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });

    print("APICALL: list threads called");
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
    print("APICALL: follow game called");
    return response;
  }

  Future<http.Response> unfollowGame(String? authToken, String gameID) async {
    var uri = Uri.parse("$baseURL/game/unfollow/$gameID");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: unfollow game called");
    return response;
  }

  Future<http.Response> userInfo(String? authToken) async {
    var uri = Uri.parse("$baseURL/user/info");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: userinfo called");
    return response;
  }

  Future<http.Response> userById(String? authToken, String userID) async {
    var uri = Uri.parse("$baseURL/user/byId/$userID");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: userbyid called");
    return response;
  }

  Future<Map<String, dynamic>> getGame(String id, String? authToken) async {
    var uri = Uri.parse("$baseURL/game/$id");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: get game called");
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
    print("APICALL: create review called");
    return response;
  }

  Future<http.Response> likeReview(String? authToken, String reviewId) async {
    var uri = Uri.parse("$baseURL/review/$reviewId/like");
    final response = await http.post(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: like review called");
    return response;
  }

  Future<http.Response> dislikeReview(
      String? authToken, String reviewId) async {
    var uri = Uri.parse("$baseURL/review/$reviewId/dislike");
    final response = await http.post(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: dislike review called");
    return response;
  }

  Future<http.Response> likeComment(String? authToken, String commentId) async {
    var uri = Uri.parse("$baseURL/comment/$commentId/like-comment");
    final response = await http.post(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: like comment called");
    if (response.statusCode == 200) {
      return response;
    } else {
      print(response.statusCode);
      throw Exception('Failed to load entity data');
    }
  }

  Future<http.Response> dislikeComment(
      String? authToken, String commentId) async {
    var uri = Uri.parse("$baseURL/comment/$commentId/dislike-comment");
    final response = await http.post(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: dislike commnet called");
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to load entity data');
    }
  }

  Future<http.Response> listReviews(String? authToken, String gameId) async {
    var uri = Uri.parse("$baseURL/review/game/$gameId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: list reviews called");
    return response;
  }

  Future<http.Response> userInfoById(String? userId, String? authToken) async {
    var uri = Uri.parse("$baseURL/user/byId/$userId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: user info by id  called");
    return response;
  }

  Future<Map<String, dynamic>> getThread(
      String threadId, String? authToken) async {
    var uri = Uri.parse("$baseURL/post/$threadId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: get thread called");
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
    print("APICALL: like thread called");
    return response;
  }

  Future<http.Response> dislikeThread(
      String? authToken, String threadId) async {
    var uri = Uri.parse("$baseURL/post/dislike/$threadId");
    final response = await http.put(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: dislike thread called");
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
    print("APICALL: create comment called");
    return response;
  }

  Future<http.Response> listComments(String parentId, String? authToken) async {
    var uri = Uri.parse("$baseURL/comment/$parentId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: list comments called");
    return response;
  }

  Future<http.Response> listAllThreads(String? authToken,
      {String limit = "20"}) async {
    var uri = Uri.parse("$baseURL/post?limit=$limit");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: listallthreads called");
    return response;
  }

  Future<http.Response> lastActivities(String? authToken,
  {int page = 1,
  int limit = 5,
  String? searchKey,
  String? tags,
  String? gameId,
  String? groupId,
  String? ownerUserId,
  bool isLiked = false,
  bool isDisliked = false,
  String order = "DESC",
  String orderByKey = "createdAt"}) async {

    final Map<String, String> queryParams = {
      'page': page.toString(),
      'limit': limit.toString(),
      'order': order,
      'isLiked': isLiked.toString(),
      'isDisliked': isDisliked.toString(),
      'orderByKey': orderByKey,
    };

    if (searchKey != null) queryParams['searchKey'] = searchKey;
    if (tags != null) queryParams['tags'] = tags;
    if (groupId != null) queryParams['groupId'] = groupId;
    if (ownerUserId != null) queryParams['ownerUserId'] = ownerUserId;
    if(gameId != null) queryParams['gameId'] = gameId;


    var uri = Uri.parse("$baseURL/post").replace(queryParameters: queryParams);

    // Make the HTTP request for each gameId
    var res = await http.get(uri, headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer $authToken',
      HttpHeaders.contentTypeHeader: 'application/json; charset=utf-8',
    });
    if (res.statusCode == 200) {
      return res;
    } else {
      throw Exception('Failed to load threads');
    }
  }

  Future<http.Response> listPosts(String? authToken,
      {int page = 1,
      int limit = 10,
      String? searchKey,
      String? tags,
      List<String> gameId = const [],
      String? groupId,
      String? ownerUserId,
      bool isLiked = false,
      bool isDisliked = false,
      String order = "DESC",
      String orderByKey = "createdAt"}) async {
    // Create a list to store individual responses
    List<http.Response> individualResponses = [];

    for (int i = 0; i < gameId.length; i++) {
      // Create a map to store query parameters for each gameId
      final Map<String, String> queryParams = {
        'page': page.toString(),
        'limit': limit.toString(),
        'order': order,
        'isLiked': isLiked.toString(),
        'isDisliked': isDisliked.toString(),
        'orderByKey': orderByKey,
        'gameId': gameId[i],
      };

      // Add optional parameters if provided
      if (searchKey != null) queryParams['searchKey'] = searchKey;
      if (tags != null) queryParams['tags'] = tags;
      if (groupId != null) queryParams['groupId'] = groupId;
      if (ownerUserId != null) queryParams['ownerUserId'] = ownerUserId;

      // Create the URI with query parameters
      var uri =
          Uri.parse("$baseURL/post").replace(queryParameters: queryParams);

      // Make the HTTP request for each gameId
      var res = await http.get(uri, headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer $authToken',
        HttpHeaders.contentTypeHeader: 'application/json; charset=utf-8',
      });
      print("APICALL: list posts called");

      if (res.statusCode == 200) {
        // Add individual response to the list
        //print("Individual Response: ${res.body}");
        individualResponses.add(res);
      } else {
        throw Exception('Failed to load threads');
      }
    }

    // Combine individual responses into a single response
    http.Response combinedResponse = combineResponses(individualResponses);

    print("Combined Response: ${combinedResponse.body}");
    return combinedResponse;
  }

  http.Response combineResponses(List<http.Response> responses) {
    // Initialize an empty list to store combined items
    List<dynamic> combinedItems = [];

    // Iterate through each response
    for (var response in responses) {
      // Parse the response body
      Map<String, dynamic> responseBody =
          json.decode(utf8.decode(response.bodyBytes, allowMalformed: true));

      // Extract the "items" array from the response
      List<dynamic> items = responseBody['items'];

      // Add the items to the combined list
      combinedItems.addAll(items);

      // Add the items to the combined list
    }

    // Create a combined response with the merged "items" list
    Map<String, dynamic> combinedResponseBody = {'items': combinedItems};

    String combinedResponseString = json.encode(combinedResponseBody);
    //print("Combined Response String: $combinedResponseString");
    // Create an HTTP response with the combined body
    http.Response combinedResponse =
        http.Response(combinedResponseString, 200, headers: {
      HttpHeaders.contentTypeHeader: 'application/json; charset=utf-8',
    });

    return combinedResponse;
  }

  Future<http.Response> search(String? authToken, String searchKey) async {
    var uri = Uri.parse("$baseURL/search/$searchKey");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: search called");
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
    print("APICALL: edit game called");
    return response;
  }

  Future<http.Response> listThreadsBySearch(
      String searchKey, String gameId, String? authToken) async {
    var uri = Uri.parse("$baseURL/post?gameId=$gameId&searchKey=$searchKey");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: list treads by search called");
    if (response.statusCode == 200) {
      return response;
    } else {
      throw Exception('Failed to load threads');
    }
  }

  Future<http.Response> editProfile(
      String? authToken,
      String fullName,
      bool isNotificationEnabled,
      String avatar,
      String aboutMe,
      String steamUrl) async {
    var uri = Uri.parse("$baseURL/user/edit-info");
    final body = jsonEncode(<String, Object>{
      'fullName': fullName,
      'isNotificationEnabled': isNotificationEnabled,
      'avatar': avatar,
      'aboutMe': aboutMe,
      'steamUrl': steamUrl,
    });
    final response = await http.put(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: edit profile called");
    return response;
  }

  Future<http.Response> createRate(
      String? authToken, String gameId, double rate) async {
    var uri = Uri.parse("$baseURL/rating/$gameId");
    final body = jsonEncode(<String, Object>{'rating': rate});
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: create rate called");
    return response;
  }

  Future<http.Response> createEntity(
      String? authToken,
      String gameId,
      String type,
      String name,
      String image,
      String contentmsg,
      List<TextEditingController> nameControllers,
      List<TextEditingController> valueControllers) async {
    var uri = Uri.parse("$baseURL/entity/$gameId");
    Map<String, String> con = {};
    con['image'] = image;
    for (int i = 0; i < nameControllers.length && i < valueControllers.length; i++) {
      String name = nameControllers[i].text;
      String value = valueControllers[i].text;
      con[name] = value;
    }
    final body = jsonEncode(<String, Object>{
      'type': type,
      'name': name,
      'content': con,
      'description': contentmsg,
      });
      print(body);
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: create entity called");
    return response;
  }

  Future<http.Response> listEntitesByGame(
      String? authToken, String gameId) async {
    var uri = Uri.parse("$baseURL/entity/game/$gameId");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: list entities by game called");
    return response;
  }

  Future<Map<String, dynamic>> getEntity(String id, String? authToken) async {
    var uri = Uri.parse("$baseURL/entity/$id");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: get entity called");
    if (response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Failed to load entity data');
    }
  }

  Future<http.Response> deleteThread(String id, String? authToken) async {
    var uri = Uri.parse("$baseURL/post/$id");
    final response = await http.delete(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: delete thread called");
    return response;
  }

  Future<http.Response> editThread(
      String? authToken,
      String threadId,
      String title,
      String content,
      List<String> media,
      List<String> tags,
      String gameid) async {
    var uri = Uri.parse("$baseURL/post/$threadId");
    final body = jsonEncode(<String, Object>{
      'title': title,
      'body': content,
      'gameId': gameid,
      'media': media,
      'tags': tags,
    });
    final response = await http.put(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: edit thread called");
    return response;
  }

  Future<http.Response> deleteComment(String id, String? authToken) async {
    var uri = Uri.parse("$baseURL/comment/$id/delete-comment");
    final response = await http.delete(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: delete comment called");
    return response;
  }

  Future<http.Response> editComment(
      String? authToken, String commentId, String content) async {
    var uri = Uri.parse("$baseURL/comment/$commentId/edit-comment");
    final body = jsonEncode(<String, Object>{
      'newText': content,
    });
    final response = await http.put(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: edit comment called");
    return response;
  }

  Future<http.Response> getGameRecommendation(
      String? authToken, String gameID) async {
    var uri = Uri.parse("$baseURL/game/$gameID/related");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: getgamerecc called");
    return response;
  }

  Future<http.Response> getGameRecForUser(String? authToken) async {
    var uri = Uri.parse("$baseURL/user/suggested");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    print("APICALL: get game rec for the user called");
    return response;
  }
  
  Future<http.Response> createAnnotationGameBio(
      String? authToken,
      String gameID,
      String source,
      int start,
      int end,
      String annotationBody) async {
    var uri = Uri.parse("$baseURL/annotation/gamebio/$gameID");

    final body = jsonEncode(<String, Object>{
      '@context': "",
      'type': "Annotation",
      'body': annotationBody,
      'target': {
        'source': source,
        'selector': {'start': start, 'end': end}
      }
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> getAnnotationGameBio(
      String? authToken, String gameID) async {
    var uri = Uri.parse("$baseURL/annotation/gamebio/$gameID");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> createAnnotationThread(
      String? authToken,
      String threadID,
      String source,
      int start,
      int end,
      String annotationBody) async {
    var uri = Uri.parse("$baseURL/annotation/post/$threadID");

    final body = jsonEncode(<String, Object>{
      '@context': "",
      'type': "Annotation",
      'body': annotationBody,
      'target': {
        'source': source,
        'selector': {'start': start, 'end': end}
      }
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> getAnnotationThread(
      String? authToken, String threadID) async {
    var uri = Uri.parse("$baseURL/annotation/post/$threadID");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }


  Future<http.Response> createAnnotationEntity(
      String? authToken,
      String entityID,
      String source,
      int start,
      int end,
      String annotationBody) async {
    var uri = Uri.parse("$baseURL/annotation/entity/$entityID");

    final body = jsonEncode(<String, Object>{
      '@context': "",
      'type': "Annotation",
      'body': annotationBody,
      'target': {
        'source': source,
        'selector': {'start': start, 'end': end}
      }
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> getAnnotationEntity(
      String? authToken, String entityID) async {
    var uri = Uri.parse("$baseURL/annotation/entity/$entityID");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> createGroup(
      String? authToken,
      String gameId,
      String name,
      String description,
      String logoLink,
      int maxNumber,
      List<String> tags) async {
    var uri = Uri.parse("$baseURL/group/");
    final body = jsonEncode(<String, Object>{
      'name': name,
      'description': description,
      'gameId': gameId,
      'logo': logoLink,
      'maxNumberOfMembers': maxNumber,
      'tags': tags,
    });

    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

  Future<http.Response> listGroups(String? authToken) async {
    var uri = Uri.parse("$baseURL/group/");
    final response = await http.get(uri, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }

}
