import { createBrowserRouter } from "react-router-dom";
import PlayArea from "./PlayArea";
import ResultCard from "../components/ResultCard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PlayArea />,
    children:[ {
      path: "results",
      element: <ResultCard />,
    }]
  },
]);
