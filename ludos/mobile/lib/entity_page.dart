import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/helper/APIService.dart';
import 'package:ludos_mobile_app/helper/colors.dart';
import 'package:ludos_mobile_app/reusable_widgets/custom_navigation_bar.dart';
import 'package:ludos_mobile_app/userProvider.dart';

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
    loadEntityData();
  }
List<Widget> createTextWidgets(Map<String, dynamic> entityData) {
  List<Widget> list = [];

  if (entityData.isNotEmpty) {
    entityData.forEach((key, value) {
      if (key != "image" && key != "description" && key != "Image Link") {
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
     return SelectionArea(contextMenuBuilder:(context, editableTextState) {
      final List<ContextMenuButtonItem> buttonItems = editableTextState.contextMenuButtonItems;
      buttonItems.insert(
        0,
        ContextMenuButtonItem(
          label: 'Annotate',
          onPressed: () {
            // Annotation code    
          },
        ),
      );
      return AdaptiveTextSelectionToolbar.buttonItems(
        anchors: editableTextState.contextMenuAnchors,
        buttonItems: buttonItems,
      );
    },
        child: Scaffold(
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
                    (entityData['content']['image'] != null || entityData['content']['Image Link'] != null))
                  Image.network(
                    entityData['content']['image'] ?? entityData['content']['Image Link'] ?? "",
                    width: 200,
                    height: 200,
                    errorBuilder: (BuildContext context, Object exception,
                        StackTrace? stackTrace) {
                      return const Text('');
                    },
                    fit: BoxFit.fill,
                  ),
                const SizedBox(height: 20.0),
                if (entityData['description'] != null)
                  Text(
                    entityData['description'].toString(),
                    style: const TextStyle(
                      color: MyColors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
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
    ));
  }
}
