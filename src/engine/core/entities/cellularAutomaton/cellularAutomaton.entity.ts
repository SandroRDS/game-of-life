import type { Coordinate } from '@src/common/types/coordinate';
import Cell from '../cell/cell.entity';
import { cellularAutomatonSizeSchema } from './cellularAutomaton.schemas';
import type { CellularAutomatonSize } from './cellularAutomaton.types';
import coordinateSchema from '@src/common/schemas/coordinate';
import generateCoordinateKey from '@src/engine/utils/generateCoordinateKey';

class CellularAutomaton {
  public size: CellularAutomatonSize;
  private aliveCells: Map<string, Cell> = new Map();

  constructor(size: CellularAutomatonSize) {
    const validatedSize = cellularAutomatonSizeSchema.parse(size);

    this.size = validatedSize;
  }

  public advanceToNextGeneration() {

  }

  public createCell(coordinate: Coordinate) {
    const validatedCoordinate = coordinateSchema
      .extend({
        x: coordinateSchema.shape.x.lte(this.size.horizontal),
        y: coordinateSchema.shape.x.lte(this.size.vertical),
      })
      .parse(coordinate);

    this.aliveCells.set(generateCoordinateKey(validatedCoordinate), new Cell(validatedCoordinate));
  }

  public getAliveCellsCoordinates() {
    return new Set<string>(this.aliveCells.keys());
  }
}

export default CellularAutomaton;
