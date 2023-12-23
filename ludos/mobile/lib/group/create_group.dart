import 'dart:convert';

import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:material_tag_editor/tag_editor.dart';

import '../helper/APIService.dart';
import '../helper/colors.dart';
import '../reusable_widgets/custom_widgets.dart';
import '../userProvider.dart';
import 'groups.dart';

Widget getbox(String hintText, TextEditingController controller,
    bool isMandatory, bool multiLine, bool isNumber) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Row(
        children: [
          if (isMandatory)
            const Text(
              '*',
              style: TextStyle(
                color: Colors.red,
                fontWeight: FontWeight.bold,
              ),
            ),
          Text(
            hintText,
            style: const TextStyle(
              color: MyColors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
      const SizedBox(height: 8.0), // Adjust the spacing as needed
      TextFormField(
        controller: controller,
        style: const TextStyle(color: MyColors.red),
        keyboardType: isNumber ? TextInputType.number : (multiLine ? TextInputType.multiline : null),
        inputFormatters: isNumber ? <TextInputFormatter>[
          FilteringTextInputFormatter.digitsOnly
        ] : null,
        maxLines: multiLine ? 5 : 1,
        decoration: InputDecoration(
          filled: true,
          fillColor: MyColors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(25.0),
            borderSide: const BorderSide(
              color: Colors.white,
              width: 2.0,
            ),
          ),
          hintText: '',
          labelText: '',
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: MyColors.lightBlue, width: 2.0),
            borderRadius: BorderRadius.circular(25.0),
          ),
        ),
        cursorColor: MyColors.lightBlue,
      ),
    ],
  );
}

class CreateGroupPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;

  const CreateGroupPage(
      {Key? key,
        required this.token,
        required this.userProvider,
      }) : super(key: key);

  @override
  State<CreateGroupPage> createState() => _CreateGroupPageState();
}

class _CreateGroupPageState extends State<CreateGroupPage> {
  late Future<List<_Game>> games;
  List<_Game> gamesOnList = [];
  List<String> gameTitles = [];

  String itemSelected = "";

  List<String> tagValues = [];


  @override
  void initState() {
    super.initState();
    games = fetchData();
    loadGames();
  }

  Future<void> loadGames() async {
    gamesOnList = await games;
    int i = 0;
    while (i < gamesOnList.length) {
      gameTitles.add(gamesOnList[i].title);
      i = i +1;
    }
  }

  _onDeletet(index) {
    setState(() {
      tagValues.removeAt(index);
    });
  }

