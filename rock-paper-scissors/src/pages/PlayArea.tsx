import ChoiceItem from "../components/ChoiceItem";
import imgs from "../assets/images";
import Wrapper from "../assets/wrappers/AppWrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { connect } from "../store/actions";
import { Outlet, useNavigate } from "react-router-dom";
import "../index.css";

function PlayArea() {
  const { arePlayersConnected, isConnected, isResult } = useSelector(
    (state: RootState) => state.gameReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const timeOutId = setInterval(() => {
      dispatch(connect());

      if (isConnected) {
        clearInterval(timeOutId);
      }
    }, 1000);

    return () => clearInterval(timeOutId);
  }, [dispatch, isConnected]);

  useEffect(() => {
    if (!isResult) {
      return;
    }

    navigate("/results");
  }, [isResult, navigate]);

  return (
    <>
      {isConnected && (
        <>
          <Wrapper>
            <Outlet />
            <ul className="elements-list">
              {imgs.map((img) => (
                <ChoiceItem key={img.name} img={img} />
              ))}
            </ul>
          </Wrapper>
          {arePlayersConnected ? (
            <h2>Your opponent connected.</h2>
          ) : (
            <h2>Waiting for an opponent...</h2>
          )}
        </>
      )}
    </>
  );
}

export default PlayArea;
