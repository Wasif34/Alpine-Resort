import styled from "styled-components";

import { useSearchParams } from "react-router-dom";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-500)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-filter-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-filter-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState("none");
  const currentPage = !searchParams.get("page")
    ? 1
    : parseInt(searchParams.get("page"));

  const totalPages = Math.ceil(count / 10);
  function nextPage() {
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

    if (active !== "next") setActive("next");

    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }
  function previousPage() {
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", previousPage);

    if (active !== "previous") setActive("previous");

    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <P>
        Showing <span>{currentPage * 10 - 9}</span> to
        <span>
          {" "}
          {currentPage * 10 < count ? currentPage * 10 : count}
        </span> of <span>{count}</span> results
      </P>
      {count > 10 && (
        <Buttons>
          <PaginationButton
            disabled={currentPage === 1 ? true : false}
            onClick={previousPage}
            active={active === "previous" ? true : false}
          >
            <HiChevronLeft />
            <span>Previous</span>
          </PaginationButton>
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === totalPages ? true : false}
            active={active === "next" ? true : false}
          >
            <span>Next</span>
            <HiChevronRight />
          </PaginationButton>
        </Buttons>
      )}
    </StyledPagination>
  );
}

export default Pagination;
