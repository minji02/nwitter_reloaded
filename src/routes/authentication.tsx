import { SetStateAction, useState } from "react";
import {
  Title,
  Wrapper,
  LoginWrapper,
  CreataAccountBtn,
  LoginBtn,
  Logo,
  BtnWrapper,
  Head,
  HomeHead,
  Check,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import LoginModal from "../components/login-modal";
import CreateAccountModal from "../components/creat-account-modal";

export interface SetModal {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function Authentication() {
  const [isopenLogin, setOpenLogin] = useState(false);
  const [isOpenCreateAccount, setOpenCreateAccount] = useState(false);

  const OnClickLogin = () => {
    setOpenLogin(true);
  };

  const onClickCreateAccount = () => {
    setOpenCreateAccount(true);
  };

  return (
    <Wrapper className={isopenLogin || isOpenCreateAccount ? "blur" : ""}>
      <Logo>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </Logo>
      <LoginWrapper>
        <Title>Happening now</Title>
        <HomeHead>Join today.</HomeHead>
        <BtnWrapper>
          <GithubButton />
          <GoogleButton /> {"or"}
          <CreataAccountBtn onClick={onClickCreateAccount}>
            Create account
          </CreataAccountBtn>
          <Check>Already have an account?</Check>
          <LoginBtn onClick={OnClickLogin}>Sign in</LoginBtn>
        </BtnWrapper>
      </LoginWrapper>
      {isopenLogin ? <LoginModal setOpenModal={setOpenLogin} /> : null}
      {isOpenCreateAccount ? (
        <CreateAccountModal setOpenModal={setOpenCreateAccount} />
      ) : null}
    </Wrapper>
  );
}
