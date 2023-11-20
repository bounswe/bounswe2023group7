import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'helper/colors.dart';
import 'package:material_tag_editor/tag_editor.dart';
import 'edit_game_second.dart';
import 'helper/APIService.dart';

Widget getbox(String hintText, TextEditingController controller,
    bool isMandatory, bool multiLine, String oldValue) {
  controller.text = oldValue;
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
        keyboardType: multiLine ? TextInputType.multiline : null,
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

class EditGamePage extends StatefulWidget {
  const EditGamePage({Key? key}) : super(key: key);

  @override
  State<EditGamePage> createState() => _EditGamePageState();
}

class _EditGamePageState extends State<EditGamePage> {
  List<String> predecessorValues = [];
  List<String> successorValues = [];
  List<String> tagValues = [];
  int selectdAgeRestriction = 0;
  List<String> ageRestrictions = [
    'Early Childhood',
    'Everyone',
    'Everyone 10 and older',
    'Teen',
    'Mature',
    'Adults Only',
    'Rating Pending',
  ];

  _onDeletepr(index) {
    setState(() {
      predecessorValues.removeAt(index);
    });
  }

  _onDeletes(index) {
    setState(() {
      successorValues.removeAt(index);
    });
  }

  _onDeletet(index) {
    setState(() {
      tagValues.removeAt(index);
    });
  }

  void _showDialog(Widget child) {
    showCupertinoModalPopup<void>(
      context: context,
      builder: (BuildContext context) => Container(
        height: 216,
        padding: const EdgeInsets.only(top: 6.0),
        margin: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        color: CupertinoColors.systemBackground.resolveFrom(context),
        child: SafeArea(
          top: false,
          child: child,
        ),
      ),
    );
  }

  final TextEditingController titleController = TextEditingController();
  final TextEditingController coverLinkController = TextEditingController();
  final TextEditingController predecessorsController = TextEditingController();
  final TextEditingController successorsController = TextEditingController();
  final TextEditingController gameBioController = TextEditingController();
  final TextEditingController tagsController = TextEditingController();

  Map<String, dynamic> game = {};

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<Map<String, dynamic>> fetchData() async {
    final response =
        await APIService().getGame("0453db9b-7086-4228-9a8f-38db68ed4181");
    try {
      //  print(json.decode(response.body));
      if (response.statusCode == 200) {
        setState(() {
          game = jsonDecode(response.body);
          selectdAgeRestriction =
              ageRestrictions.indexOf(game["ageRestriction"]);
          tagValues.addAll(game["tags"].cast<String>());
          predecessorValues.addAll(game["predecessors"].cast<String>());
          successorValues.addAll(game["successors"].cast<String>());
        });
        final Map<String, dynamic> responseData = json.decode(response.body);
        return responseData;
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        throw Exception('Failed to get game');
      }
    } catch (error) {
      print("Error: $error");
      throw Exception('Failed to get game');
    }
  }

  void getData() async {
    try {
      Map<String, dynamic> data = await fetchData();
      game = data;
    } catch (e) {
      print("Error fetching data: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    if (game == null || game.isEmpty) {
      // Show loading indicator or some placeholder
      return const CircularProgressIndicator();
    }
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Ludos'),
      ),
      backgroundColor: MyColors.darkBlue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const SizedBox(height: 20),
              getbox("Title", titleController, true, false, game["title"]),
              const SizedBox(height: 20),
              getbox("Coverlink", coverLinkController, true, false,
                  game["coverLink"]),
              const SizedBox(height: 20),
              getbox(
                  "Game Bio", gameBioController, true, true, game["gameBio"]),
              const SizedBox(height: 20),
              const Row(
                children: [
                  Text(
                    '*',
                    style: TextStyle(
                      color: Colors.red,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    "Age Restriction",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                Container(
                  padding: const EdgeInsets.only(),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20.0),
                    color: MyColors.white,
                    border: Border.all(
                      color: Colors.white,
                      width: 2.0,
                    ),
                  ),
                  child: CupertinoButton(
                    padding: const EdgeInsets.symmetric(horizontal: 50.0),
                    onPressed: () => _showDialog(
                      CupertinoPicker(
                        magnification: 1.22,
                        squeeze: 1.2,
                        useMagnifier: true,
                        itemExtent: 32.0,
                        scrollController: FixedExtentScrollController(
                          initialItem: selectdAgeRestriction,
                        ),
                        onSelectedItemChanged: (int selectedItem) {
                          setState(() {
                            selectdAgeRestriction = selectedItem;
                          });
                        },
                        children: List<Widget>.generate(ageRestrictions.length,
                            (int index) {
                          return Center(child: Text(ageRestrictions[index]));
                        }),
                      ),
                    ),
                    child: Text(
                      ageRestrictions[selectdAgeRestriction],
                      style: const TextStyle(color: MyColors.blue),
                    ),
                  ),
                ),
              ]),
              const SizedBox(height: 20),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text(
                  "Tags",
                  style: TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8.0),
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
              ]),
              const SizedBox(height: 20),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text(
                  "Predecessors",
                  style: TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8.0),
                TagEditor(
                  length: predecessorValues.length,
                  controller: predecessorsController,
                  delimiters: const [',', ' '],
                  hasAddButton: true,
                  resetTextOnSubmitted: true,
                  textStyle: const TextStyle(
                      color: MyColors.red, fontWeight: FontWeight.bold),
                  onSubmitted: (outstandingValue) {
                    setState(() {
                      predecessorValues.add(outstandingValue);
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
                      predecessorValues.add(newValue);
                    });
                  },
                  tagBuilder: (context, index) => _Chip(
                    index: index,
                    label: predecessorValues[index],
                    onDeleted: _onDeletepr,
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp(r'[/\\]'))
                  ],
                ),
              ]),
              const SizedBox(height: 20),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text(
                  "Successors",
                  style: TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8.0),
                TagEditor(
                  length: successorValues.length,
                  controller: successorsController,
                  delimiters: const [',', ' '],
                  hasAddButton: true,
                  resetTextOnSubmitted: true,
                  textStyle: const TextStyle(
                      color: MyColors.red, fontWeight: FontWeight.bold),
                  onSubmitted: (outstandingValue) {
                    setState(() {
                      successorValues.add(outstandingValue);
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
                      successorValues.add(newValue);
                    });
                  },
                  tagBuilder: (context, index) => _Chip(
                    index: index,
                    label: successorValues[index],
                    onDeleted: _onDeletes,
                  ),
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp(r'[/\\]'))
                  ],
                ),
                const SizedBox(
                  height: 20,
                ),
                Center(
                  child: TextButton(
                    style: TextButton.styleFrom(
                      backgroundColor: MyColors.lightBlue,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                    ),
                    onPressed: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => EditGamePageSecond(
                            title: titleController.text,
                            coverLink: coverLinkController.text,
                            gameBio: gameBioController.text,
                            ageRestriction:
                                ageRestrictions[selectdAgeRestriction],
                            tags: tagValues,
                            predecessors: predecessorValues,
                            successors: successorValues),
                      ));
                    },
                    child: const Text(
                      'Next',
                      style: TextStyle(
                        color: MyColors.white,
                        fontSize: 16.0,
                      ),
                    ),
                  ),
                ),
              ]),
            ],
          ),
        ),
      ),
    );
  }
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
