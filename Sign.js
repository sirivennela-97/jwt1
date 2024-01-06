import React ,{useRef}from 'react'

function Sign() {

let firstnameInputRef = useRef();
let lastnameInputRef = useRef();
let emailInputRef = useRef();
let passwordInputRef = useRef();
let countryInputRef = useRef();



let onsign = async()=>{
    let myHeaders = new Headers()
    myHeaders.append("Content-Type","application/json");


let dataToSend = {
    fn:firstnameInputRef.current.value,
    ln:lastnameInputRef.current.value,
    email:emailInputRef.current.value,
    password:passwordInputRef.current.value,
    country:countryInputRef.current.value,
};


let reqoptions={
    method:"POST",
    headers :myHeaders,
    body:JSON.stringify(dataToSend),
}

let rawdata = await fetch("http://localhost:2222/sign",reqoptions);

let converteddata = await rawdata.json();
console.log(converteddata.token);

localStorage.setItem("jwttoken",converteddata.token);

};




  return (
    <div>
        <form>
            <div>
                <label>firstName</label>
                <input ref={firstnameInputRef}></input>
            </div>
            <div>
                <label>lastName</label>
                <input ref={lastnameInputRef}></input>
            </div>
            <div>
                <label>email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>country</label>
                <input ref={countryInputRef}></input>
            </div>
            <div>
                <button type="button" onClick={()=>{
onsign();
                }}>Sign</button>
            </div>
            <br></br>
            <br></br>
        </form>
    </div>
  )
}

export default Sign