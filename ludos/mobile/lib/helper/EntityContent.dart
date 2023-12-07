class EntityContent {
  final String image;
  final String role;

  EntityContent({
    required this.image,
    required this.role,
  });

  Map<String, dynamic> toJson() {
    return {
      'image': image,
      'role': role,
    };
  }
}
