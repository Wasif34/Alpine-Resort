import styled from "styled-components";
import Logo from "./Logo";

const Img = styled.img`
  height: 100%;
  width: auto;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

function LoginLogo() {
  return (
    <LoginDiv>
      <Img src="src/data/img/mobile-login.svg" alt="Logo" />
    </LoginDiv>
  );
}

export default LoginLogo;
