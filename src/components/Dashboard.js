import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userpool from "../userpool";
import { logout } from "../services/authenticate";
import axios from "axios";

const Dashboard = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(
      user.getSession((err, session) => {
        if (err) console.log(err);
        else {
          if (session.isValid) {
            console.log(test(session.getIdToken().getJwtToken()));
          } else {
            console.log("Not validdddddddddddd");
          }
        }
      })
    );
    test();
    // console.log(user.storage["CognitoIdentityServiceProvider.7buisfhj9v4ian89ahmei0bqog.31433d4a-f0a1-7093-9d3a-6cad317a5b30.idToken"]);
    if (!user) {
      Navigate("/login");
    }
  }, []);

  const test = async (token) => {
    try {
      //Make  a lambda fucntion. Then on the resource of lambda there will be enable cors. enable it.
      //Go to authrizers create one  authrizer(let x) by selecting cognito authrizer.In token source give "Authorization". Then come to lambda fucntion back then
      // go to method request and in Authorization  select authrizer to apply (x). Then thss fucntion will only
      // be called if you send a header {Authorization:token} either it will throw unautorized.

      //No to get user from this token in body template mapping i have given
      //   "age": "$inputRoot.age",
      // "height" : "$inputRoot.height",
      // "income" : "$inputRoot.income",
      // "userId" : "$context.authorizer.claims.sub"
      // userId will come form the token itself , and all other form body we send and thse all will go
      //as event in lambda fucntion

      const url =
        "https://70crq0cagc.execute-api.ap-south-1.amazonaws.com/V1/users";
      const headers = {
        "Content-Type": "application/json", // Set the content type
        Authorization: token, // If you need to include an authorization token  //{Authorization:token}
        // Add any other headers as needed
      };

      // Data to be posted
      const userData = {
        age: 22,
        height: 2,
        income: 3111,
      };

      // Make the POST request using Axios
      const res = await axios.post(url, userData, { headers });
      console.log(res, "Reciefvevrvnrnn");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoout = () => {
    logout();
  };

  return (
    <div className="Dashboard">
      <Button
        style={{ margin: "10px" }}
        variant="contained"
        onClick={handleLogoout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
