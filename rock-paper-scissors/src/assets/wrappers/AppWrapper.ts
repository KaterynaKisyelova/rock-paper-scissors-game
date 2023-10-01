import styled from "styled-components";

const Wrapper = styled.main`
  margin: 3rem auto 60px auto;

  .elements-list {
    position: relative;
    margin: 0 auto;
    width: fit-content;
    display: flex;
    justify-content: center;

    .center:has(.chosen) {
      transform: translateX(-100%);
      transition: transform 1s ease 0.3s;
    }
  }
`;

export default Wrapper;
