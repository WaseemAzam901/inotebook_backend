import React from "react";

const Alert = (props) => {
    // console.log(props.msg)
  // msg k phelay letter ko capital karnay k liye yeh function banaya hai matlab Error, Success sab ka phela letter capital karnay k liye warna sab small main aata thay 
  const capitalize = (word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
return (
    <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>"{capitalize(props.alert.type)}"</strong>:{props.alert.msg}
        </div>}
    </div>
)
};

export default Alert;
