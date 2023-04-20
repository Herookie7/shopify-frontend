import { useState, useCallback, useContext } from "react";
import axios from "axios";
import {
 
  Form,
  FormLayout,
  Modal,
  Spinner,
  Toast,
} from "@shopify/polaris";
import appContext from "../context/Createcontext";

export const DeleteProductModal = ({ getData, id }) => {
  const { handleChangeProductDeleteModal, activeProductDeleteModal } =
    useContext(appContext);
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Credentials": true,
        },
      });

      setIsLoading(false);
      setErrorMessage("");
      toggleActive();
      handleChangeProductDeleteModal();
      getData();
    } catch (error) {
      console.log(error);
      setErrorMessage("Error");
      setIsLoading(false);
      toggleActive();
    }
  };

  const toastMarkup = active && (
    <Toast
      content={errorMessage ? "Error" : "Successfully deleted!"}
      duration={2000}
      error={!!errorMessage}
      onDismiss={toggleActive}
    />
  );

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={activeProductDeleteModal}
        onClose={handleChangeProductDeleteModal}
        title="Delete Product"
        primaryAction={{
          content: isLoading ? (
            <Spinner accessibilityLabel="Spinner example" size="small" />
          ) : (
            "Delete"
          ),
          onAction: handleSubmit,
          disabled: isLoading,
        }}
      >
        <Modal.Section>
          <>
            <Form>
              <FormLayout.Group>
                <p>Are you sure?</p>
              </FormLayout.Group>
            </Form>
          </>
        </Modal.Section>
      </Modal>
      {toastMarkup}
    </div>
  );
};
