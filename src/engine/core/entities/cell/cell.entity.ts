import type { Coordinate } from '@src/common/types/coordinate';

class Cell {
  private coordinate: Coordinate;

  public constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}

export default Cell;
