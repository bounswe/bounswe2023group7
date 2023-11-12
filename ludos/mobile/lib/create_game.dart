import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'helper/colors.dart';
import 'package:material_tag_editor/tag_editor.dart';
import 'helper/APIService.dart';

Widget getbox(
    String hintText, TextEditingController controller, bool isMandatory) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Row(
        children: [
          if (isMandatory)
            const Text(
              '*',
              style: TextStyle(
                color: MyColors.red,
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
      SizedBox(height: 8.0), // Adjust the spacing as needed
      TextFormField(
        controller: controller,
        style: const TextStyle(color: MyColors.red),
        decoration: InputDecoration(
          filled: true,
          fillColor: MyColors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10.0),
            borderSide: const BorderSide(
              color: Colors.white,
              width: 2.0,
            ),
          ),
          hintText: '',
          labelText: '',
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: MyColors.lightBlue, width: 2.0),
            borderRadius: BorderRadius.circular(10.0),
          ),
        ),
        cursorColor: MyColors.lightBlue,
      ),
    ],
  );
}

class CreateGamePage extends StatefulWidget {
  const CreateGamePage({Key? key}) : super(key: key);

  @override
  State<CreateGamePage> createState() => _CreateGamePageState();
}

class _CreateGamePageState extends State<CreateGamePage> {
  List<String> predecessorValues = [];
  List<String> successorValues = [];
  List<String> platformValues = [];
  List<String> tagValues = [];

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

  _onDeletepl(index) {
    setState(() {
      platformValues.removeAt(index);
    });
  }

  _onDeletet(index) {
    setState(() {
      tagValues.removeAt(index);
    });
  }

  final TextEditingController titleController = TextEditingController();
  final TextEditingController coverLinkController = TextEditingController();
  final TextEditingController systemRequirementsController =
      TextEditingController();
  final TextEditingController predecessorsController = TextEditingController();
  final TextEditingController successorsController = TextEditingController();
  final TextEditingController gameGuideController = TextEditingController();
  final TextEditingController gameStoryController = TextEditingController();
  final TextEditingController platformsController = TextEditingController();
  final TextEditingController ageRestrictionController =
      TextEditingController();
  final TextEditingController gameBioController = TextEditingController();
  final TextEditingController tagsController = TextEditingController();
  final TextEditingController releaseDateController = TextEditingController();
  final TextEditingController developerController = TextEditingController();
  final TextEditingController publisherController = TextEditingController();
  final TextEditingController triviaController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: MyColors.orange,
        centerTitle: true,
        title: const Text('Ludos'),
        actions: [
          TextButton(
            onPressed: () async {
              http.Response token = await APIService().createGame(
                  titleController.text,
                  coverLinkController.text,
                  systemRequirementsController.text,
                  predecessorValues,
                  successorValues,
                  gameGuideController.text,
                  gameStoryController.text,
                  platformValues,
                  ageRestrictionController.text,
                  gameBioController.text,
                  tagValues,
                  releaseDateController.text,
                  developerController.text,
                  publisherController.text,
                  triviaController.text);
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
                        Text(
                          'Your game is created successfully.',
                          style: TextStyle(
                            color: MyColors.blue,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    backgroundColor: MyColors.blue2,
                    duration: const Duration(seconds: 10),
                    action: SnackBarAction(
                      label: 'OK',
                      textColor: MyColors.blue,
                      onPressed: () {
                        ScaffoldMessenger.of(context).hideCurrentSnackBar();
                      },
                    ),
                  ),
                );
              } else if (token.statusCode == 409) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: SizedBox(
                      width: MediaQuery.of(context).size.width,
                      child: Text(
                        json.decode(token.body)["message"],
                        style: const TextStyle(
                          color: MyColors.blue,
                          fontSize: 16,
                        ),
                      ),
                    ),
                    backgroundColor: MyColors.blue2,
                    duration: const Duration(seconds: 10),
                    action: SnackBarAction(
                      label: 'OK',
                      textColor: MyColors.blue,
                      onPressed: () {
                        ScaffoldMessenger.of(context).hideCurrentSnackBar();
                      },
                    ),
                  ),
                );
              }
            },
            child: const Text(
              'Save Game',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
      backgroundColor: MyColors.blue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const SizedBox(height: 50),
              getbox("Title", titleController, true),
              const SizedBox(height: 20),
              getbox("Coverlink", coverLinkController, false),
              const SizedBox(height: 20),
              getbox(
                  "System Requirements", systemRequirementsController, false),
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
                  // This is set to grey just to illustrate the `textStyle` prop
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
                      borderRadius: BorderRadius.circular(10.0),
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
                      borderRadius: BorderRadius.circular(10.0),
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
                  // InputFormatters example, this disallow \ and /
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
                  // This is set to grey just to illustrate the `textStyle` prop
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
                      borderRadius: BorderRadius.circular(10.0),
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
                      borderRadius: BorderRadius.circular(10.0),
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
                  // InputFormatters example, this disallow \ and /
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp(r'[/\\]'))
                  ],
                ),
              ]),
              const SizedBox(height: 20),
              getbox("Game Guide", gameGuideController, false),
              const SizedBox(height: 20),
              getbox("Game Story", gameStoryController, false),
              const SizedBox(height: 20),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text(
                  "Platforms",
                  style: TextStyle(
                    color: MyColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8.0),
                TagEditor(
                  length: platformValues.length,
                  controller: platformsController,
                  delimiters: const [',', ' '],
                  hasAddButton: true,
                  resetTextOnSubmitted: true,
                  // This is set to grey just to illustrate the `textStyle` prop
                  textStyle: const TextStyle(
                      color: MyColors.red, fontWeight: FontWeight.bold),
                  onSubmitted: (outstandingValue) {
                    setState(() {
                      platformValues.add(outstandingValue);
                    });
                  },
                  inputDecoration: InputDecoration(
                    filled: true,
                    fillColor: MyColors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
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
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  onTagChanged: (newValue) {
                    setState(() {
                      platformValues.add(newValue);
                    });
                  },
                  tagBuilder: (context, index) => _Chip(
                    index: index,
                    label: platformValues[index],
                    onDeleted: _onDeletepl,
                  ),
                  // InputFormatters example, this disallow \ and /
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp(r'[/\\]'))
                  ],
                ),
              ]),
              const SizedBox(height: 20),
              getbox("Age Restriction", ageRestrictionController, false),
              const SizedBox(height: 20),
              getbox("Game Bio", gameBioController, true),
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
                  // This is set to grey just to illustrate the `textStyle` prop
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
                      borderRadius: BorderRadius.circular(10.0),
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
                      borderRadius: BorderRadius.circular(10.0),
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
                  // InputFormatters example, this disallow \ and /
                  inputFormatters: [
                    FilteringTextInputFormatter.deny(RegExp(r'[/\\]'))
                  ],
                ),
              ]),
              const SizedBox(height: 20),
              getbox("Release Date", releaseDateController, true),
              const SizedBox(height: 20),
              getbox("Developer", developerController, true),
              const SizedBox(height: 20),
              getbox("Publisher", publisherController, true),
              const SizedBox(height: 20),
              getbox("Trivia", triviaController, false),
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
