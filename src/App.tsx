import { useMemo } from "react";
import Game from "./engine/core/game/game.entity";

function App() {
  const game = useMemo(() => new Game(), []);

  return (
    <>
      <p className="text-lg">Hello World!</p>
      <div className="flex gap-1">
        <button className="cursor-pointer p-1 border-2 border-amber-400 rounded" onClick={() => game.start()}>Start Game</button>
        <button className="cursor-pointer p-1 border-2 border-amber-400 rounded" onClick={() => game.stop()}>Stop Game</button>
      </div>
    </>
  );
}

export default App;
