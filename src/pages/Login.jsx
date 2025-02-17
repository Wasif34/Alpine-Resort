import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import LoginLogo from "../ui/LoginLogo";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60rem 60rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function Login() {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <Spinner />;
  return (
    <LoginLayout>
      <LoginLogo />

      <StyledDiv>
        <Logo />
        <Heading as="h4">Log into Admin Dashboard</Heading>

        <LoginForm />
      </StyledDiv>
    </LoginLayout>
  );
}

export default Login;
