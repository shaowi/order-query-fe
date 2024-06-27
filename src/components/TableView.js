// src/components/TableView.js
import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 30px;
  width: 80%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f2f2f2;
  text-align: left;
`;

const StyledTd = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const TableView = ({ customers }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Contact Name</StyledTh>
            <StyledTh>Orders</StyledTh>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerID}>
              <StyledTd>{customer.contactName}</StyledTd>
              <StyledTd>{customer.orderCount}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default TableView;
