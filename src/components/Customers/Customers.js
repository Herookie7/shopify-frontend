
import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import {
  Button,
  DataTable,
  Filters,
  Icon,
  LegacyCard,
  Page,
} from "@shopify/polaris";
import axios from "axios";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import appContext from "../context/Createcontext";
import CreateCustomerModal from "../Modal/CreateCustomer.js";
import { DeleteCustomerModal } from "../Modal/DeleteCustomer";
import { EditCustomerModal } from "../Modal/EditCustomers.js";
import { debounce } from "lodash";

const Customers = () => {
  const [queryValue, setQueryValue] = useState("");
  const [customerData, setcustomerData] = useState([]);
  const [dataToSendForEditModal, setdataToSendForEditModal] = useState(null);
 
const [dataToSendForDeleteModal, setdataToSendForDeleteModal] =
    useState(null);
  const {
    handleChangeCustomerCreateModal,
    activeCustomerCreateModal,
    handleChangeCustomerEditModal,
    activeCustomerEditModal,
    handleChangeCustomerDeleteModal,
    activeCustomerDeleteModal,
  } = useContext(appContext);

  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const debouncedHandleFiltersQueryChange = useCallback(
    debounce((value) => setQueryValue(value), 300),
    []
  );
  const handleClearAll = useCallback(
    () => handleQueryValueRemove(),
    [handleQueryValueRemove]
  );
  const handleEditChange = useCallback(
    (i) => {
      setdataToSendForEditModal(i);
      handleChangeCustomerEditModal();
    },
    [handleChangeCustomerEditModal]
  );
  const handleDeleteChange = useCallback(
    (i) => {
      setdataToSendForDeleteModal(i);
      handleChangeCustomerDeleteModal();
    },
    [handleChangeCustomerDeleteModal]
  );

  const customerDataMemo = useMemo(
    () =>
      customerData?.map((p) => ({
        id: p.id,
        email: p.email,
        first_name: p.first_name,
        last_name: p.last_name,
        phone: p.phone,
      })),
    [customerData]
  );

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Credentials": true,
        },
      });
      setcustomerData(data);
    } catch (error) {
      console.log(error);
    }
  }, [queryValue]);

  useEffect(() => {
    getData();
  }, [getData, queryValue]);

  const rows = useMemo(()=> customerDataMemo?.map((i) => [
      i.id,
      i.email,
      i.first_name,
      i.last_name,
      i.phone,
      <Button onClick={() => handleEditChange(i)} primary>
        <Icon source={EditMajor} color="black" />
      </Button>,
      <Button onClick={() => handleDeleteChange(i.id)} destructive>
        <Icon source={DeleteMajor} style={{ color: "red" }} />
      </Button>,
    ]),
    [customerDataMemo, handleDeleteChange, handleEditChange]
  );

  return (
    <Page
      title="Customers"
      primaryAction={
        <Button primary onClick={handleChangeCustomerCreateModal}>
          Add Customer
        </Button>
      }
    >
      <LegacyCard>
        <div style={{ padding: "16px", display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Filters
              queryValue={queryValue}
              on
QueryChange={debouncedHandleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
              filters={[]}
              appliedFilters={[]}
            />
          </div>
        </div>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text", "text"]}
          headings={[
            "id",
            "email",
            "firstname",
            "lastname",
            "phone",
            "Edit",
            "Delete",
          ]}
          rows={rows}
        />
      </LegacyCard>
      {activeCustomerCreateModal && <CreateCustomerModal getData={getData} />}
      {activeCustomerEditModal && (
        <EditCustomerModal getData={getData} data={dataToSendForEditModal} />
      )}
      {activeCustomerDeleteModal && (
        <DeleteCustomerModal
          getData={getData}
          id={dataToSendForDeleteModal}
        />
      )}
    </Page>
  );
};

export default Customers;