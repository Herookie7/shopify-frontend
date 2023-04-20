import React, { useCallback, useEffect, useState } from "react";
import { DataTable, LegacyCard, Page, Text } from "@shopify/polaris";
import axios from "axios";

const Orders = () => {
  const [queryValue, setQueryValue] = useState("");
  const [ordersData, setOrdersData] = useState([]);

  const handleFiltersQueryChange = useCallback((value) => setQueryValue(value), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleClearAll = useCallback(handleQueryValueRemove, []);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Credentials": true,
        },
      });
      const updatedOrdersData = data?.map(({ id, email, created_at, total_price, fulfillment_status}) => ({
        id,
        email,
        created_at,
        total_price,
        fulfillment_status,
      }));
      setOrdersData(updatedOrdersData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const rows = ordersData?.map(({ id, email, created_at, total_price, fulfillment_status }) => [
    id,
    email,
    created_at,
    total_price,
    fulfillment_status,
  ]);

  return (
    <Page>
      <Text variant="heading4xl" as="h1">
        Orders
      </Text>
      <LegacyCard>
        <div style={{ padding: "16px", display: "flex" }}>
          {/* <Filters
            queryValue={queryValue}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          /> */}
        </div>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text"]}
          headings={["id", "email", "createdAt", "Total price", "fulfillment_status"]}
          rows={rows}
        />
      </LegacyCard>
    </Page>
  );
};

export default Orders;
