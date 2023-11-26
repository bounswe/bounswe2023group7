import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/games_page.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:multi_dropdown/multiselect_dropdown.dart';
import 'helper/colors.dart';
import 'helper/APIService.dart';

Widget getbox(String hintText, TextEditingController controller,
    bool isMandatory, bool multiLine) {
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

String formatDateTime(DateTime dateTime) {
  final months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  String month = months[dateTime.month - 1];
  String day = dateTime.day.toString();
  String year = dateTime.year.toString();

  return '$month $day, $year';
}

class CreateGamePageSecond extends StatefulWidget {
  final UserProvider userProvider;
  final String? token;
  final String title;
  final String coverLink;
  final String gameBio;
  final String ageRestriction;
  final List<String> tags;
  final List<String> predecessors;
  final List<String> successors;

  const CreateGamePageSecond(
      {Key? key,
      required this.userProvider,
      required this.token,
      required this.title,
      required this.coverLink,
      required this.gameBio,
      required this.ageRestriction,
      required this.tags,
      required this.predecessors,
      required this.successors})
      : super(key: key);

  @override
  State<CreateGamePageSecond> createState() => _CreateGamePageStateSecond();
}

class _CreateGamePageStateSecond extends State<CreateGamePageSecond> {
  DateTime date = DateTime(2016, 10, 24);
  List<String> selectedOptions = [];
  List<String> platforms = [
    'Android',
    'iOS',
    'Windows',
    'macOS',
    'Linux',
    'PlayStation',
    'Xbox',
    'Nintendo Switch',
    'Board Game',
    'VR'
  ];

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

  final TextEditingController systemRequirementsController =
      TextEditingController();
  final TextEditingController gameGuideController = TextEditingController();
  final TextEditingController gameStoryController = TextEditingController();
  final TextEditingController developerController = TextEditingController();
  final TextEditingController publisherController = TextEditingController();
  final TextEditingController triviaController = TextEditingController();
  final MultiSelectController platformsController = MultiSelectController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Create Game'),
      ),
      backgroundColor: MyColors.darkBlue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const SizedBox(height: 20),
                getbox("Game Story", gameStoryController, true, true),
                const SizedBox(height: 20),
                getbox("Game Guide", gameGuideController, false, true),
                const SizedBox(height: 20),
                const Row(
                  children: [
                    Text(
                      "Release Date",
                      style: TextStyle(
                        color: MyColors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
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
                    child: SizedBox(
                      height: 30.0,
                      width: 200.0,
                      child: CupertinoButton(
                        padding: const EdgeInsets.symmetric(horizontal: 50.0),
                        onPressed: () => _showDialog(
                          CupertinoDatePicker(
                            dateOrder: DatePickerDateOrder.dmy,
                            initialDateTime: date,
                            mode: CupertinoDatePickerMode.date,
                            use24hFormat: true,
                            onDateTimeChanged: (DateTime newDate) {
                              setState(() => date = newDate);
                            },
                          ),
                        ),
                        child: Text(
                          '${date.day}.${date.month}.${date.year}',
                          style: const TextStyle(
                            color: MyColors.blue,
                            fontSize: 18.0,
                          ),
                        ),
                      ),
                    ),
                  ),
                ]),
                const SizedBox(height: 20),
                getbox("System Requirements", systemRequirementsController,
                    true, false),
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
                      "Platforms",
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
                  controller: platformsController,
                  onOptionSelected: (options) {},
                  options: const <ValueItem>[
                    ValueItem(label: 'Android', value: 'Android'),
                    ValueItem(label: 'iOS', value: 'iOS'),
                    ValueItem(label: 'Windows', value: 'Windows'),
                    ValueItem(label: 'macOS', value: 'macOS'),
                    ValueItem(label: 'Linux', value: 'Linux'),
                    ValueItem(label: 'PlayStation', value: 'PlayStation'),
                    ValueItem(label: 'Xbox', value: 'Xbox'),
                    ValueItem(
                        label: 'Nintendo Switch', value: 'Nintendo Switch'),
                    ValueItem(label: 'Board Game', value: 'Board Game'),
                    ValueItem(label: 'VR', value: 'VR'),
                  ],
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
                getbox("Developer", developerController, true, false),
                const SizedBox(height: 20),
                getbox("Game Publisher", publisherController, true, false),
                const SizedBox(height: 20),
                getbox("Trivia", triviaController, false, false),
                const SizedBox(height: 20),
                TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: MyColors.lightBlue,
                  ),
                  onPressed: () async {
                    http.Response token = await APIService().createGame(
                        widget.token,
                        widget.title,
                        widget.coverLink,
                        systemRequirementsController.text,
                        widget.predecessors,
                        widget.successors,
                        gameGuideController.text,
                        gameStoryController.text,
                        platformsController.selectedOptions
                            .map((item) => item.label)
                            .where((element) => element != null)
                            .map((e) => e!)
                            .toList(),
                        widget.ageRestriction,
                        widget.gameBio,
                        widget.tags,
                        formatDateTime(date),
                        developerController.text,
                        publisherController.text,
                        triviaController.text);
                    if (token.statusCode == 201) {
                      ScaffoldMessenger.of(context)
                          .showSnackBar(
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
                                      'Your game is created successfully. You will be redirected to the Games Page.',
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
                                  ScaffoldMessenger.of(context)
                                      .hideCurrentSnackBar();
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => GamesPage(
                                            token: widget.token,
                                            userProvider: widget.userProvider)),
                                  );
                                },
                              ),
                            ),
                          )
                          .closed
                          .then((reason) => Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => GamesPage(
                                        token: widget.token,
                                        userProvider: widget.userProvider)),
                              ));
                    } else {
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
                              ScaffoldMessenger.of(context)
                                  .hideCurrentSnackBar();
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
              ]),
        ),
      ),
    );
  }
}
