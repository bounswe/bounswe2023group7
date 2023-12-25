import 'package:flutter/material.dart';

class StyledRange {
  final int start;
  final int end;
  final String annotation;
  final TextStyle style;

  StyledRange(this.start, this.end, this.annotation, this.style);

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is StyledRange &&
          runtimeType == other.runtimeType &&
          start == other.start &&
          end == other.end;

  @override
  int get hashCode => start.hashCode ^ end.hashCode;
}
