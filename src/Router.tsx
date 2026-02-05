import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./Menu";
import { Game } from "./Game";
import { useAppStore } from "./store";

export function Router() {
  const gameStarted = useAppStore((state) => state.gameStarted);
  
  return (
    <BrowserRouter>
      {gameStarted ? <Game /> : <Menu />}
    </BrowserRouter>
  );
}
