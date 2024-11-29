import React, {useContext, useMemo} from 'react';
import BaseSelect, {SelectOption} from "../../../../components/base/base-select/BaseSelect.tsx";
import {ApplicationContext} from "../../../../context/application-context/ApplicationContext.tsx";
import {SelectChangeEvent} from "@mui/material/Select";
import {Pagination, PaginationProps} from "@mui/material";
import "./PartyListPagination.scss"

export const LIMIT_OPTIONS: Array<SelectOption> = [10, 25, 50, 100].map(value => ({
  value,
  label: value + ''
}))

const PartyListPagination = () => {
  const {applicationState: {pageable}, setPageableLimit, setCurrentPage} = useContext(ApplicationContext);

  const selectedLimitOption = useMemo(() => {
    return LIMIT_OPTIONS.find(s => s.value === pageable.limit)
  }, [pageable.limit]);

  const onLimitChange = (e: SelectChangeEvent<SelectOption>) => {
    setPageableLimit(+e.target.value)
  }

  const onPageChange: PaginationProps['onChange'] = (event, page) => {
    setCurrentPage(page - 1)
  }

  return (
    <div className="party-list-pagination">
      <BaseSelect
        multiple={false}
        selectedOption={selectedLimitOption as SelectOption}
        options={LIMIT_OPTIONS}
        onChange={onLimitChange}
        className="base-select"
      />
      <Pagination
        count={pageable.totalPages}
        page={pageable.currentPage + 1}
        siblingCount={2}
        onChange={onPageChange}
        className="pagination"
        variant="outlined"
        color="standard"
        shape="rounded"
      />
    </div>
  );
};

export default PartyListPagination;

