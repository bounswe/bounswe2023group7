import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';
import 'search_page_game.dart';
import 'search_page_user.dart';
import 'search_page_post.dart';

class DetailedPostSearch extends StatefulWidget {
  final UserProvider userProvider;
  final String? initialSearchKey;

  const DetailedPostSearch({
    Key? key,
    required this.userProvider,
    this.initialSearchKey,
  }) : super(key: key);

  @override
  State<DetailedPostSearch> createState() => _DetailedPostSearchState();
}

class _DetailedPostSearchState extends State<DetailedPostSearch> {
  final TextEditingController searchInputController = TextEditingController();
  final TextEditingController tagsController = TextEditingController();
  final TextEditingController gameIDController = TextEditingController();
  final TextEditingController groupIDController = TextEditingController();
  final TextEditingController ownerUserIDController = TextEditingController();
  final TextEditingController developerController = TextEditingController();

  int page_number = 1;
  bool showResult = false;
  bool isLiked = false;
  bool isDisliked = false;
  bool orderByLikes = false;
  bool order = false;
  String searchText = '';
  String tags = '';
  String groupID = '';
  String gameTitle = '';
  String ownerUserID = '';
  String? criteria = '';

  Key searchPostKey = UniqueKey();

  @override
  void initState() {
    updateShowState();
    super.initState();
  }

  void updateShowState() {
    setState(() {
      showResult = (searchText.toString() != '' ||
          tags.toString() != '' ||
          gameTitle.toString() != '' ||
          groupID.toString() != '' ||
          ownerUserID.toString() != '' ||
          isLiked == true ||
          isDisliked == true
      );
    });
  }

  void updateCriteria(){
    setState((){
      if (orderByLikes == true){
        criteria = 'numberOfLikes';
      }else{
        criteria = 'createdAt';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text(
          'Search Posts',
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
                    hintText: 'Search by title or body',
                    filled: true,
                    fillColor: MyColors.blue2,
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
                  controller: gameIDController,
                  style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                  ),
                  obscureText: false,
                  decoration: InputDecoration(
                    hintText: 'Search by game title that post belongs to',
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
            Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: TextFormField(
                  controller: ownerUserIDController,
                  style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                  ),
                  obscureText: false,
                  decoration: InputDecoration(
                    hintText: 'Search by owner id that post belongs to',
                    filled: true,
                    fillColor: MyColors.blue2,
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
            // checkboxes
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
                        'liked',
                        style: TextStyle(
                          color: MyColors.white,
                          fontSize: 18,
                        ),
                      ),
                      Text(
                        'posts',
                        style: TextStyle(
                          color: MyColors.white,
                          fontSize: 18,
                        ),
                      ),

                      Checkbox(
                        value: isLiked,
                        overlayColor: MaterialStateProperty.all(MyColors.lightBlue),
                        side: BorderSide(color: isDisliked ? MyColors.red : MyColors.lightBlue),
                        activeColor: MyColors.green,
                        onChanged: (value) {
                          setState(() {
                            if(widget.userProvider.username == ''){
                              SnackBar snackBar = SnackBar(
                                content: Text('You must be logged in to use this feature'),
                                backgroundColor: MyColors.red,
                              );
                              ScaffoldMessenger.of(context).showSnackBar(snackBar);
                            }
                            else{
                              if (isDisliked == true){
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('You cannot select both liked and disliked'),
                                      backgroundColor: MyColors.red,
                                    )
                                );
                            }
                              else{
                                isLiked = value!;
                              }
                            }
                          });
                        },
                      ),
                    ]
                ),
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
                        'disliked',
                        style: TextStyle(
                          color: MyColors.white,
                          fontSize: 18,
                        ),
                      ),
                      Text(
                        'posts',
                        style: TextStyle(
                          color: MyColors.white,
                          fontSize: 18,
                        ),
                      ),
                      Checkbox(
                        value: isDisliked,
                        overlayColor: MaterialStateProperty.all(MyColors.lightBlue),
                        side: BorderSide(color: isLiked ? MyColors.red : MyColors.lightBlue),
                        activeColor: MyColors.green,
                        onChanged: (value) {
                          setState(() {
                            if(widget.userProvider.username == ''){
                              SnackBar snackBar = SnackBar(
                                content: Text('You must be logged in to use this feature'),
                                backgroundColor: MyColors.red,
                              );
                              ScaffoldMessenger.of(context).showSnackBar(snackBar);
                            }
                            else{
                              if (isLiked == true){
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('You cannot select both liked and disliked'),
                                      backgroundColor: MyColors.red,
                                    )
                                );
                              }else{
                                isDisliked = value!;
                              }
                              //searchGameKey = UniqueKey();
                            }
                          });
                        },
                      ),
                    ]
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
                      Text('likes', style: TextStyle(
                        color: MyColors.white,
                        fontSize: 18,
                      )),
                      Checkbox(
                        value: orderByLikes,
                        overlayColor: MaterialStateProperty.all(MyColors.lightBlue),
                        side: const BorderSide(color: MyColors.lightBlue),
                        activeColor: MyColors.green,
                        onChanged: (value) {
                          setState(() {
                            orderByLikes = value!;
                            updateCriteria();
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
                  gameTitle = gameIDController.text;
                  groupID = groupIDController.text;
                  ownerUserID = ownerUserIDController.text;
                  updateCriteria();
                  updateShowState();
                  searchPostKey = UniqueKey();
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
                    if (showResult == true)
                      Column(
                        children: [
                          const SizedBox(height: 10),
                          const Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              SizedBox(width: 20),
                              Text(
                                'Posts',
                                style: TextStyle(
                                  color: MyColors.lightBlue,
                                  fontSize: 18,
                                ),
                              ),
                            ],
                          ),
                          SearchPagePost(
                            page: page_number,
                            key: searchPostKey,
                            searchKey: searchText,
                            tags: tags,
                            criteria: criteria,
                            isLiked: isLiked,
                            isDisliked: isDisliked,
                            order : order ? 'DESC' : 'ASC',
                            gameTitle: gameTitle,
                            owner: ownerUserID,
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
                                        searchPostKey = UniqueKey();
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
                                      searchPostKey = UniqueKey();
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
