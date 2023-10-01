import Wrapper from "../assets/wrappers/ChoiceItemWrapper";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ElementPosition, Elements } from "../types/types";
import { animate, chooseElement, showResult } from "../store/actions";
import { useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { findImage } from "../utils/helpers";

type Props = {
  img: {
    image: string;
    name: Elements;
  };
};

function ChoiceItem({ img }: Props) {
  const {
    chosenElement,
    arePlayersConnected,
    opponentElement,
    isAnimated,
    winner,
  } = useSelector((state: RootState) => state.gameReducer);
  const dispatch = useDispatch<AppDispatch>();
  const choiceElement = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState(img);
  const [wrapperClasses, setWrapperClasses] = useState("element");
  const [imageClasses, setImageClasses] = useState("choice");
  const [isOpponentChoiceShown, setIsOpponentChoiceShown] = useState(false);
  const [elementPosition, setElementPosition] = useState<ElementPosition>(
    ElementPosition.UNSET
  );

  function onImageClick() {
    dispatch(chooseElement({ id: img.name, elementPosition }));
  }

  function onChosenAnimationEnd(e: React.AnimationEvent) {
    if (e.animationName === "hop") {
      setImageClasses((prevState) => {
        return prevState.replace("chosen-animation", "");
      });
    }
  }

  useEffect(() => {
    if (isOpponentChoiceShown) {
      return;
    }

    showOpponentElement();
  }, [opponentElement]);

  useEffect(() => {
    if (
      !chosenElement ||
      !isAnimated ||
      !opponentElement ||
      (elementPosition === ElementPosition.CENTER &&
        chosenElement.elementPosition !== ElementPosition.CENTER)
    ) {
      return;
    }

    if (winner.element === "") {
      setImageClasses((prevState) => {
        return `${prevState} bounce`;
      });
    }

    if (
      winner.element === image.name &&
      (chosenElement.id === winner.element ||
        opponentElement.id === winner.element)
    ) {
      setImageClasses((prevState) => {
        return `${prevState} win-jump`;
      });
    }
  }, [isAnimated]);

  useEffect(() => {
    const elementPosition = getElementPosition();

    setElementPosition(elementPosition);
    setWrapperClasses((prevState) => {
      return `${prevState} ${elementPosition}`;
    });
  }, []);

  useEffect(() => {
    if (chosenElement?.id === img.name) {
      setImageClasses((prevState) => {
        return `${prevState} chosen chosen-animation`;
      });
    }

    if (!chosenElement?.id || chosenElement?.id === img.name) {
      return;
    }

    setWrapperClasses((prevState) => {
      return `${prevState} fadeOut`;
    });
  }, [chosenElement?.id, image.name]);

  function getElementPosition() {
    const element = choiceElement.current;

    if (!element) {
      return ElementPosition.UNSET;
    }

    if (element.offsetLeft < element.offsetWidth) {
      return ElementPosition.LEFT;
    }

    if (element.offsetLeft > element.offsetWidth) {
      return ElementPosition.RIGHT;
    }

    return ElementPosition.CENTER;
  }

  function showOpponentElement() {
    if (!opponentElement || !chosenElement?.elementPosition) {
      return;
    }

    switch (chosenElement.elementPosition) {
      case ElementPosition.RIGHT: {
        if (elementPosition !== ElementPosition.LEFT) {
          return;
        }

        const opponentImage = findImage(opponentElement.id);

        if (!opponentImage) {
          return;
        }

        setImage(opponentImage);
        setWrapperClasses((prevState) => {
          return prevState.replace("fadeOut", "fadeIn");
        });
        setIsOpponentChoiceShown(true);

        break;
      }
      case ElementPosition.CENTER:
      case ElementPosition.LEFT: {
        if (elementPosition !== ElementPosition.RIGHT) {
          return;
        }

        const opponentImage = findImage(opponentElement.id);

        if (!opponentImage) {
          return;
        }

        setImage(opponentImage);
        setWrapperClasses((prevState) => {
          return prevState.replace("fadeOut", "fadeIn");
        });
        setIsOpponentChoiceShown(true);

        break;
      }
    }
  }

  function onFadeOutEnd(e: React.AnimationEvent) {
    if (e.animationName === "fadeOut") {
      showOpponentElement();
    }

    if (e.animationName === "fadeIn") {
      dispatch(showResult());
      dispatch(animate());
    }
  }

  return (
    <Wrapper
      ref={choiceElement}
      className={wrapperClasses}
      onAnimationEnd={onFadeOutEnd}
    >
      <img
        className={imageClasses}
        src={image.image}
        onClick={
          arePlayersConnected && !chosenElement?.id ? onImageClick : undefined
        }
        onAnimationEnd={onChosenAnimationEnd}
        alt="choice"
      />
    </Wrapper>
  );
}

export default ChoiceItem;
