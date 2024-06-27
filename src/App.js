import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableView from './components/TableView';
import { GET_TOP_10_CUSTOMERS as GET_TOP_10_CUSTOMERS_URL } from './routes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-left: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customers, setCustomers] = useState([]);

  const MySwal = withReactContent(Swal);

  const isAfter = (startDate, endDate) =>
    new Date(startDate) > new Date(endDate);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (startDate === '' || endDate === '') {
      MySwal.fire({
        title: 'Error!',
        text: 'Please select a start and end date',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (isAfter(startDate, endDate)) {
      MySwal.fire({
        title: 'Error!',
        text: 'Start date cannot be greater than end date',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    try {
      const response = await axios.get(GET_TOP_10_CUSTOMERS_URL, {
        params: {
          startDate,
          endDate
        }
      });
      console.log(response.data);
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching data',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <Container>
      <h1>Top 10 Customers by Orders</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Start Date:</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>End Date:</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      {customers.length > 0 && <TableView customers={customers} />}
    </Container>
  );
}

export default App;
