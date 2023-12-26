import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'search_page_game.dart';
import 'search_page_user.dart';

class SearchPage extends StatefulWidget {
  final UserProvider userProvider;
  final String? initialSearchKey; // Pass an initial search key if available

  const SearchPage({
    Key? key,
    required this.userProvider,
    this.initialSearchKey,
  }) : super(key: key);

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final TextEditingController searchInputController = TextEditingController();
  bool showResult = false;
  String searchText = '';
  int page_number = 1;

  Key searchUserKey = UniqueKey();

  @override
  void initState() {
    updateShowState();
    super.initState();
  }

  void updateShowState() {
    setState(() {
      showResult = (searchText.toString() != '');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text(
          'Search User',
          style: TextStyle(
            color: MyColors.white,
            fontSize: 20,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 30),
            Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextFormField(
                  controller: searchInputController,
                  style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                  ),
                  obscureText: false,
                  decoration: InputDecoration(
                    hintText: 'Search users by username',
                    filled: true,
                    fillColor: MyColors.blue2,
                    //labelText: 'Search',
                    labelStyle: const TextStyle(
                        color: MyColors.darkBlue,
                        fontWeight: FontWeight.bold),
                    border: const OutlineInputBorder(
                        borderSide: BorderSide(
                            color: MyColors.red, width: 2.0)
                    ),

                    focusedBorder: const UnderlineInputBorder(
                      borderSide: BorderSide(color: MyColors.red, width: 2.0),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: MyColors.red, width: 3.0),
                      borderRadius: BorderRadius.all(Radius.circular(12.0)),
                    ),
                    //floatingLabelBehavior: (searchText.toString() != '') ? FloatingLabelBehavior.never : FloatingLabelBehavior.always,
                  ),
                  cursorColor: MyColors.lightBlue,
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  searchText = searchInputController.text;
                  updateShowState();
                  searchUserKey = UniqueKey();
                });
              },
              style: ElevatedButton.styleFrom(
                primary: MyColors.lightBlue, // Change the background color as needed
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12), // Optional: adjust the border radius
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.search,
                      color: Colors.black, // Change the icon color as needed
                      size: 25.0, // Adjust the icon size as needed
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            SingleChildScrollView(
              child: Column(
                children: [
                  if (showResult)
                    SearchPageUser(
                      token: widget.userProvider.token,
                      key: searchUserKey,
                      userProvider: widget.userProvider,
                      searchKey: searchText,
                    ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}


