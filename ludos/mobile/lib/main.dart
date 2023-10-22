import 'package:flutter/material.dart';
import 'package:footer/footer.dart';
import 'package:footer/footer_view.dart';

void main() => runApp(MaterialApp(
  home: Home(),
));

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFF6b415e),
        appBar: AppBar(
          backgroundColor: const Color(0xFF5f1a37),
          centerTitle: true,
          title: const Text('Ludos'),
          leading: IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.person_2,
              )
          ),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.notifications),
              tooltip: 'Comment Icon',
              onPressed: () {},
            ) //IconButton
          ],
        ),
        body: FooterView(
          footer: Footer(
              backgroundColor: Color(0xFF5f1a37),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.home)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.group)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.add_box)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.favorite)),
                  IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: const Icon(Icons.search_outlined)),
                ],
              ),
              padding: const EdgeInsets.all(10.0)
          ),
          children: <Widget>[
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.only(top: 15.0, bottom: 15.0),
                  child: const Text(
                    'r/<subforum_name>  1 hour ago \n '
                        'asdkjads',
                  ),
                ),
                //SizedBox(height: 5.0),
                const Divider(
                  height: 3.0,
                  thickness: 3.0,
                  color: Color(0xFF5f1a37),
                ),
                Container(
                  padding: const EdgeInsets.only(top: 15.0, bottom: 15.0),
                  child: const Text('Furkan'),
                ),
              ],

            ),
          ],
        )
    );
  }
}

/*
class Home extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        title: Text('Ludos'),
        centerTitle: true,
        backgroundColor: Colors.teal[500],
      ),

      body: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Text('Merhaba, Binnur'),
          FilledButton(onPressed: () {}, child: Text('click me')),
          Container(
            color: Colors.cyan,
            padding: EdgeInsets.all(15.0),
            child: Text('Container Word'),
          )
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Text(
          'CLICK',
          style: TextStyle(
            color: Colors.black,
          ),
        ),
        backgroundColor: Colors.red[600],
      ),
    );
  }
}
*/
