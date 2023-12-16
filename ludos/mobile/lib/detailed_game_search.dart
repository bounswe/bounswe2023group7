import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'search_page_game.dart';
import 'search_page_user.dart';


class DetailedGameSearch extends StatefulWidget {
  final UserProvider userProvider;
  final String? initialSearchKey; // Pass an initial search key if available

  const DetailedGameSearch({
    Key? key,
    required this.userProvider,
    this.initialSearchKey,
  }) : super(key: key);

  @override
  State<DetailedGameSearch> createState() => _DetailedGameSearchState();
}

class _DetailedGameSearchState extends State<DetailedGameSearch> {
  final TextEditingController searchInputController = TextEditingController();
  final TextEditingController tagsController = TextEditingController();
  final TextEditingController platformsController = TextEditingController();
  final TextEditingController publisherController = TextEditingController();
  final TextEditingController developerController = TextEditingController();

  int page_number = 1;
  bool showResult = false;
  bool isFollowed = false;
  bool orderByFollowers = false;
  bool orderByRatings = false;
  bool order = false;
  String searchText = '';
  String tags = '';
  String platforms = '';
  String? criteria = '';

  Key searchGameKey = UniqueKey();

  @override
  void initState() {
    updateShowState();
    super.initState();
  }

  void updateCriteria(){
    setState((){
      if (orderByFollowers == true){
        criteria = 'followers';
      }
      else if (orderByRatings == true){
        criteria = 'ratings';
      }
      else {
        criteria = '';
      }
    });
  }

  void updateShowState() {
    setState(() {
      showResult = (searchText.toString() != '' || tags.toString() != '');
    });
  }

