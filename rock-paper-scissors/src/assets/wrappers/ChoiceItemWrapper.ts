import styled from "styled-components";

const Wrapper = styled.div`
  height: 19.5rem;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    height: 2.1rem;
    width: 9.5rem;
    background-color: hsl(169.47deg 14% 52%);
    bottom: -2.1rem;
    left: 50%;
    translate: -50%;
    border-radius: 50%;
  }

  &&:has(> .chosen-animation):after {
    animation: hopShrink 0.3s;
  }

  .choice {
    height: 100%;
    margin: 0 1.1rem 0 1.1rem;
    display: inline-block;
  }

  .chosen {
    position: relative;
  }

  .chosen-animation {
    animation: hop 0.3s;
  }

  &.fadeOut {
    animation-name: var(--fadeOutAnimation);
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  &.fadeIn {
    animation-name: var(--fadeInAnimation);
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  .bounce {
    animation: bounce 0.3s;
  }

  &&:has(> .bounce):after {
    animation: bounceShrink 0.3s;
  }

  .win-jump {
    animation: hop 0.3s, bounce 0.2s ease 0.3s;
  }

  &&:has(> .win-jump):after {
    animation: hopShrink 0.3s, bounceShrink 0.2s ease 0.3s;
  }

  @keyframes hop {
    0% {
      transform: translateY(0rem);
    }
    50% {
      transform: translateY(-1rem);
    }
    100% {
      transform: translateY(0rem);
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0rem);
    }
    50% {
      transform: translateY(-0.7rem);
    }
    100% {
      transform: translateY(0rem);
    }
  }

  @keyframes hopShrink {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(0.75, 0.75);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes bounceShrink {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(0.8, 0.8);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

export default Wrapper;
