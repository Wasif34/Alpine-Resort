import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import RoomTableOperations from "../features/cabins/RoomTableOperations";

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <RoomTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Rooms;
