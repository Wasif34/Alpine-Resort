import Select from "./Select";
import { useSearchParams } from "react-router-dom";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy" || "");

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      type="white"
      value={sortBy}
      options={options}
      onChange={handleChange}
    />
  );
}

export default SortBy;
