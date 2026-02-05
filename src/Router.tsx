import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Game } from "./components/Game";
import { useAppStore } from "./store/game-store";

export function Router() {
  const gameStarted = useAppStore((state) => state.gameStarted);
  
  return (
    <BrowserRouter>
      {gameStarted ? <Game /> : <Menu />}
    </BrowserRouter>
  );
}
