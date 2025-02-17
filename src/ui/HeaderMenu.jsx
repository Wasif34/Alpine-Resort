import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
const StyledHeadMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeadMenu>
      <li style={{ border: "none" }}>
        <ButtonIcon
          onClick={() => {
            navigate("/profile");
          }}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeadMenu>
  );
}

export default HeaderMenu;
