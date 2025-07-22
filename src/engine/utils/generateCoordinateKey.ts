import type { Coordinate } from '@src/common/types/coordinate';

const generateCoordinateKey = (coordinate: Coordinate) => {
  return `${coordinate.x}:${coordinate.y}`;
};

export default generateCoordinateKey;
