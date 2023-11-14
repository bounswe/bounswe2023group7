import 'package:flutter/material.dart';

class SingleRatingIcon extends StatelessWidget {
  final IconData icon;
  final double size;
  final Color iconColor;
  final double rating;

  const SingleRatingIcon({super.key, required this.icon, required this.size, required this.iconColor, required this.rating});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      blendMode: BlendMode.srcATop,
      shaderCallback: (Rect rect) {
        return LinearGradient(
          stops: [0, rating / 10, rating / 10],
          colors: [iconColor, iconColor, iconColor.withOpacity(0)],
        ).createShader(rect);
      },
      child: SizedBox(
        width: size,
        height: size,
        child: Icon(icon, size: size, color: Colors.grey[900]),
      ),
    );
  }
}