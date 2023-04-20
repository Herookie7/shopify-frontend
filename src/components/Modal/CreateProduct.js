import React, { useState } from "react";
import {
  Modal,
  TextField,
  Form,
  FormLayout,
  Button,
  Frame,
  Toast,
} from "@shopify/polaris";
import axios from "axios";

export function CreateProductModal(props) {
  const [productData, setProductData] = useState({
    title: "",
    body_html: "",
    vendor: "",
    product_type: "",
    status: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");

  const toggleActive = () => {
    props.handleChangeProductCreateModal();
  };

  const showToastMessage = (message) => {
    setShowToast(true);
    setToastContent(message);
  };

  const submitCreateProductForm = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:3001/products`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      setShowToast(true);
      setToastContent("Product created successfully!");
      props.getData();
      toggleActive();
    } catch (error) {
      setShowToast(true);
      setToastContent("Product creation failed!");
      console.error(error);
    }
  };

  const toastMarkup = showToast ? (
    <Toast
      content={<Toast onDismiss={() => setShowToast(false)} content={toastContent} />}
      duration={2000}
      onClose={() => setShowToast(false)}
    />
  ) : null;

  return (
    <div style={{ height: "500px" }}>
      <Frame>
        {toastMarkup}
        <Modal
          open={props.active}
          onClose={toggleActive}
          title="Create a new Product"
          primaryAction={{
            content: "Create Product",
            onAction: submitCreateProductForm,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: toggleActive,
            },
          ]}
        >
          <Form onSubmit={submitCreateProductForm}>
            <Modal.Section>
              <FormLayout>
                <TextField
                  label="Title"
                  value={productData.title}
                  onChange={(value) =>
                    setProductData({ ...productData, title: value })
                  }
                  required
                />
                <TextField
                  label="Body HTML"
                  value={productData.body_html}
                  onChange={(value) =>
                    setProductData({ ...productData, body_html: value })
                  }
                  multiline={6}
                />
                <TextField
                  label="Vendor"
                  value={productData.vendor}
                  onChange={(value) =>
                    setProductData({ ...productData, vendor: value })
                  }
                  required
                />
                <TextField
                  label="Product Type"
                  value={productData.product_type}
                  onChange={(value) =>
                    setProductData({ ...productData, product_type: value })
                  }
                  required
                />
                <TextField
                  label="Status"
                  value={productData.status}
                  onChange={(value) =>
                    setProductData({ ...productData, status: value })
                  }
                  required
                />
              </FormLayout>
            </Modal.Section>
          </Form>
        </Modal>
      </Frame>
    </div>
  );
}
