import React, { useContext, useState } from 'react'
// import { unstable_HistoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/notes/alertContext';


const Login = () => {

  const [credentials, setCredentials] = useState({email: "",password: "" })
  const host = "http://127.0.0.1:5000";
  let navigate = useNavigate();
  const lContext = useContext(alertContext)
  // let history = unstable_HistoryRouter
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    console.log(credentials)
    }

    // Login detail send to Node
    const handleSubmit =async (e)=> {
      // takay form submit per page reload na ho is liye hum neechay wwali eik line lagatay hain
      e.preventDefault();
      //API
            //API
      //fetch(url, options): The fetch function is a modern JavaScript API for making network requests (HTTP requests). It takes at least one argument, the URL of the resource you want to fetch. In your code, you're sending a POST request to the url specified.
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        //headers: { "Content-Type": "application/json" }: HTTP headers provide additional information about the request or response, and they are sent as key-value pairs. In this case, you're specifying that the request body contains JSON data.
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(data): The body property contains the data you want to send to the server. Before sending the data, it is converted to a JSON string using JSON.stringify(). This is necessary because the fetch API expects the body data to be a string.
        body: JSON.stringify({email: credentials.email,password: credentials.password}), 
      });
      // response.json(): The response from the server is returned by the fetch function. In this code, the response is assumed to be in JSON format. response.json() is an asynchronous method that reads the response body to completion and returns a promise that resolves with the result of parsing the body text as JSON.
      const responseData = await response.json();
      console.log(responseData) 
      if (responseData.success) {
        // save the auth token in local storage and then redirect
        localStorage.setItem('token', responseData.authtoken)
        navigate("/")
        lContext.showAlert("Login Successfully", "success");
      }
      else{
      lContext.showAlert("Enter the Correct Credential", "danger");
      }
    }


  return (
    <>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Login