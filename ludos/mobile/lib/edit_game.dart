import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:multi_dropdown/multiselect_dropdown.dart';
import 'helper/colors.dart';
import 'package:material_tag_editor/tag_editor.dart';
import 'edit_game_second.dart';
import 'helper/APIService.dart';
import 'userProvider.dart';

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
  final UserProvider userProvider;
  final String? token;
  final String id;
  const EditGamePage(
      {required this.id,
      required this.token,
      Key? key,
      required this.userProvider})
      : super(key: key);

  @override
  State<EditGamePage> createState() => _EditGamePageState();
}

class _EditGamePageState extends State<EditGamePage> {
  final APIService apiService = APIService();
  Map<String, dynamic> gameData = {};
  List<String> predecessorValues = [];
  List<String> successorValues = [];
  int selectdAgeRestriction = 0;
  List<String> ageRestrictions = ["3+", "7+", "12+", "16+", "18+"];

  Future<void> loadGameData() async {
    try {
      gameData = await apiService.getGame(widget.id, widget.token);
      print(gameData);
      setState(() {
        if (ageRestrictions.contains(gameData["ageRestriction"])) {
          selectdAgeRestriction =
              ageRestrictions.indexOf(gameData["ageRestriction"]);
        } else {
          selectdAgeRestriction = 0;
        }
        predecessorValues.addAll(gameData["predecessors"].cast<String>());
        successorValues.addAll(gameData["successors"].cast<String>());
      });
    } catch (e) {
      print('Error loading game data: $e');
    }
  }

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
  final MultiSelectController tagsController = MultiSelectController();

  List<String> tags = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Simulation',
    'Sports',
    'Fighting',
    'Horror',
    'Puzzle',
    'Multiplayer',
    'Indie',
    'RTS',
    'Racing',
    'Open World',
    'Educational',
    'VR',
    'Survival',
    'Story-Driven',
    'Retro',
    'Anime',
    'Hack and Slash',
    'Mystery',
    'Historical',
    'Sci-Fi',
    'Fantasy',
    'Comedy',
    'Artistic',
    'Puzzle-Platformer',
  ];

  @override
  void initState() {
    super.initState();
    loadGameData();
  }

  @override
  Widget build(BuildContext context) {
    if (gameData == null || gameData.isEmpty) {
      // Show loading indicator or some placeholder
      return const CircularProgressIndicator();
    }
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Edit Game'),
      ),
      backgroundColor: MyColors.darkBlue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const SizedBox(height: 20),
              getbox("Title", titleController, true, false, gameData["title"]),
              const SizedBox(height: 20),
              getbox("Coverlink", coverLinkController, true, false,
                  gameData["coverLink"]),
              const SizedBox(height: 20),
              getbox("Game Bio", gameBioController, true, true,
                  gameData["gameBio"]),
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
                    "Tags",
                    style: TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              MultiSelectDropDown(
                hint: "",
                borderRadius: 25.0,
                showClearIcon: true,
                controller: tagsController,
                onOptionSelected: (options) {},
                options: const <ValueItem>[
                  ValueItem(label: 'Action', value: 'Action'),
                  ValueItem(label: 'Adventure', value: 'Adventure'),
                  ValueItem(label: 'RPG', value: 'RPG'),
                  ValueItem(label: 'Strategy', value: 'Strategy'),
                  ValueItem(label: 'Simulation', value: 'Simulation'),
                  ValueItem(label: 'Sports', value: 'Sports'),
                  ValueItem(label: 'Fighting', value: 'Fighting'),
                  ValueItem(label: 'Horror', value: 'Horror'),
                  ValueItem(label: 'Puzzle', value: 'Puzzle'),
                  ValueItem(label: 'Multiplayer', value: 'Multiplayer'),
                  ValueItem(label: 'Indie', value: 'Indie'),
                  ValueItem(label: 'RTS', value: 'RTS'),
                  ValueItem(label: 'Racing', value: 'Racing'),
                  ValueItem(label: 'Open World', value: 'Open World'),
                  ValueItem(label: 'Educational', value: 'Educational'),
                  ValueItem(label: 'VR', value: 'VR'),
                  ValueItem(label: 'Survival', value: 'Survival'),
                  ValueItem(label: 'Story-Driven', value: 'Story-Driven'),
                  ValueItem(label: 'Retro', value: 'Retro'),
                  ValueItem(label: 'Anime', value: 'Anime'),
                  ValueItem(label: 'Hack and Slash', value: 'Hack and Slash'),
                  ValueItem(label: 'Mystery', value: 'Mystery'),
                  ValueItem(label: 'Historical', value: 'Historical'),
                  ValueItem(label: 'Sci-Fi', value: 'Sci-Fi'),
                  ValueItem(label: 'Fantasy', value: 'Fantasy'),
                  ValueItem(label: 'Comedy', value: 'Comedy'),
                  ValueItem(label: 'Artistic', value: 'Artistic'),
                  ValueItem(
                      label: 'Puzzle-Platformer', value: 'Puzzle-Platformer'),
                ],
                selectedOptions: (gameData["tags"] as List<dynamic>)
                    .where(
                        (dynamic item) => item is String && tags.contains(item))
                    .map((dynamic item) => ValueItem(label: item, value: item))
                    .toList(),
                selectionType: SelectionType.multi,
                chipConfig: const ChipConfig(
                    wrapType: WrapType.wrap,
                    backgroundColor: MyColors.lightBlue),
                dropdownHeight: 200,
                optionTextStyle: const TextStyle(fontSize: 16),
                selectedOptionTextColor: MyColors.blue,
                selectedOptionIcon: const Icon(
                  Icons.check_circle,
                  color: MyColors.lightBlue,
                ),
              ),
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
                            userProvider: widget.userProvider,
                            token: widget.token,
                            id: widget.id,
                            gameData: gameData,
                            title: titleController.text,
                            coverLink: coverLinkController.text,
                            gameBio: gameBioController.text,
                            ageRestriction:
                                ageRestrictions[selectdAgeRestriction],
                            tags: tagsController.selectedOptions
                                .map((item) => item.label)
                                .where((element) => element != null)
                                .map((e) => e!)
                                .toList(),
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
