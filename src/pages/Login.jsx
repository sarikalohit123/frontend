import React, { use } from "react";
import Header from "../components/Header";
import { useState} from "react";
import '../assets/css/login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login (){
    
    const navigate = useNavigate()
    const[username,setusername]=useState()
    const[password, setpassword]=useState()
    const[islogged, setloged]=useState("")
    const[showerror,setshowerror]=useState(false)
    console.log(showerror)
      const handlechange=(e,name)=>{
            let val=(e.target.value)
            if (name=="username"){
                setusername(val)
            }
            else{
                setpassword(val)
            }
            console.log(val);
      }
      const submitUserLogin = async(e) => {
        e.preventDefault(); 
        let objj={
            'username':username,
            'password':password
        }
        try{
            const res= await axios.post('https://backend-anrv.onrender.com/login', objj)
            console.log('res',res.data)
            if (res.data['status']=='true'){
                localStorage.setItem('uid',username+' '+password)
                navigate('/warehouse')
                window.location.reload();

            }
            else if (res.data['status']=='login failed') {
                setshowerror(true)
                setTimeout(() => {
                    setshowerror(false);
                  }, 10000);
            } else {
                console.log(res.data['status'])
            }
            // res ? console.log("logged successfully..."):console.log('login failed.')
        }
        catch(error){
            console.log(error)
        }
        // console.log("Login submitted", objj); 
      };
    
    return(
        <>
            <div className="log-head">
                <h1>Login</h1>
            </div>
            {
                showerror &&(
                    <div className="error_div">
                        <p id="creds_check">Invalid credentials</p>
                    </div>
                )
            }
            <div className="login-form">
                <form onSubmit={submitUserLogin}>
                    <label>Username</label><br/>
                    <input type="text" value={username || ""} name='username' placeholder="enter yor email"  onChange={(e)=> handlechange(e, "username")} autoFocus required/><br/><br/>

                    <label>Password</label><br/>
                    <input type="password" value={password || ""} name="pswd" placeholder="enter your password" onChange={(e)=> handlechange(e, "pswd")} required/><br/><br/>
                    <input type="submit" value="SUBMIT"/>
                </form>
                <br/><p id="signup_link">New user <span><Link to="/Signup">Sign up ?</Link></span></p>

            </div>
        </>
    )
}

export default Login