import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'reusable_widgets/user_summary.dart';
import 'helper/APIService.dart';

class SearchPageUser extends StatefulWidget {
  final String? searchKey;
  final String? token;
  final UserProvider userProvider;

  const SearchPageUser({Key? key, required this.token, required this.searchKey, required this.userProvider})
      : super(key: key);

  @override
  State<SearchPageUser> createState() => _SearchPageUserState();
}

class _SearchPageUserState extends State<SearchPageUser> {
  late int size = 0;
  late Future<List<UserSummary>> users;

  @override
  void initState() {
    super.initState();
    users = fetchData(widget.token);
  }

  @override
  void didUpdateWidget(covariant SearchPageUser oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.searchKey != oldWidget.searchKey) {
      // Trigger a new data fetch when searchKey changes
      users = fetchData(widget.token);
    }
  }

  Future<List<UserSummary>> fetchData(String? token) async {
    //final userProvider = Provider.of<UserProvider>(context, listen: false);
    final response = await APIService().search(widget.userProvider.token, widget.searchKey!);
    try {
      //print(json.decode(response.body));
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> userList = responseData['users'];
        setState(() {
          size = userList.length;
        });
        return userList
            .map((dynamic item) => UserSummary(
            email: item['email'] ?? '',
            username: item['username'] ?? '',
            fullName: item['fullName'] ?? 'Full name not provided',
            avatar: item['avatar'],
            id: item['id'],
            token: widget.token,
            userProvider: widget.userProvider))
            .toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load games');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load games');
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 15),
          //const SafeArea(child: SizedBox(height: 10)),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: FutureBuilder<List<UserSummary>>(
              future: users,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  // Show a loading indicator while fetching data
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  // Handle errors
                  return Center(child: Text('Error: ${snapshot.error}'));
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  // Handle the case when there is no data
                  return const Center(
                      child: Text('No user found with this input.',
                          style: TextStyle(color: MyColors.orange,
                              fontSize: 16,
                              fontWeight: FontWeight.bold)));
                } else {
                  // Display the fetched data
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: snapshot.data!,
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}

