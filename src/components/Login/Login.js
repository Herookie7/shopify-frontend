import React, { useState } from "react";
import { FormLayout, TextField, Button, Form } from "@shopify/polaris";
import "./Login.css";
import axios from "axios"
// import toast from "react-toastify"

function LoginForm() {
  const [shopname, setShopname] = useState("");
  const handleShopNameChange = (value) => {
    setShopname(value);
  };
  let helpText;
  const handleSubmit = async(event) => {
    if (shopname === "") {
      event.preventDefault();
      helpText = shopname === "" ? "Required field" : "";
    }else{
        try {
            const {data} = await axios.get(`http://localhost:3000/?shop=${shopname}`);
            console.log(data);
            if(data){
              window.location.href = data;
            }
        } catch (error) {
            console.log(error);
        }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="card">
        <h2>Log In</h2>
        <FormLayout>
          <TextField
            label="Shop name"
            type="shopname"
            value={shopname}
            onChange={handleShopNameChange}
            helpText={<span style={{ color: "red" }}>{helpText}</span>}
          />
          <>myfirstlucentapp</>
          <Button submit>Log in</Button>
        </FormLayout>
      </div>
    </Form>
  );
}

export default LoginForm;
