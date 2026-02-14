import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { BingoGame } from "./components/BingoGame";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/bingo",
    Component: BingoGame,
  },
]);
