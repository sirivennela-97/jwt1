import React, { useRef, useEffect, useState } from "react";

function Login() {
  let [welcomeUser, setwelcomeUser] = useState("");
  useEffect(() => {
    console.log("login component loaded");
    sendTokenToValidate();
  }, []);
  let sendTokenToValidate = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let dataToSend = {
      token: localStorage.getItem("jwttoken"),
    };
    let reqoptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dataToSend),
    };
    let rawData = await fetch(
      "http://localhost:2222/validatethruToken",
      reqoptions
    );
    let convertedData = await rawData.json();
    console.log(convertedData);
    setwelcomeUser(`welcome to ${convertedData.user[0].firstName}
 ${convertedData.user[0].lastName}`);
  };
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  return (
    <div>
      <form>
        <div className="login">
          <label>email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              //login();
            }}
          >
            Login
          </button>
        </div>
        <h1>{welcomeUser}</h1>
      </form>
    </div>
  );
}

export default Login;
