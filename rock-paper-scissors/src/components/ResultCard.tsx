import Wrapper from "../assets/wrappers/ResultCardWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";

function ResultCard() {
  const [winStatement, setWinStatement] = useState("");
  const { winner, score } = useSelector(
    (state: RootState) => state.gameReducer
  );

  useEffect(() => {
    switch (winner.score) {
      case 1:
        setWinStatement("You Win!");
        break;
      case 0:
        setWinStatement("You Tied.");
        break;
      case -1:
        setWinStatement("You Lost.");
        break;
    }
  }, [winner]);

  return (
    <Wrapper>
      <h2>{winStatement}</h2>
      <div className="score">
        <span>{score}</span>
      </div>
    </Wrapper>
  );
}

export default ResultCard;
