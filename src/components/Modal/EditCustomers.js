import {
   
    Form,
    FormLayout,
    Modal,
    Spinner,
    TextField,
    Toast
  } from "@shopify/polaris";
  import { useCallback, useContext, useState } from "react";
  import axios from "axios";
  import appContext from "../context/Createcontext";
  
  export const EditCustomerModal = (props)=>{
    // console.log(props,"props")
    const [editData, seteditData] = useState(props.data);
    const [active, setActive] = useState(false);
    const [errorMessageTrue, seterrorMessageTrue] = useState(false);
    const [Message, setMessage] = useState("");
    const [spinner, setspinner] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
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
      if (!editData.first_name || !editData.last_name || !editData?.email || !editData?.phone) {
        setMessage("Enter All editData");
        toggleActive()
        seterrorMessageTrue(true);
        // console.log("Enter All editData");
      } else {
        try {
          setspinner(true)
          const {data} = await axios.put(`http://localhost:3000/customers/${props.data.id}`,editData,{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Access-Control-Allow-Credentials": true,
              },
              // withCredentials: true,
            })
            // console.log(editData);
            setspinner(false);
            handleChangeCustomerEditModal();
            props.getData();
        } catch (error) {
          setMessage("Error");
          seterrorMessageTrue(true)
          toggleActive();
            console.log(error);
        }
      }
    };

    // console.log(editData,"editData");
    const { handleChangeCustomerEditModal, activeCustomerEditModal } = useContext(appContext);
    return(
      <div style={{ height: "500px" }}>
      {toastMarkup}
      <Modal
        open={activeCustomerEditModal}
        onClose={handleChangeCustomerEditModal}
        title="Edit Customer"
        primaryAction={{
          content: !spinner ? "Save": <Spinner accessibilityLabel="Spinner example" size="small" />,
          onAction: (e)=>handleSubmit(e),
        }}
      >
        <Modal.Section>
          <>
            <Form>
              <FormLayout.Group>
                <TextField
                  label="First Name"
                  type="text"
                  name="first_name"
                  value={editData?.first_name}
                  onChange={(e) => seteditData({ ...editData, ["first_name"]: e })}
                />
                <TextField
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={editData?.last_name}
                  onChange={(e) => seteditData({ ...editData, ["last_name"]: e })}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  disabled={true}
                  value={editData?.email}
                  autoComplete="email"
                  onChange={(e) => seteditData({ ...editData, ["email"]: e })}
                />
                <TextField
                  label="Phone Number"
                  type="text"
                  disabled={true}
                  name="phoneNumber"
                  value={editData?.phone}
                  onChange={(e) => seteditData({ ...editData, ["phone"]: e })}
                />
              </FormLayout.Group>
            </Form>
          </>
        </Modal.Section>
      </Modal>
    </div>
    )
  }