/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, loading, onClose }) {
  function handleDelete() {
    onConfirm();
    onClose();
  }
  return (
    <Overlay>
      <StyledConfirmDelete>
        <Heading as="h3">Delete {resourceName}</Heading>
        <p>
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>

        <div>
          <Button variation="secondary" disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button variation="danger" disabled={loading} onClick={handleDelete}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </StyledConfirmDelete>
    </Overlay>
  );
}

export default ConfirmDelete;