  /*
  Future<void> _performSearch() async {
    // Extract values from TextEditingControllers
    String tags = tagsController.text;
    String platforms = platformsController.text;
    String publisher = publisherController.text;
    String developer = developerController.text;

    // Call the listGames method with the parameters
    await listGames(
      widget.userProvider.token,
      searchKey: searchText,
      tags: tags,
      platforms: platforms,
      publisher: publisher,
      developer: developer,
    );
  }
*/
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
            const SizedBox(height: 20),
            // Search key field
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
                    hintText: 'Search by title',
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
            const SizedBox(height: 10),
            // tags field
            Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextFormField(
                  controller: tagsController,
                  style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                  ),
                  obscureText: false,
                  decoration: InputDecoration(
                    hintText: 'Search by comma separated tags',
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
                  ),
                  cursorColor: MyColors.lightBlue,
                ),
              ),
            ),
            const SizedBox(height: 10),
            // tags field
            Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextFormField(
                  controller: platformsController,
                  style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                  ),
                  obscureText: false,
                  decoration: InputDecoration(
                    hintText: 'Search by comma separated platforms',
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
                  ),
                  cursorColor: MyColors.lightBlue,
                ),
              ),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                const SizedBox(width: 10),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'List only',
                      style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      ),
                    ),
                    Text(
                      'followed',
                      style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      ),
                    ),
                    Text(
                      'games',
                      style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      ),
                    ),

                    Checkbox(
                      value: isFollowed,
                      overlayColor: MaterialStateProperty.all(MyColors.lightBlue),
                      side: const BorderSide(color: MyColors.lightBlue),
                      activeColor: MyColors.green,

                      onChanged: (value) {
                        setState(() {
                          print(widget.userProvider.username);
                          if(widget.userProvider.username == ''){
                            SnackBar snackBar = SnackBar(
                              content: Text('You must be logged in to use this feature'),
                              backgroundColor: MyColors.red,
                            );
                            ScaffoldMessenger.of(context).showSnackBar(snackBar);
                          }
                          else{
                            isFollowed = value!;
                            //searchGameKey = UniqueKey();
                          }

                        });
                      },
                    ),
                  ]
                ),
                const SizedBox(width: 10),
                VerticalDivider(
                  color: MyColors.red,
                  thickness: 20,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Order by', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Text('number of', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Text('followers', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Checkbox(
                        value: orderByFollowers,
                        overlayColor: MaterialStateProperty.all(MyColors.lightBlue),
                        side: BorderSide(color: orderByRatings ? MyColors.red : MyColors.lightBlue),
                        activeColor: MyColors.green,

                        onChanged: (value) {
                          setState(() {
                            if (orderByRatings == true) {
                              SnackBar snackBar = SnackBar(
                                content: Text('You can only order by one criteria'),
                                backgroundColor: MyColors.red,
                              );
                              ScaffoldMessenger.of(context).showSnackBar(snackBar);
                            }
                            orderByFollowers = orderByRatings ? orderByFollowers : value!;
                            //searchGameKey = UniqueKey();
                          });
                        },
                      ),
                    ]
                ),
                const SizedBox(width: 10),
                Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Order', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Text('by', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Text('ratings', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Checkbox(
                        value: orderByRatings,
                        overlayColor: MaterialStateProperty.all(MyColors.lightBlue),
                        side: BorderSide(color: orderByFollowers ? MyColors.red : MyColors.lightBlue),
                        activeColor: MyColors.green,

                        onChanged: (value) {
                          setState(() {
                            if (orderByFollowers == true) {

                              SnackBar snackBar = SnackBar(
                                content: Text('You can only order by one criteria'),
                                backgroundColor: MyColors.red,
                              );
                              ScaffoldMessenger.of(context).showSnackBar(snackBar);
                            }
                            orderByRatings = orderByFollowers ? orderByRatings : value!;
                            //searchGameKey = UniqueKey();
                          });
                        },
                      ),
                    ]
                ),
                const SizedBox(width: 10),
              ],
            ),
            const SizedBox(height: 10),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text('Order', style: TextStyle(
                  color: MyColors.white,
                  fontSize: 20,
                )),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('ASC', style: TextStyle(
                      color: order ? MyColors.white : MyColors.green,
                      fontSize: order ? 12 : 20,
                      fontWeight: order ? FontWeight.normal : FontWeight.bold,
                    )),
                    const SizedBox(width: 3),
                    Switch(
                      value: order,
                      onChanged: (value) {
                        setState(() {
                          order = value;
                          //searchGameKey = UniqueKey();
                        });
                      },
                      activeTrackColor: MyColors.green,
                      activeColor: MyColors.green,
                    ),
                    const SizedBox(width: 3),
                    Text('DESC', style: TextStyle(
                      color: order ? MyColors.green : MyColors.white,
                      fontSize: order ? 20 : 12,
                      fontWeight: order ? FontWeight.bold : FontWeight.normal,
                    )),
                  ],
                ),
              ],
            ),

            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  searchText = searchInputController.text;
                  tags = tagsController.text;
                  platforms = platformsController.text;
                  updateShowState();
                  searchGameKey = UniqueKey();
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
                    //if (showResult == true)
                    if (true)
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
                            key: searchGameKey,
                            searchKey: searchText,
                            tags: tags,
                            platforms: platforms,
                            isFollowed: isFollowed,
                            order : order ? 'DESC' : 'ASC',
                            page: page_number,
                            criteria: criteria,
                            userProvider: widget.userProvider,
                            token: widget.userProvider.token,
                          ),
                          const SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Current Page: $page_number',
                                style: TextStyle(
                                  color: MyColors.orange,
                                  fontSize: 18,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              ElevatedButton(
                                onPressed: () {
                                  setState(() {
                                    if (page_number > 1){
                                      page_number -= 1;
                                      searchGameKey = UniqueKey();
                                    }
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
                                        Icons.arrow_back,
                                        color: Colors.black, // Change the icon color as needed
                                        size: 25.0, // Adjust the icon size as needed
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                              const SizedBox(width: 20),
                              ElevatedButton(
                                onPressed: () {
                                  setState(() {
                                      page_number += 1;
                                      searchGameKey = UniqueKey();
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
                                        Icons.arrow_forward,
                                        color: Colors.black, // Change the icon color as needed
                                        size: 25.0, // Adjust the icon size as needed
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ]
                          ),
                          const SizedBox(height: 20),
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
