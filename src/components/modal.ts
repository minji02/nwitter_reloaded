import { styled } from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 400px;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  &.login {
    height: 350px;
  }
`;

export const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  align-self: flex-start;
  background-color: transparent;
  border: none;
  padding: 10px;
`;
