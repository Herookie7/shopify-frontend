// import {
//    
//     Form,
//     FormLayout,
//     Modal,
//     Spinner,
//     TextField,
//     Toast
//   } from "@shopify/polaris";
//   import { useCallback, useContext, useState } from "react";
//   import axios from "axios";
//   import appContext from "../context/Createcontext";
  
//   const token = localStorage.getItem("token");
//   export const EditProductModal = (props)=>{
//     const [editData, seteditData] = useState(props.data);
//     const [active, setActive] = useState(false);
//     const [errorMessageTrue, seterrorMessageTrue] = useState(false);
//     const [Message, setMessage] = useState("");
//     const [spinner, setspinner] = useState(false);
//     const toggleActive = useCallback(() => setActive((active) => !active), []);
//     const toastMarkup = active ? (
//       <Toast 
//         content={Message} 
//         duration={2000}
//         error={errorMessageTrue}
//         onDismiss={toggleActive} 
//       />
//     ) : null;
//     const handleSubmit = async(e) => {
//       e.preventDefault();
//       if (!editData?.title) {
//         setMessage("Enter Title");
//         toggleActive()
//         seterrorMessageTrue(true);
//         console.log("Enter Title");
//       } else {
//         try {
//           setspinner(true)
//           const {data} = await axios.put(`http://localhost:3000/products/${props.data.id}`,editData,{
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//                 "Access-Control-Allow-Credentials":true
//               },
//               // withCredentials: true,
//             })
//             console.log(editData);
//             setspinner(false);
//             handleChangeProductEditModal();
//             props.getData();
//         } catch (error) {
//           setMessage("Error");
//           seterrorMessageTrue(true)
//           toggleActive();
//             console.log(error);
//         }
//       }
//     };
//     const { handleChangeProductEditModal, activeProductEditModal } = useContext(appContext);
//     return(
//       <div style={{ height: "500px" }}>
//       {toastMarkup}
//       <Modal
//         open={activeProductEditModal}
//         onClose={handleChangeProductEditModal}
//         title="Edit Product"
//         primaryAction={{
//           content: !spinner ? "Save": <Spinner accessibilityLabel="Spinner example" size="small" />,
//           onAction: (e)=>handleSubmit(e),
//         }}
//       >
//         <Modal.Section>
//           <>
//             <Form>
//               <FormLayout.Group>
//               <TextField
//                   label="Title"
//                   type="text"
//                   name="title"
//                   value={editData?.title}
//                   onChange={(value) =>
//                     seteditData({ ...editData, title: value })
//                   }
//                 />
//                 <TextField
//                   label="body_html"
//                   type="text"
//                   name="body_html"
//                   value={editData?.bodyHtml}
//                   onChange={(value) =>
//                     seteditData({ ...editData, bodyHtml: value })
//                   }
//                 />
//                 <TextField
//                   label="Vendor"
//                   type="text"
//                   name="vendor"
//                   value={editData?.vendor}
//                   onChange={(value) =>
//                     seteditData({ ...editData, vendor: value })
//                   }
//                 />
//               </FormLayout.Group>
//               <FormLayout.Group>
//                 <TextField
//                   label="Product Type"
//                   type="text"
//                   name="product_type"
//                   value={editData?.productType}
//                   onChange={(value) =>
//                     seteditData({ ...editData, productType: value })
//                   }
//                 />
//                 <TextField
//                   label="Status"
//                   type="text"
//                   name="status"
//                   value={editData?.status}
//                   onChange={(value) =>
//                     seteditData({ ...editData, status: value })
//                   }
//                 />
//               </FormLayout.Group>
//             </Form>
//           </>
//         </Modal.Section>
//       </Modal>
//     </div>
//     )
//   }



import React, { useContext, useState } from "react";
import {
  Modal,
  TextField,
  FormLayout,
  Button,
  Select,
} from "@shopify/polaris";
import appContext from "../context/Createcontext";
import axios from "axios";


const EditProductModal = ({ data, getData }) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [bodyHtml, setBodyHtml] = useState(data.bodyHtml);
  const [vendor, setVendor] = useState(data.vendor);
  const [productType, setProductType] = useState(data.productType);
  const [status, setStatus] = useState(data.status);

  const { handleChangeProductEditModal } = useContext(appContext);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/products/${data.id}`,
        {
          product: {
            title,
            body_html: bodyHtml,
            vendor,
            product_type: productType,
            status,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      setActive(false);
      handleChangeProductEditModal();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field) => {
    switch (field) {
      case "title":
        return (value) => setTitle(value);
      case "bodyHtml":
        return (value) => setBodyHtml(value);
      case "vendor":
        return (value) => setVendor(value);
      case "productType":
        return (value) => setProductType(value);
      case "status":
        return (value) => setStatus(value);
      default:
        return () => {};
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={true}
        onClose={() => {
          setActive(false);
          handleChangeProductEditModal();
        }}
        title="Edit Product"
        primaryAction={{
          content: "Save",
          onAction: () => handleSubmit(),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setActive(false);
              handleChangeProductEditModal();
            },
          },
        ]}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              value={title}
              onChange={handleChange("title")}
              label="Title"
              type="text"
            />
            <TextField
              value={bodyHtml}
              onChange={handleChange("bodyHtml")}
              label="Body HTML"
              type="text"
              multiline={10}
            />
            <TextField
              value={vendor}
              onChange={handleChange("vendor")}
              label="Vendor"
              type="text"
            />
            <TextField
              value={productType}
              onChange={handleChange("productType")}
              label="Product Type"
              type="text"
            />
            <Select
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
              ]}
              value={status}
              onChange={handleChange("status")}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export { EditProductModal };
