import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0px;
  gap: 150px;
  width: 100%;
  &.blur::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export const Title = styled.div`
  font-size: 70px;
  font-weight: 700;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  border: 0.5px solid #c5c5c5;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #c5c5c5;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  &.button {
    background-color: #001a4d;
    color: white;
    font-weight: 600;
  }
  &:focus {
    outline: none;
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  margin: 30px 50px;
  flex-direction: column;
`;

export const BtnWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export const CreataAccountBtn = styled.button`
  background-color: #001a4d;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

export const LoginBtn = styled.button`
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #c5c5c5;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    background-color: #001a4d38;
  }
  color: #001a4d;
  font-size: 15px;
  font-weight: 600;
`;

export const Head = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

export const HomeHead = styled.div`
  font-size: 35px;
  font-weight: 700;
  margin-top: 50px;
`;

export const Logo = styled.div`
  width: 400px;
  svg {
    width: 90%;
  }
`;

export const Check = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 60px;
  align-self: flex-start;
`;
