import { useState, useCallback, useContext, ChildComponent } from "react";
import axios from "axios";
import {
 
  Form,
  FormLayout,
  Modal,
  Spinner,
  TextField,
  Toast,
} from "@shopify/polaris";
import appContext from "../context/Createcontext";


const CreateCustomerModal = ({ getData }) => {
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  const { handleChangeCustomerCreateModal, activeCustomerCreateModal } = useContext(appContext);
  const [dataToBeSend, setdataToBeSend] = useState({});
  const [spinner, setspinner] = useState(false);
  const [active, setActive] = useState(false);
  const [errorMessageTrue, seterrorMessageTrue] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (
      !dataToBeSend.first_name ||
      !dataToBeSend?.email
    ) {
      setMessage("Enter all fields");
      seterrorMessageTrue(true);
      setActive(true);
    } else {
      try {
        setspinner(true);
        const { data } = await axios.post(
          "http://localhost:3001/customers",
          dataToBeSend,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        setMessage("Customer created successfully!");
        seterrorMessageTrue(false);
        setActive(true);
        handleChangeCustomerCreateModal();
        getData();
        setForceUpdateKey(Date.now());
      } catch (error) {
        setMessage(`Error while creating customer: ${error.message}`);
        seterrorMessageTrue(true);
        setActive(true);
      } finally {
        setspinner(false);
      }
    }
  }, [dataToBeSend, getData, handleChangeCustomerCreateModal]);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = (
    <Toast
      content={message}
      duration={1500}
      error={errorMessageTrue}
      onDismiss={toggleActive}
      active={active}
    />
  );

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={activeCustomerCreateModal}
        onClose={handleChangeCustomerCreateModal}
        title="Add Customer"
        primaryAction={{
          content: spinner ? (
            <Spinner accessibilityLabel="Spinner example" size="small" />
          ) : (
            "Create"
          ),
          onAction: handleSubmit,
        }}
      >
        <Modal.Section>
          <>
            <Form onSubmit={handleSubmit}>
              <FormLayout.Group>
                <TextField
                  label="First Name"
                  type="text"
                  name="first_name"
                  value={dataToBeSend?.first_name || ""}
                  onChange={(value) =>
                    setdataToBeSend((prev) => ({ ...prev, first_name: value }))
                  }
                />
                <TextField
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={dataToBeSend?.last_name || ""}
                  onChange={(value) =>
                    setdataToBeSend((prev) => ({ ...prev, last_name: value }))
                  }
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={dataToBeSend?.email || ""}
                  autoComplete="email"
                  onChange={(value) =>
                    setdataToBeSend((prev) => ({ ...prev, email: value }))
                  }
                />
                <TextField
                  label="Phone Number"
                  type="text"
                  name="phoneNumber"
                  value={dataToBeSend?.phone || ""}
                  onChange={(value) =>
                    setdataToBeSend((prev) => ({ ...prev, phone: value }))
                  }
                />
              </FormLayout.Group>
            </Form>
          </>
        </Modal.Section>
      </Modal>
      {toastMarkup}
    </div>
  );
};

export default CreateCustomerModal;