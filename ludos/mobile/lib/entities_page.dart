import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/helper/APIService.dart';
import 'package:ludos_mobile_app/helper/EntityContent.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/reusable_widgets/entity_summary.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:provider/provider.dart';

Future<List<EntitySummary>> fetchEntityData(
    UserProvider userProvider, String? token, String gameId) async {
  //final userProvider = Provider.of<UserProvider>(context, listen: false);
  final response = await APIService().listEntitesByGame(token, gameId);
  try {
    //print(json.decode(response.body));
    if (response.statusCode == 200) {
      final List<dynamic> entitiesList = json.decode(response.body);
      print(entitiesList);
      return entitiesList
          .map((dynamic item) => EntitySummary(
              type: item['type'],
              name: item['name'],
              content: EntityContent(
                  image: item['content']['image'] ?? item['content']['Image Link'] ?? "",
                  role: (item['description'] ?? "")),
              id: item['id'],
              token: token,
              userProvider: userProvider))
          .toList();
    } else {
      print("Error: ${response.statusCode} - ${response.body}");
      throw Exception('Failed to load entities');
    }
  } catch (error) {
    print("Error: $error");
    throw Exception('Failed to load entities');
  }
}

class EntitiesPage extends StatefulWidget {
  const EntitiesPage(
      {Key? key, required this.gameId, required this.userProvider})
      : super(key: key);
  final String gameId;
  final UserProvider userProvider;

  @override
  State<EntitiesPage> createState() => _EntitiesPageState();
}

class _EntitiesPageState extends State<EntitiesPage> {
  late Future<List<EntitySummary>> entities;

  final APIService apiService = APIService();
  @override
  Widget build(BuildContext context) {
    var userProvider = Provider.of<UserProvider>(context);
    entities = fetchEntityData(userProvider, userProvider.token, widget.gameId);
    return SelectionArea(
        child: Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text("Entities"),
      ),
      body: SingleChildScrollView(
        child: (Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Column(children: [
              const SizedBox(height: 10),
              const Text("Environments",
                  style: TextStyle(
                    color: MyColors.blue2,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  )),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: FutureBuilder<List<EntitySummary>>(
                    future: entities.then((list) {
                      return list
                          .where((entity) => entity.type == "environment")
                          .toList();
                    }),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // Show a loading indicator while fetching data
                        return const Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        // Handle errors
                        return Center(child: Text('Error: ${snapshot.error}'));
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        // Handle the case when there is no data
                        return const Center(child: Text('No environments available.', style: TextStyle(color: MyColors.blue2),));
                      } else {
                        // Display the fetched data
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: snapshot.data!,
                        );
                      }
                    },
                  ),
                ),
              ),
              const Text("Characters",
                  style: TextStyle(
                    color: MyColors.blue2,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  )),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: FutureBuilder<List<EntitySummary>>(
                    future: entities.then((list) {
                      return list
                          .where((entity) => entity.type == "character")
                          .toList();
                    }),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // Show a loading indicator while fetching data
                        return const Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        // Handle errors
                        return Center(child: Text('Error: ${snapshot.error}'));
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        // Handle the case when there is no data
                        return const Center(child: Text('No characters available.', style: TextStyle(color: MyColors.blue2),));
                      } else {
                        // Display the fetched data
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: snapshot.data!,
                        );
                      }
                    },
                  ),
                ),
              ),
              const Text("Packages",
                  style: TextStyle(
                    color: MyColors.blue2,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  )),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: FutureBuilder<List<EntitySummary>>(
                    future: entities.then((list) {
                      return list
                          .where((entity) => entity.type == "package")
                          .toList();
                    }),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // Show a loading indicator while fetching data
                        return const Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        // Handle errors
                        return Center(child: Text('Error: ${snapshot.error}'));
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        // Handle the case when there is no data
                        return const Center(child: Text('No packages available.', style: TextStyle(color: MyColors.blue2),));
                      } else {
                        // Display the fetched data
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: snapshot.data!,
                        );
                      }
                    },
                  ),
                ),
              ),
              const Text("Items",
                  style: TextStyle(
                    color: MyColors.blue2,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  )),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: FutureBuilder<List<EntitySummary>>(
                    future: entities.then((list) {
                      return list
                          .where((entity) => entity.type == "item")
                          .toList();
                    }),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        // Show a loading indicator while fetching data
                        return const Center(child: CircularProgressIndicator());
                      } else if (snapshot.hasError) {
                        // Handle errors
                        return Center(child: Text('Error: ${snapshot.error}'));
                      } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                        // Handle the case when there is no data
                        return const Center(child: Text('No items available.', style: TextStyle(color: MyColors.blue2),));
                      } else {
                        // Display the fetched data
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: snapshot.data!,
                        );
                      }
                    },
                  ),
                ),
              )
            ]),
          ],
        )),
      ),
      bottomNavigationBar:
          CustomNavigationBar(userProvider: widget.userProvider),
    ));
  }
}