  Future<List<_Game>> fetchData() async {
    final response = await APIService().listGames(widget.token, limit: 1000, orderByKey: "title");
    try {
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = json.decode(response.body);

        List<dynamic> gamesLists = responseData['items'];
        print(gamesLists);
        return gamesLists.map((dynamic item) => _Game(
            id: item['id'],
            title: item['title']
        )).toList();
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to load games!');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to load games!');
    }
  }

  final TextEditingController titleController = TextEditingController();
  final TextEditingController bodyController = TextEditingController();
  final TextEditingController tagsController = TextEditingController();
  final TextEditingController coverLinkController = TextEditingController();
  final TextEditingController numberController = TextEditingController();


  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Create Group'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      '*',
                      style: TextStyle(
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      "Game",
                      textAlign: TextAlign.left,
                      style: TextStyle(
                        color: Colors.white,
                      ) ,
                    ),
                  ]
                ),
                DropdownSearch<String>(
                  items:  gameTitles,
                  popupProps: PopupProps.menu(
                    showSearchBox: true,
                  ),
                  dropdownButtonProps: DropdownButtonProps(color: Colors.blue,),
                  dropdownDecoratorProps: DropDownDecoratorProps(
                    textAlignVertical: TextAlignVertical.center,
                    dropdownSearchDecoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                        )),
                  ),
                  onChanged: (value) {
                    setState(() {
                      itemSelected = value.toString();
                    });
                  },
                  selectedItem: itemSelected,
                ),
                const SizedBox(height: 20),
                getbox("Title", titleController, true, false, false),
                const SizedBox(height: 20),
                getbox("Description", bodyController, true, true, false),
                const SizedBox(height: 20),
                getbox("Logo", coverLinkController, false, false, false),
                const SizedBox(height: 20),
                getbox("Max Number", numberController, false, false, true),
                const SizedBox(height: 20),
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Text(
                    "Tags",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8.0),
                  TagEditor(
                    length: tagValues.length,
                    controller: tagsController,
                    delimiters: const [',', ' '],
                    hasAddButton: true,
                    resetTextOnSubmitted: true,
                    textStyle: const TextStyle(
                        color: MyColors.red, fontWeight: FontWeight.bold),
                    onSubmitted: (outstandingValue) {
                      setState(() {
                        tagValues.add(outstandingValue);
                      });
                    },
                    inputDecoration: InputDecoration(
                      filled: true,
                      fillColor: MyColors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        borderSide: const BorderSide(
                          color: Colors.white,
                          width: 2.0,
                        ),
                      ),
                      labelStyle: const TextStyle(
                          color: MyColors.red, fontWeight: FontWeight.bold),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(
                            color: MyColors.lightBlue, width: 2.0),
                        borderRadius: BorderRadius.circular(25.0),
                      ),
                    ),
                    onTagChanged: (newValue) {
                      setState(() {
                        tagValues.add(newValue);
                      });
                    },
                    tagBuilder: (context, index) => _Chip(
                      index: index,
                      label: tagValues[index],
                      onDeleted: _onDeletet,
                    ),
                    inputFormatters: [
                      FilteringTextInputFormatter.deny(RegExp(r'[/\\]'))
                    ],
                  ),
                  const SizedBox(height: 20),
                  TextButton(
                    style: TextButton.styleFrom(
                      backgroundColor: MyColors.lightBlue,
                    ),
                    onPressed: () async {
                      http.Response token = await APIService().createGroup(
                        widget.token,
                        gamesOnList.firstWhere((game) => game.title == itemSelected).id,
                        titleController.text,
                        bodyController.text,
                        coverLinkController.text,
                        int.parse(numberController.text),
                        tagValues);
                        if (token.statusCode == 201) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: const Row(
                                children: [
                                  Icon(
                                    Icons.check_circle_outline,
                                    color: MyColors.blue,
                                  ),
                                  SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      'Your group is created successfully. You will be redirected to the Groups.',
                                      style: TextStyle(
                                        color: MyColors.blue,
                                        fontSize: 16,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              backgroundColor: MyColors.blue2,
                              duration: const Duration(seconds: 5),
                              action: SnackBarAction(
                                label: 'OK',
                                textColor: MyColors.blue,
                                onPressed: () {
                                  ScaffoldMessenger.of(context).hideCurrentSnackBar();
                                  Navigator.push(context,
                                    MaterialPageRoute(
                                      builder: (context) => GroupsPage(token: widget.token, userProvider: widget.userProvider)
                                    ),
                                  );
                                },
                              ),
                            ),
                          ).closed.then((reason) => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => GroupsPage(token: widget.token, userProvider: widget.userProvider)),
                          ));
                      } else {
                        CustomWidgets.statusNotOkay(context, json.decode(token.body)["message"]);
                      }
                    },
                    child: const Text(
                        "Create",
                        style: TextStyle(color: Colors.white)
                    ),
                  )
                ]),
              ]
          ),
        )
      ),

    );
  }
}

class _Game {
  final String id;
  final String title;

  const _Game({
    required this.id,
    required this.title
  });
}

class _Chip extends StatelessWidget {
  const _Chip({
    required this.label,
    required this.onDeleted,
    required this.index,
  });

  final String label;
  final ValueChanged<int> onDeleted;
  final int index;

  @override
  Widget build(BuildContext context) {
    return Chip(
      backgroundColor: MyColors.blue2,
      labelPadding: const EdgeInsets.only(left: 8.0),
      label: Text(label),
      deleteIcon: const Icon(
        Icons.close,
        size: 18,
      ),
      onDeleted: () {
        onDeleted(index);
      },
    );
  }
}