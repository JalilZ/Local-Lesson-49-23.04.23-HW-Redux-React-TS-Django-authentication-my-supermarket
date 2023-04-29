import React, { useState } from 'react'
import axios from 'axios';

const Loggin = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [message, setmessage] = useState("")


  const MY_SERVER = "http://127.0.0.1:8000/login/"
  const doLoggin = async() => {
    let res = await axios.post(MY_SERVER, {username, password})
      .then(res => {                                                 //if successful: save access token + take me to shop + remove cart in storage (from previous user)
                    localStorage.setItem('MyToken', res.data.access); 
                    setmessage('');
                    localStorage.setItem('My Cart', '');
                    window.location.href = '/shop';})
      .catch(error => {if (error.response.status === 401) {setmessage('Wrong username or password.')} })
  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>

      <div className="card" style={{width: '18rem', flexDirection: 'row'}}>
          <div className="card-body">
            <p className="card-text">
              <input type="text" className="form-control" placeholder="Username" onChange={(e) => setusername(e.target.value)}></input>
            </p>
            <p className="card-text" style={{margin: '0.2rem 0'}}>
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></input>
            </p>
            <p className="card-text" style={{margin: '0rem 0', color: 'red', fontSize: 'small'}}>{message}</p>
            <button className="btn btn-primary" style={{margin: '1rem 0'}} onClick={() => doLoggin()}>Login</button>
            

            <p className="card-text" style={{color: 'gray', fontSize: 'small', margin: '0rem'}}>New to Yafo Online Super-Market?</p>
            <p className="card-text"><b><a href='/signup'>Sign Up</a></b></p>
          </div>
      </div>

    </div>
  )
}

export default Loggin