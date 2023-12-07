import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css"
import AreaJson from "./area.json";
import { ReactSession } from 'react-client-session'
const Login = () => {
  const history = useNavigate();

  const [error, setError] = useState('')
  const [otpsendDisable, setotpsendDisable] = useState(true);
  const [voterId, setVoterId] = useState("")
  const [checkOtpDisable, setCheckOtpDisable] = useState(true);
  const [otp, setOtp] = useState("")

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const onChangeVoter = (e) => { 
    setVoterId(e.target.value)
    setotpsendDisable(!(voterId !== undefined || voterId !== null || voterId !== ""))
  }


  const sendOtp = (e) => {
    e.preventDefault();
    fetch('http://localhost:3500/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        aadharNumber: voterId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    // setVoterId("");
  }


  const onChangeOtp = (e) => {
    setOtp(e.target.value)
    setCheckOtpDisable(!(otp !== undefined || otp !== null || otp !== ""))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3500/api/users/verify', {
      method: 'POST',
      body: JSON.stringify({
        aadharNumber: voterId,
        otp: otp,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          // localStorage.setItem('login', data.token);
          ReactSession.set("voterId", voterId)
          localStorage.setItem('login', data.token);
          localStorage.setItem("isloggedin", isLoggedIn);
          history("/votepage")
        } else {
          setError("Invalid otp or already voted")
        }
      })
      .catch((err) => {
        //kya likhu yaha
      });
  }

  return (
    <div className="form">
      <form>
        {error && <Alert varient="danger">{error}</Alert>}
        <h2>Voter Log In</h2>
        <div className="input-container">
          <label>Voter Id No.</label>
          <input type="text" name="id" value={voterId} onChange={onChangeVoter} required />
          <div>
            <Button disabled={otpsendDisable} onClick={sendOtp}> send otp</Button>
          </div>
        </div>
        <div className="input-container">
          <label>Enter Otp </label>
          <input type="text" name="otp" value={otp} onChange={onChangeOtp} required />
        </div>
        <div>
          <Button disabled={checkOtpDisable} onClick={handleSubmit}>Check</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;