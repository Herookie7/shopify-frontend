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
  LegacyCard,
  Page,
  Icon,
  Text,
} from "@shopify/polaris";
import { CreateProductModal } from "../Modal/CreateProduct.js";
import { DeleteProductModal } from "../Modal/DeleteProduct";
import { EditProductModal } from "../Modal/EditProduct.js";
import appContext from "../context/Createcontext";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import axios from "axios";

const Products = () => {
  const [queryValue, setQueryValue] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [dataToSendForEditModal, setDataToSendForEditModal] = useState(null);
  const [dataToSendForDeleteModal, setDataToSendForDeleteModal] =
    useState(null);

  const {
    handleChangeProductCreateModal,
    activeProductCreateModal,
    handleChangeProductEditModal,
    activeProductEditModal,
    handleChangeProductDeleteModal,
    activeProductDeleteModal,
  } = useContext(appContext);

  const handleEditChange = useCallback(
    (data) => {
      setDataToSendForEditModal(data);
      handleChangeProductEditModal();
    },
    [handleChangeProductEditModal]
  );

  const handleDeleteChange = useCallback(
    (id) => {
      setDataToSendForDeleteModal(id);
      handleChangeProductDeleteModal();
    },
    [handleChangeProductDeleteModal]
  );

  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Credentials": true,
        },
      });
      const updatedProductsData = data?.map(
        ({ id, title, body_html, vendor, product_type, status }) => ({
          id,
          title,
          bodyHtml: body_html,
          vendor,
          productType: product_type,
          status,
        })
      );
      setProductsData(updatedProductsData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const rows = useMemo(
    () =>
      productsData?.map(
        ({ id, title, bodyHtml, vendor, productType, status }) => [
          id,
          title,
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />,
          vendor,
          productType,
          status,
          <Button
            onClick={() =>
              handleEditChange({
                id,
                title,
                bodyHtml,
                vendor,
                productType,
                status,
              })
            }
            primary
          >
            <Icon source={EditMajor} color="black" />
          </Button>,
          <Button onClick={() => handleDeleteChange(id)} destructive>
            <Icon source={DeleteMajor} style={{ color: "red" }} />
          </Button>,
        ]
      ),
    [productsData, handleDeleteChange, handleEditChange]
  );

  return (
    <Page
      title="Product"
      primaryAction={
        <Button primary onClick={handleChangeProductCreateModal}>
          Add Product
        </Button>
      }
    >
      <Text variant="heading4xl" as="h1">
        Products
      </Text>
      <LegacyCard>
        <div style={{ padding: "16px", display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Filters
              queryValue={queryValue}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleQueryValueRemove}
              filters={[]}
              appliedFilters={[]}
            />
          </div>
        </div>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text", "text"]}
          headings={[
            "id",
            "title",
            "bodyHtml",
            "vendor",
            "productType",
            "status",
            "Edit",
            "Delete",
          ]}
          rows={rows}
        />
      </LegacyCard>
      {activeProductCreateModal && <CreateProductModal getData={getData} />}
      {activeProductEditModal && (
        <EditProductModal getData={getData} data={dataToSendForEditModal} />
      )}
      {activeProductDeleteModal && (
        <DeleteProductModal getData={getData} id={dataToSendForDeleteModal} />
      )}
    </Page>
  );
};

export default Products;
