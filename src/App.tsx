import useGame from './engine/hooks/useGame';
import generateCoordinateKey from './engine/utils/generateCoordinateKey';

function App() {
  const game = useGame();

  if (!game.gameIsReady) return <p>Carregando...</p>;

  const {
    horizontal: horizontalSize,
    vertical: verticalSize,
  } = game.cellularAutomatonSize;

  return (
    <>
      <p>{game.currentTime.hours}:{game.currentTime.minutes}:{game.currentTime.seconds.toString().padStart(2, '0')}</p>
      <div className="flex gap-1">
        {!game.isRunning ? (
          <button className="cursor-pointer p-1 border-2 border-amber-400 rounded" onClick={() => game.start()}>Start Game</button>
        ) : (
          <button className="cursor-pointer p-1 border-2 border-amber-400 rounded" onClick={() => game.stop()}>Stop Game</button>
        )}
      </div>
      <div
        className='grid overflow-auto w-full max-h-[250px]'
        style={{
          gridTemplateColumns: `repeat(${horizontalSize}, 20px)`,
          gridTemplateRows: `repeat(${verticalSize}, 20px)`,
        }}
      >
        {[...Array(horizontalSize)].map((_, row) => {
          return [...Array(verticalSize)].map((_, column) => {
            const coordinate = {
              x: column,
              y: row,
            };

            const coordinateKey = generateCoordinateKey(coordinate);

            return (
              <button
                key={coordinateKey}
                className='size-full border-2 border-black'
                style={{ backgroundColor: game.aliveCells.has(coordinateKey) ? 'green' : 'white' }}
                onClick={() => game.createCell(coordinate)}
              />
            );
          });
        })}
      </div>
    </>
  );
}

export default App;
