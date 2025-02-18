import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function RoomTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "discount", label: "Discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "price-desc", label: "Sort by price (high first)" },
          { value: "price-asc", label: "Sort by price (low first)" },
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default RoomTableOperations;
