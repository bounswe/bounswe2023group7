import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ludos_mobile_app/helper/APIService.dart';
import 'package:ludos_mobile_app/userProvider.dart';
import 'helper/colors.dart';

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

class CreateEntityPage extends StatefulWidget {
  final String? token;
  final UserProvider userProvider;
  final String gameID;
  const CreateEntityPage(
      {Key? key,
      required this.token,
      required this.userProvider,
      required this.gameID})
      : super(key: key);

  @override
  State<CreateEntityPage> createState() => _CreateEntityPageState();
}

class _CreateEntityPageState extends State<CreateEntityPage> {
  int selectedEntityType = 0;
  List<String> entityTypes = [
    'Character',
    'Item',
    'Environment',
    'Package',
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

  final TextEditingController nameController = TextEditingController();
  final TextEditingController contentController = TextEditingController();
  final TextEditingController imageController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2f5b7a),
        centerTitle: true,
        title: const Text('Create Entity'),
      ),
      backgroundColor: MyColors.darkBlue,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
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
                      "Entity Type",
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
                            initialItem: selectedEntityType,
                          ),
                          onSelectedItemChanged: (int selectedItem) {
                            setState(() {
                              selectedEntityType = selectedItem;
                            });
                          },
                          children: List<Widget>.generate(entityTypes.length,
                              (int index) {
                            return Center(child: Text(entityTypes[index]));
                          }),
                        ),
                      ),
                      child: Text(
                        entityTypes[selectedEntityType],
                        style: const TextStyle(color: MyColors.blue),
                      ),
                    ),
                  ),
                ]),
                const SizedBox(height: 20),
                getbox("Entity Name", nameController, true, false),
                const SizedBox(height: 20),
                getbox("Coverlink", imageController, true, false),
                const SizedBox(height: 20),
                getbox("Entity Content", contentController, true, true),
                const SizedBox(height: 20),
                TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: MyColors.lightBlue,
                  ),
                  onPressed: () async {
                     http.Response token = await APIService().createEntity(
                        widget.token,
                        widget.gameID,
                        entityTypes[selectedEntityType].toLowerCase(),
                        nameController.text,
                        imageController.text,
                        contentController.text);
                    if (token.statusCode == 201 || token.statusCode == 200) {
                      print("status code:" + token.statusCode.toString());
                      print(token);
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
                                  'Your entity is created successfully.',
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
                            },
                          ),
                        ),
                      );
                    } else {
                      print(token.body);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: SizedBox(
                            width: MediaQuery.of(context).size.width,
                            child: Text(
                              json.decode(token.body),
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
                    'Save Entity',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ]),
        ),
      ),
    );
  }
}
/* 
   ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => CreateEntityPage(
                      gameID: widget.id,
                      token: widget.token,
                      userProvider: widget.userProvider),
                ));

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
                                'Please log in to create entity',
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
                          label: 'Log In',
                          textColor: MyColors.blue,
                          onPressed: () {
                            ScaffoldMessenger.of(context).hideCurrentSnackBar();
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => LoginPage()),
                            );
                          },
                        ),
                      ),
                    )
                    .closed
                    .then((reason) => {});
              },
              child: const Text("Create Entity"),
            ),
*/