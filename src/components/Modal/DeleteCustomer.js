import { Form, FormLayout, Modal, Spinner, Toast } from "@shopify/polaris";
import axios from "axios";
import { useCallback, useContext, useState } from "react";
import appContext from "../context/Createcontext";

export const DeleteCustomerModal = ({getData, id}) => {
  const { handleChangeCustomerDeleteModal, activeCustomerDeleteModal } =
    useContext(appContext);
    const [active, setActive] = useState(false);
    const [errorMessageTrue, seterrorMessageTrue] = useState(false);
    const [Message, setMessage] = useState("");
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const [spinner, setspinner] = useState(false);
    const toastMarkup = active ? (
      <Toast 
        content={Message} 
        duration={2000}
        error={errorMessageTrue}
        onDismiss={toggleActive} 
      />
    ) : null;
  
  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        setspinner(true);
        const {data} = await axios.delete(`http://localhost:3000/customers/${id}`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Credentials": true,
              
            },
            // withCredentials: true,
          })
          setspinner(false);
          setMessage("Successfully deleted!");
          toggleActive();
          handleChangeCustomerDeleteModal();
          getData();
      } catch (error) {
        setMessage("Error");
        seterrorMessageTrue(true)
        toggleActive();
        console.log(error);
      }
  };
  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={activeCustomerDeleteModal}
        onClose={handleChangeCustomerDeleteModal}
        title="Delete Customer"//
        primaryAction={{
          content: !spinner? "Delete" : <Spinner accessibilityLabel="Spinner example" size="small" />,
          onAction: (e) => handleSubmit(e),
        }}
      >
        <Modal.Section>
          <>
            <Form>
              <FormLayout.Group>
                  <p>
                    Are you sure ??
                  </p>
              </FormLayout.Group>
            </Form>
          </>
        </Modal.Section>
      </Modal>
      {toastMarkup}
    </div>
  );
};
