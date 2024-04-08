import React from "react";
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({ count, variant, shape, currentPage, onPageChange }) => {
  return (
    <Pagination
      count={count}
      variant={variant}
      shape={shape}
      page={currentPage}
      onChange={(event, page) => onPageChange(page)}
    />
  );
};

export default CustomPagination;
