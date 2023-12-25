import 'package:flutter/material.dart';

import '../helper/APIService.dart';
import '../userProvider.dart';
import 'custom_widgets.dart';

class LikeDislikeButton extends StatefulWidget{
  final UserProvider userProvider;
  final String id;
  final String? token;
  int numberOfLikes;
  bool isLiked;
  bool isDisliked;

  LikeDislikeButton({
    Key? key,
    required this.numberOfLikes,
    required this.isDisliked,
    required this.isLiked,
    required this.userProvider,
    required this.id,
    required this.token,
  }) : super(key: key);

  @override
  State<LikeDislikeButton> createState() => _LikeDislikeButtonState(
      isLiked: isLiked,
      isDisliked: isDisliked,
      numberOfLikes: numberOfLikes,
      userProvider: userProvider,
      id: id,
      token: token,
  );
}

class _LikeDislikeButtonState extends State<LikeDislikeButton> {
  bool isLiked = false;
  bool isDisliked = false;
  final UserProvider userProvider;
  final String id;
  final String? token;
  int numberOfLikes;

  _LikeDislikeButtonState({
    required this.numberOfLikes,
    required this.isLiked,
    required this.isDisliked,
    required this.userProvider,
    required this.id,
    required this.token,
  });

  Future<void> userPressed(bool like) async {
    if (like && isDisliked) {
      try {
        await APIService().likeThread(
            widget.token, widget.id);
      } catch (e) {
        throw Exception('Failed to like thread');
      }
      isDisliked = false;
      isLiked = true;
      setState(() {
        numberOfLikes = numberOfLikes! + 2;
      });
    } else if (!like && isDisliked) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.id);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isDisliked = false;
      setState(() {
        numberOfLikes = numberOfLikes! + 1;
      });
    } else if (!like && isLiked) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.id);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isLiked = false;
      isDisliked = true;

      setState(() {
        numberOfLikes = numberOfLikes! - 2;
      });
    } else if (like && isLiked) {
      try {
        await APIService().likeThread(
            widget.token, widget.id);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLiked = false;

      setState(() {
        numberOfLikes = numberOfLikes! - 1;
      });
    } else if (like) {
      try {
        await APIService().likeThread(
            widget.token, widget.id);
      } catch(e) {
        throw Exception('Failed to like thread');
      }
      isLiked = true;
      setState(() {
        numberOfLikes = numberOfLikes! + 1;
      });
    } else if(!like) {
      try {
        await APIService().dislikeThread(
            widget.token, widget.id);
      } catch(e) {
        throw Exception('Failed to dislike thread');
      }
      isDisliked = true;
      setState(() {
        numberOfLikes = numberOfLikes! - 1;
      });
    }
  }

  Widget build(BuildContext context){
    return Row(
      children: [
        IconButton(
          onPressed: () => setState(() {
            if(!widget.userProvider.isLoggedIn){
              CustomWidgets.needLoginSnackbar(context, "Please log in to like a thread! ", userProvider);
            } else {
              userPressed(true);
            }
          }),
          icon: Icon(
            Icons.thumb_up,
            color: isLiked ? Colors.green : Colors.white,
          ),
        ),
        Text(
          numberOfLikes.toString(),
          style: const TextStyle(color: Colors.white),
        ),
        IconButton(
          onPressed: () => setState(() {
            if(!widget.userProvider.isLoggedIn){
              CustomWidgets.needLoginSnackbar(context, "Please log in to dislike a thread! ", userProvider);
            } else {
              userPressed(false);
            }
          }),
          icon: Icon(
            Icons.thumb_down,
            color: isDisliked ? Colors.red : Colors.white,
          ),
        ),
      ],
    );
  }
}