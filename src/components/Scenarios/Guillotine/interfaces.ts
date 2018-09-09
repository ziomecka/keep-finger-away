export interface Measures {
  x?: number | undefined;
  y?: number | undefined;
  pageY?: number | undefined;
  height?: number | undefined;
};

export interface Element {
  touchable: Measures;
  blade: Measures;
};
