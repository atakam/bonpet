import React from "react";
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
//import { customers } from '../__mocks__/customers';

const Customers = () => {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    fetch("/borrowers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers));
  }, []);

  return (
    <>
      <Head>
        <title>
          Customers | Bonpet
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
