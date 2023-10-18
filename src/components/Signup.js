import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "",cpassword: ""})
  const [matchPassword, setmatchPassword] = useState(true)
  const host = "http://127.0.0.1:5000";
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    console.log(credentials)
    }

    const {name,email,password} = credentials
  // SignIn
  const onSubmit = async(e)=> {
    e.preventDefault();
    setmatchPassword(true);
    if (credentials.password !== credentials.cpassword ) {
      setmatchPassword(false);
      return;
    }
    //API
    //fetch(url, options): The fetch function is a modern JavaScript API for making network requests (HTTP requests). It takes at least one argument, the URL of the resource you want to fetch. In your code, you're sending a POST request to the url specified.
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //headers: { "Content-Type": "application/json" }: HTTP headers provide additional information about the request or response, and they are sent as key-value pairs. In this case, you're specifying that the request body contains JSON data.
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(data): The body property contains the data you want to send to the server. Before sending the data, it is converted to a JSON string using JSON.stringify(). This is necessary because the fetch API expects the body data to be a string.
      body: JSON.stringify({name, email, password}),
      // body: abc, 
    });


    // response.json(): The response from the server is returned by the fetch function. In this code, the response is assumed to be in JSON format. response.json() is an asynchronous method that reads the response body to completion and returns a promise that resolves with the result of parsing the body text as JSON.
    const json = await response.json(); 
    console.log(json)
    if (json.status) {
      localStorage.setItem('token', json.authtoken)
      navigate("/");
    }
      
    }

    





  return (
    <>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
      </div> 
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword}/>
        {!matchPassword && <p>Password do not match</p>}
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
   </form>
    </>
  )
}

export default Signup