import styled from "styled-components";

const SwitchContainer = styled.button`
  width: 56px;
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 9999px;
  border: none;
  padding: 4px;
  background-color: ${(props) =>
    props.checked ? "var(--color-brand-300)" : "#d1d5db"};
  transition: background-color 0.3s;
`;

const SwitchHandle = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  transform: ${(props) =>
    props.checked ? "translateX(24px)" : "translateX(0)"};
  transition: transform 0.3s;
`;

function Switch({ checked, onClick, price }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <SwitchContainer checked={checked} onClick={onClick} disabled={checked}>
        <SwitchHandle checked={checked} />
      </SwitchContainer>
      <span>Include Breakfast for an Additional PKR {price} per guest</span>
    </div>
  );
}

export default Switch;
