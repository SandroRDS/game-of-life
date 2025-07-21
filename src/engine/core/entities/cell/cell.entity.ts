import type { Coordinate } from '@src/common/types/coordinate';
import { CellStatus } from './cell.enums';

class Cell {
  private coordinate: Coordinate;
  private status: CellStatus = CellStatus.Dead;

  public constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}

export default Cell;
