import { useState } from "react";
import CreateCabinForm from "./CreateRoomForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddRoom() {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setisOpenModal(!isOpenModal)}>
          Add new Room
        </Button>
        {isOpenModal && (
          <Modal onClose={() => setisOpenModal(false)}>
            <CreateCabinForm onCloseModal={setisOpenModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default AddRoom;
