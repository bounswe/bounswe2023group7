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
  Color gamesButtonColor = MyColors.red;
  Color postsButtonColor = MyColors.red;
  Color usersButtonColor = MyColors.red;
  bool showResult = false;
  String searchText = '';

  Key searchGameKey = UniqueKey();
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
          'Search',
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
                    suffixIcon: Container(
                      padding: const EdgeInsets.all(8.0),
                      child: IconButton(
                        icon: const Icon(Icons.search),
                        color: MyColors.darkBlue,
                        onPressed: () {
                          setState(() {
                            searchText = searchInputController.text;
                            updateShowState();
                            setState(() {});
                          });
                        },
                      ),
                    ),
                    hintText: 'Search for games',
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
            SingleChildScrollView(
              child: Column(
                children: [
                  //if (isGamesSelected != true && showResult == true)
                  if (showResult == true)
                    Column(
                      children: [
                        const SizedBox(height: 10),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            SizedBox(width: 20),
                            Text(
                              'Games',
                              style: TextStyle(
                                color: MyColors.lightBlue,
                                fontSize: 18,
                              ),
                            ),
                          ],
                        ),
                        SearchPageGame(
                          page : 1,
                          isFollowed: false,
                          key: searchGameKey, // Use the unique key
                          searchKey: searchText,
                          userProvider: widget.userProvider,
                          token: widget.userProvider.token,
                        ),
                      ],
                    ),
                ],
              )
            ),
          ],
        ),
      ),
      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}


