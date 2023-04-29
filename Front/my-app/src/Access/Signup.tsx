import React, { useState } from 'react'
import axios from 'axios';

const Signup = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [message, setmessage] = useState("")


  const MY_SERVER = "http://127.0.0.1:8000/register/"
  const doSignup = async() => {
    let res = await axios.post(MY_SERVER, {username, email, password})
      .then(res => {
                    setmessage(res.data);
                    console.log(res)
                  })
      .catch(error => {if (error.response.status === 500) {setmessage('Try again.')} })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>

      <div className="card" style={{width: '18rem', flexDirection: 'row'}}>
          <div className="card-body">
            <p className="card-text">
              <input type="text" className="form-control" placeholder="Username" onChange={(e) => setusername(e.target.value)}></input>
            </p>
            <p className="card-text">
              <input type="text" className="form-control" placeholder="Email" onChange={(e) => setemail(e.target.value)}></input>
            </p>
            <p className="card-text" style={{margin: '0.2rem 0'}}>
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></input>
            </p>
            <p className="card-text" style={{margin: '0rem 0', color: 'red', fontSize: 'small'}}>{message}</p>
            <button className="btn btn-primary" style={{margin: '1rem 0'}} onClick={() => doSignup()}>Register</button>
            
            <p className="card-text" style={{fontSize: 'small'}}><b><a href='/'>Go back to log-in page</a></b></p>
          </div>
      </div>

    </div>
  )
}

export default Signup