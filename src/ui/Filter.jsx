/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const StyledFilter = styled.div`
  border: 1px solid var(--color-brand-50);
  background-color: var(--color-brand-50);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-brand-500);
  color: var(--color-filter-50);
  border: none;

  ${(props) =>
    props.className === "active" &&
    css`
      background-color: var(--color-yellow-700);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-filter-50);
  }
`;

function Filter({ filterField, options }) {
  const [active, setActive] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    setActive(value);
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          disabled={option.value === active}
          className={option.value === active ? "active" : "color-grey-600"}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
