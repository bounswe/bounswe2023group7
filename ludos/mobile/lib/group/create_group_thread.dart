import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/group/group_page.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_widgets.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'package:material_tag_editor/tag_editor.dart';
import '../helper/colors.dart';
import '../helper/APIService.dart';

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

class CreateGroupThreadPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String gameid;
  final String groupId;
  const CreateGroupThreadPage({
    Key? key,
    required this.groupId,
    required this.gameid,
    required this.token,
    required this.userProvider,
  }) : super(key: key);

  @override
  State<CreateGroupThreadPage> createState() => _CreateGroupThreadPageState();
}

class _CreateGroupThreadPageState extends State<CreateGroupThreadPage> {
  List<String> tagValues = [];
  List<String> media = [];

  _onDeletet(index) {
    setState(() {
      tagValues.removeAt(index);
    });
  }

  final TextEditingController titleController = TextEditingController();
  final TextEditingController bodyController = TextEditingController();
  final TextEditingController tagsController = TextEditingController();
  final TextEditingController coverLinkController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Create Thread'),
      ),
      backgroundColor: MyColors.darkBlue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const SizedBox(height: 20),
                getbox("Title", titleController, true, false),
                const SizedBox(height: 20),
                getbox("Body", bodyController, true, true),
                const SizedBox(height: 20),
                getbox("Media", coverLinkController, false, false),
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
                      http.Response token = await APIService().createGroupThread(
                          widget.token,
                          titleController.text,
                          bodyController.text,
                          [coverLinkController.text],
                          tagValues,
                          widget.gameid,
                          widget.groupId);
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
                                        'Your thread is created successfully. You will be redirected to the Group.',
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
                                          builder: (context) => GroupPage(
                                              groupId: widget.groupId,
                                              token: widget.token,
                                              userProvider:
                                              widget.userProvider,
                                              onRefresh: () {},
                                              )
                                      ),
                                    );
                                  },
                                ),
                              ),
                            )
                            .closed
                            .then((reason) => Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => GroupPage(
                                              groupId: widget.groupId,
                                              token: widget.token,
                                              userProvider:
                                              widget.userProvider,
                                              onRefresh: () {},
                                              )),
                                ));
                      } else {
                        CustomWidgets.statusNotOkay(
                            context, json.decode(token.body)["message"]);
                      }
                    },
                    child: const Text(
                      'Save Thread',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ]),
              ]),
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
