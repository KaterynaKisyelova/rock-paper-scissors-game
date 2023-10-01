import styled from "styled-components";

const Wrapper = styled.div`
  font-family: sans-serif;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 19.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #fff;
  animation-name: var(--fadeInAnimation);
  animation-duration: 1s;
  animation-fill-mode: forwards;
  z-index: 2;

  h2 {
    font-size: 3rem;
    line-height: 5rem;
    line-height: normal;
    font-weight: 600;
  }

  .score {
    font-size: 2.2rem;
    width: 6rem;
    height: 6rem;
    border: 0.15rem solid #fff;
    border-radius: 100%;
    margin: 1.5rem 0;
    font-weight: 600;

    span {
      line-height: 6rem;
    }
  }

  .play-again {
    font-size: 1.5rem;
    text-transform: uppercase;
    line-height: normal;
    color: inherit;
    background: transparent;
    border: none;
  }
`;

export default Wrapper;
