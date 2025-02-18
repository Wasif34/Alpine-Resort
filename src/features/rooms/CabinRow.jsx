/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import ViewRoom from "./ViewRoom";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;
const PERNIGHT = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  margin-left: 0.2rem;
  color: var(--color-grey-500);
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;
const NoDiscount = styled.div`
  font-weight: 500;
  color: var(--color-red-700);
`;
// eslint-disable-next-line react/prop-types
export default function RoomRow({ room }) {
  const [edit, setEdit] = useState(false);
  const [viewRoom, setViewRoom] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);

  const { deleteCabin, isLoading } = useDeleteCabin();

  return (
    <>
      <Table.Row>
        <Img src={room.imageUrl} />
        <Cabin>{room.name}</Cabin>
        <div>{room.maxCapacity} guests</div>
        <Price>
          PKR {room.price}
          <PERNIGHT>/per night</PERNIGHT>
        </Price>
        {room.discount > 0 ? (
          <Discount>{room.discount}%</Discount>
        ) : (
          <NoDiscount>---</NoDiscount>
        )}

        <div>
          {deleteButton && (
            <ConfirmDelete
              resourceName="rooms"
              onClose={() => setDeleteButton(false)}
              onConfirm={() => deleteCabin(room.id)}
              loading={isLoading}
            />
          )}

          <Menus.Menu>
            <Menus.Toggle id={room.id} />
            <Menus.List id={room.id}>
              <Menus.Button icon={<HiPencil />} onClick={() => setEdit(!edit)}>
                Edit
              </Menus.Button>
              <Menus.Button
                del={true}
                icon={<HiTrash />}
                onClick={() => setDeleteButton(!deleteButton)}
              >
                Delete
              </Menus.Button>
              <Menus.Button
                onClick={() => setViewRoom(!viewRoom)}
                icon={<HiEye />}
              >
                View Room
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
      {edit && (
        <Modal onClose={() => setEdit(false)}>
          <CreateRoomForm
            room={room}
            onCloseModal={setEdit}
            setEdit={setEdit}
          />
        </Modal>
      )}
      {viewRoom && (
        <Modal onClose={() => setViewRoom(false)}>
          <ViewRoom room={room} onCloseModal={setViewRoom} />
        </Modal>
      )}
    </>
  );
}
