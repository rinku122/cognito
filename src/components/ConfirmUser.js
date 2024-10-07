import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

import userpool from "../userpool";

const ConfirmUser = () => {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [codeErr, setCodeErr] = useState("");

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "code") {
      setConfirmationCode(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === "" && confirmationCode === "") {
        setEmailErr("Email is Required");
        setCodeErr("Confirmation Code is required");
        resolve({
          email: "Email is Required",
          code: "Confirmation Code is required",
        });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", code: "" });
      } else if (confirmationCode === "") {
        setCodeErr("Confirmation Code is required");
        resolve({ email: "", code: "Confirmation Code is required" });
      } else {
        resolve({ email: "", code: "" });
      }
      reject("");
    });
  };

  const handleConfirmClick = (e) => {
    setEmailErr("");
    setCodeErr("");
    validation()
      .then((res) => {
        if (res.email === "" && res.code === "") {
          const userData = {
            Username: email,
            Pool: userpool,
          };

          const cognitoUser = new CognitoUser(userData);

          cognitoUser.confirmRegistration(
            confirmationCode,
            true,
            (err, result) => {
              if (err) {
                console.log(err);
                alert("Error confirming user.");
              } else {
                console.log("User confirmed successfully:", result);
                alert("User confirmed successfully!");
              }
            }
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="confirm-user">
      <div className="form">
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
          />
        </div>
        <div className="formfield">
          <TextField
            value={confirmationCode}
            onChange={(e) => formInputChange("code", e.target.value)}
            label="Confirmation Code"
            helperText={codeErr}
          />
        </div>
        <div className="formfield">
          <Button
            type="submit"
            variant="contained"
            onClick={handleConfirmClick}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUser;
