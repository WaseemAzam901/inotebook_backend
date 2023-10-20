import AlertContext from "./alertContext";
import React, { useState } from 'react'

const AlertState = (props) => {

    const[alert, setAlert] = useState ();
  const allu = "Bashir";
    const showAlert = (message, type) =>{
        setAlert({
          msg: message,
          type: type, 
      });
          setTimeout(() => {
            setAlert(null);
          }, 1500);
      }

  return (
    <>
    <AlertContext.Provider value={{showAlert, alert, allu}}>
        {props.children}
    </AlertContext.Provider>
    </>
  )
}

export default AlertState