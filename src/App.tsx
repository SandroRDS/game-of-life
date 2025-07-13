import useGame from "./engine/hooks/useGame";

function App() {
  const game = useGame();

  return (
    <>
      <p className="text-lg">Hello World!</p>
      <p>{game.currentTime.hours}:{game.currentTime.minutes}:{game.currentTime.seconds.toString().padStart(2, '0')}</p>
      <div className="flex gap-1">
        {!game.isRunning ? (
          <button className="cursor-pointer p-1 border-2 border-amber-400 rounded" onClick={() => game.start()}>Start Game</button>
        ) : (
          <button className="cursor-pointer p-1 border-2 border-amber-400 rounded" onClick={() => game.stop()}>Stop Game</button>
        )}
      </div>
    </>
  );
}

export default App;
