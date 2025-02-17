import { getUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const { user, isLoading, error, isAuthenticated } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
