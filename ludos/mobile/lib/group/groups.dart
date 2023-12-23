import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/userProvider.dart';

import '../helper/colors.dart';
import '../reusable_widgets/custom_navigation_bar.dart';
import '../reusable_widgets/custom_widgets.dart';
import 'create_group.dart';

class GroupsPage extends StatefulWidget{
  final String? token;
  final UserProvider userProvider;

  const GroupsPage({
    Key? key,
    required this.token,
    required this.userProvider
  }) : super(key: key);

  @override
  State<GroupsPage> createState() => _GroupsPageState();
}

class _GroupsPageState extends State<GroupsPage> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: MyColors.darkBlue,
      appBar: AppBar(
        backgroundColor: const Color(0xFFf89c34),
        title: const Text('Groups'),
        actions: [
          TextButton(
            onPressed: () {
              if (widget.userProvider.isLoggedIn) {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => CreateGroupPage(token: widget.token, userProvider: widget.userProvider),
                ));
              } else {
                CustomWidgets.needLoginSnackbar(context, "Please log in to create a group!");
              }
            },
            child: const Icon(
              Icons.add,
              color: Colors.white,
            ),
          )
        ],
      ),
      bottomNavigationBar: CustomNavigationBar(userProvider: widget.userProvider),
    );
  }

}