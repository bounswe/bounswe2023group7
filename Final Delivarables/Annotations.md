## **Annotations**

### **Web:**
* ***Status:*** In our project, annotations have been successfully implemented across various sections, enhancing user interaction and content engagement. This includes *image annotations* for *thread images* and *text annotations* for game bios, stories, guides, trivia in the *game page*; entity descriptions in the *entity page*; thread texts, and comments in the *thread page*. This implementation has been tailored to foster a more interactive and informative experience for users, allowing them to add, view, and delete annotations in multiple pages within the platform.
* ***Compliance with W3C WADM:*** Our implementation strictly adheres to the W3C Web Annotation Data Model (WADM) standards. This compliance ensures that our annotation system is robust, interoperable, and aligns with global web standards. By following WADM, we've created a system where annotations are not only consistent across different parts of our platform but also potentially compatible with other systems using the same standards.
    * *According to W3C WADM, an annotation should consist of a body, a target, and context data. Here's how our implementation aligns with this:*
      ```
      // Format Annotation Data (example from your text annotation implementation)
        const formatAnnotationData = (annotation) => {
          return {
            "@context": "http://www.w3.org/ns/anno.jsonld",
            type: "Annotation",
            body: {
                type: "TextualBody",
                value: annotation.body[0].value,
                purpose: "commenting"
            },
            target: {
                source: window.location.href,
                selector: {
                    start: annotation.target.selector[1].start,
                    end: annotation.target.selector[1].end
                }
            }
            };
        };
        ```
            In this function:
            @context specifies the JSON-LD context for W3C WADM. 
            type is set to "Annotation".
            body contains the content of the annotation, its type, and purpose.
            target identifies where the annotation applies, including the source (URL) and the text selector (start and end positions).
                    
        * Our project uses RESTful API calls to interact with annotations. Here's an example that aligns with WADM standards:
         ```
        // Send Annotation Data to Server
        const sendAnnotationData = async (data, method) => {
            try {
            const url =`http://${process.env.REACT_APP_API_URL}/annotation/post/{threadId}`;
            const response = await axios.post(url, data);
            console.log(`Annotation ${method}d:`, response.data);
            } catch (error) {
            console.error(`Error ${method}ing annotation:`, error);
          }
      };
    ```
    In this function:
    Annotations are sent to the server using a POST request.
    The annotation data is structured in accordance with WADM, ensuring consistency and standardization.
    The server endpoint (/annotation/post/{threadId}) is designed to receive and process annotations in the WADM format.
* ***Implementation description***
1. **Image Annotations (Thread Page):** Implemented using the Annotorious library, we enabled users to annotate images in thread sections. Users can add comments to selected parts of an image and delete them, enhancing the visual content with interactive and informative notes.

2. **Text Annotations (Game Page & Entity Page):** For game-related content like bios, stories, guides, and trivia, as well as entity descriptions, we utilized the Recogito library. This feature allows users to highlight text segments and add and delete annotations, offering insights or additional information relevant to the selected text.

3. **Thread and Comment Annotations (Thread Page):** The thread and comments sections of the project are equipped with text annotation capabilities. This feature enhances user engagement, allowing users to create and delete annotations.

    **Technical Details:**

    * For initializing annotations, we ensured the DOM elements were available and used *useEffect* hooks for setup.
    * *useRef* was employed to manage the annotation instances, ensuring they are correctly initialized and destroyed based on the component lifecycle.
    * We included functions such as *onAnnotationCreated* and *onAnnotationDeleted* to handle annotation interactions.
    * AJAX calls via axios were used to interact with our backend, adhering to the WADM structure in our API requests and responses.

### **Mobile:**
* ***Status:*** In our mobile application, we have successfully integrated annotations into various content sections, including *Thread content, Comment content, Entity Description, and Game Bio content*. Currently, text annotations are available for all these sections, except for image annotation, which has not been implemented. It's important to note that since we only show *Game Bio* field in Game Pages, annotation is applicable for that field only within the context of games. Users of any type have the ability to contribute annotations to these fields. Upon visiting a page that has at least one annotation, users will encounter the annotated text. A simple click on the annotated text triggers a pop-up, showing additional details about the annotation.
* ***Compliance with W3C WADM:*** As mobile team, we stick to the rules of the W3C Web Annotation Data Model (WADM) to make sure our annotation system works well. This means our system is strong, can work with other systems, and follows the same rules as the entire web. The annotations in mobile and frontend work compatible thanks to this system.
* ***Implementation description:*** In Flutter, we didn't use any library to handle the annotation functionalities. The text annotation in specified pages and fields are very similar to each other. So, I will use Game Bio for example.
For any annotatable field, we used *SelectableText.rich* property. We added an *Annotate* button to the context menu, which is the menu that shows up when you long press some text. When you click it and type the your annotation, you can click the *Create Annotation* button in the popup. When this button is pressed, the related function in our API Service is called, for example: 
```
apiService.createAnnotationGameBio(
                              widget.token,
                              widget.id,
                              annotatedText,
                              start,
                              end,
                              annotationText);
```
This sends a POST request to our backend server. 
```
 Future<http.Response> createAnnotationGameBio(
      String? authToken,
      String gameID,
      String source,
      int start,
      int end,
      String annotationBody) async {
    var uri = Uri.parse("$baseURL/annotation/gamebio/$gameID");

    final body = jsonEncode(<String, Object>{
      '@context': "",
      'type': "Annotation",
      'body': annotationBody,
      'target': {
        'source': source,
        'selector': {'start': start, 'end': end}
      }
    });
    final response = await http.post(uri, body: body, headers: {
      'content-type': "application/json",
      'Authorization': 'Bearer $authToken'
    });
    return response;
  }
```
For building a page that includes annotation, in the *initState()* function of that page, we send a GET request to the backend server to get the annotations in that page. After getting the annotations, we build the field with the annotated texts in a different background color. When the user clicks an annotated text, a box which shows the annotation details will pop up.

* ***API calls examples to annotation server:*** [Postman Collection](https://api.postman.com/collections/22203914-387eae3e-9c2f-4cec-aeb5-50be244f29d5?access_key=PMAT-01HJV6MPTAGZCWQQR1NQ3WBB3G)
