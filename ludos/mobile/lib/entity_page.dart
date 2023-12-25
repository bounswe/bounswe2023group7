import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/helper/APIService.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/userProvider.dart';

import 'reusable_widgets/styledRange.dart';

class EntityPage extends StatefulWidget {
  final VoidCallback onRefresh;
  final UserProvider userProvider;
  final String? token;
  final String id;
  const EntityPage(
      {required this.id,
      required this.token,
      Key? key,
      required this.userProvider,
      required this.onRefresh})
      : super(key: key);
  @override
  State<EntityPage> createState() => _EntityPageState();
}

class _EntityPageState extends State<EntityPage> {
  Map<String, dynamic> entityData = {};
  late List<StyledRange> annotations = [];
  final APIService apiService = APIService();

  Future<void> loadEntityData() async {
    try {
      entityData = await apiService.getEntity(widget.id, widget.token);
      print(entityData);
      setState(() {});
    } catch (e) {
      print('Error loading game data: $e');
    }
  }

  @override
  initState() {
    super.initState();
    ToListAnnotation(getStyledRanges());
    loadEntityData();
  }

  Future<void> ToListAnnotation(
      Future<List<StyledRange>> annotationList) async {
    annotations = await annotationList;
  }

  void showAnnotation(BuildContext context, String annotationText) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: MyColors.darkBlue,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(
                20.0,
              ),
            ),
          ),
          contentPadding: const EdgeInsets.only(
            top: 10.0,
          ),
          title: const Text(
            "Annotation",
            style: TextStyle(fontSize: 20.0, color: MyColors.white),
          ),
          content: Container(
            height: 140,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      annotationText,
                      style:
                          const TextStyle(fontSize: 15, color: MyColors.white),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.red,
                        ),
                        child: const Text("Close",
                            style: TextStyle(color: MyColors.white)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  void createAnnotation(
      BuildContext context, String annotatedText, int start, int end) {
    String annotationText =
        ""; // Add a variable to store the text from the TextFormField

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: MyColors.darkBlue,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(
                20.0,
              ),
            ),
          ),
          contentPadding: const EdgeInsets.only(
            top: 10.0,
          ),
          title: const Text(
            "Annotate the Text",
            style: TextStyle(fontSize: 20.0, color: MyColors.white),
          ),
          content: Container(
            height: 180,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: TextFormField(
                      onChanged: (value) {
                        annotationText = value;
                      },
                      style:
                          const TextStyle(fontSize: 15, color: MyColors.white),
                      decoration: InputDecoration(
                        hintText: "Enter annotation",
                        hintStyle:
                            TextStyle(color: MyColors.white.withOpacity(0.5)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.red,
                        ),
                        child: const Text("Cancel",
                            style: TextStyle(color: MyColors.white)),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // Call the API to create the annotation
                         APIService()
                              .createAnnotationEntity(widget.token, widget.id,
                                  annotatedText, start, end, annotationText);
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: MyColors.green,
                        ),
                        child: const Text("Annotate",
                            style: TextStyle(color: MyColors.white)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

List<TextSpan> buildStyledText(String text, List<StyledRange> styledRanges) {
  List<TextSpan> textSpans = [];
  styledRanges.sort((a, b) => a.start.compareTo(b.start));
  int currentIndex = 0;
  
  Set<StyledRange> uniqueRanges = styledRanges.toSet();
  styledRanges = uniqueRanges.toList();
  for (var i = 0; i < styledRanges.length; i++) {
    var styledRange = styledRanges[i];

    // Check for overlapping ranges
    if (styledRange.start < currentIndex) {
      continue; // Skip overlapping ranges
    }

    // Add the unstyled text before the current range
    textSpans.add(
      TextSpan(
        text: text.substring(currentIndex, styledRange.start),
        style: const TextStyle(
          color: MyColors.white,
          fontWeight: FontWeight.bold,
          fontSize: 16,
        ),
      ),
    );

    // Add the styled text within the current range
    textSpans.add(
      TextSpan(
        recognizer: TapGestureRecognizer()
          ..onTap = () {
            showAnnotation(context, styledRange.annotation);
          },
        text: text.substring(styledRange.start, styledRange.end),
        style: styledRange.style,
      ),
    );

    // Update the current index
    currentIndex = styledRange.end;
  }

  // Add any remaining unstyled text after the last range
  if (currentIndex < text.length) {
    textSpans.add(
      TextSpan(
        text: text.substring(currentIndex),
        style: const TextStyle(
          color: MyColors.white,
          fontWeight: FontWeight.bold,
          fontSize: 16,
        ),
      ),
    );
  }

  return textSpans;
}

  Future<List<StyledRange>> getStyledRanges() async {
    final response =
        await APIService().getAnnotationEntity(widget.token, widget.id);
    try {
      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);
        return Future.wait(
            responseData.map<Future<StyledRange>>((dynamic item) async {
          return StyledRange(
              item['target']['selector']['start'],
              item['target']['selector']['end'],
              item['body'],
              const TextStyle(
                backgroundColor: MyColors.blue,
                color: MyColors.white,
                fontSize: 16,
              ));
        }).toList());
      } else {
        print("Error: ${response.statusCode} - ${response.body}");
        return [];
      }
    } catch (error) {
      print("Error: $error");
      return [];
    }
  }

  List<Widget> createTextWidgets(Map<String, dynamic> entityData) {
    List<Widget> list = [];

    if (entityData.isNotEmpty) {
      entityData.forEach((key, value) {
        if (key != "image" && key != "description") {
          // Create a row with two boxes for key and value
          list.add(Container(
            margin: const EdgeInsets.only(
                bottom: 8), // Adjust bottom margin as needed
            child: Row(
              children: [
                // Box for key
                Expanded(
                  child: Container(
                    margin: const EdgeInsets.only(right: 8),
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: MyColors.blue2, // Adjust border color as needed
                        width: 2, // Adjust border width as needed
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      key.toString()[0].toUpperCase() +
                          key.toString().substring(1),
                      style: const TextStyle(
                        color: MyColors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ),
                // Box for value
                Expanded(
                  child: Container(
                    margin: const EdgeInsets.only(right: 8),
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: MyColors.blue2, // Adjust border color as needed
                        width: 2, // Adjust border width as needed
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      value.toString()[0].toUpperCase() +
                          value.toString().substring(1),
                      style: const TextStyle(
                        color: MyColors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ));
        }
      });
    }

    return list;
  }

  List<Text> prepare(Map<String, dynamic> entityData) {
    List<Text> list = [];
    if (entityData.isNotEmpty) {
      entityData.forEach((key, value) {
        list.add(Text(
          key.toString() + value.toString(), // content yani aslında
          style: const TextStyle(
            color: MyColors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ));
      });
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: Text('${entityData['name']}'),
      ),
      body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                if (entityData['content'] != null &&
                    entityData['content']['image'] != null)
                  Image.network(
                    width: 200,
                    height: 200,
                    entityData['content']['image'].toString(),
                    errorBuilder: (BuildContext context, Object exception,
                        StackTrace? stackTrace) {
                      return const Text('');
                    },
                    fit: BoxFit.fill,
                  ),
                const SizedBox(height: 20.0),
                if (entityData['description'] != null)
                  SelectableText.rich(
                    TextSpan(
                        children: buildStyledText(
                            entityData['description'].toString(), annotations)),
                    style: const TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.left,
                    contextMenuBuilder: (context, editableTextState) {
                      final List<ContextMenuButtonItem> buttonItems =
                          editableTextState.contextMenuButtonItems;
                      buttonItems.insert(
                        0,
                        ContextMenuButtonItem(
                          label: 'Annotate',
                          onPressed: () {
                            // Annotation code
                            TextSelection text =
                                editableTextState.textEditingValue.selection;
                            String annotatedText = editableTextState
                                .textEditingValue.text
                                .substring(text.baseOffset, text.extentOffset);
                            createAnnotation(context, annotatedText,
                                text.baseOffset, text.extentOffset);
                          },
                        ),
                      );
                      return AdaptiveTextSelectionToolbar.buttonItems(
                        anchors: editableTextState.contextMenuAnchors,
                        buttonItems: buttonItems,
                      );
                    },
                  ),
                const SizedBox(height: 10),
                const Divider(
                  height: 3.0,
                  thickness: 2.0,
                  color: Color(0xFFFFFFFF),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Entity Properties:',
                  style: TextStyle(
                    color: MyColors.lightBlue,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 10),
                if (entityData.isNotEmpty)
                  ...createTextWidgets(entityData['content']),
              ])),
      bottomNavigationBar:
          CustomNavigationBar(userProvider: widget.userProvider),
    );
  }
}
