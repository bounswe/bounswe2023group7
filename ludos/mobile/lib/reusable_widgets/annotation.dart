import 'package:flutter/material.dart';
import 'package:ludos_mobile_app/helper/colors.dart';

class Annotation {
  final String text;
  final String note;

  Annotation(this.text, this.note);

  static createAnnotation(BuildContext context, String annotatedText) {
  String annotationText = ""; // Add a variable to store the text from the TextFormField

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
                    style: const TextStyle(fontSize: 15, color: MyColors.white),
                    decoration: InputDecoration(
                      hintText: "Enter annotation",
                      hintStyle: TextStyle(color: MyColors.white.withOpacity(0.5)),
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
                        Annotation annotation = Annotation(annotationText, "note");
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

}
