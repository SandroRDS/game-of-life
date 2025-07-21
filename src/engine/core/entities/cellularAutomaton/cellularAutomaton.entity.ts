import Cell from '../cell/cell.entity';
import { cellularAutomatonOptionsSchema } from './cellularAutomaton.schemas';
import type { CellularAutomatonOptions } from './cellularAutomaton.types';

class CellularAutomaton {
  private cells: Map<string, Cell> = new Map();

  constructor(options: CellularAutomatonOptions) {
    const validatedOptions = cellularAutomatonOptionsSchema.parse(options);

    this.generateCells(validatedOptions.horizontalLength, validatedOptions.verticalLength);
  }

  private generateCells(horizontalLength: number, verticalLength: number) {
    for (let horizontalIndex = 1; horizontalIndex <= horizontalLength; horizontalIndex++) {
      for (let verticalIndex = 1; verticalIndex <= verticalLength; verticalIndex++) {
        const coordinate = {
          x: horizontalIndex,
          y: verticalIndex,
        };

        this.cells.set(`${coordinate.x}:${coordinate.y}`, new Cell(coordinate));
      }
    }
  }
}

export default CellularAutomaton;
