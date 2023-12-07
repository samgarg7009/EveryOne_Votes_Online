import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css"
const OfficerLogin = () => {
    const history = useNavigate();

    // const { login } = useAuth();

    const [error, setError] = useState('')
    const [otpsendDisable, setotpsendDisable] = useState(true);
    //const [check,setCheck] = useState(false);
    const [voterId, setVoterId] = useState("")
    const [otpInput, setOtpInput] = useState(true);
    const [checkOtpDisable, setCheckOtpDisable] = useState(true);
    const [otp, setOtp] = useState("")
    const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(true)
    localStorage.setItem("isofficerLoggedin", isOfficerLoggedIn);

    
    const onChangeVoter = (e) => {
        setVoterId(e.target.value)
        setotpsendDisable(!(voterId !== undefined || voterId !== null || voterId !== ""))
    }

    const sendOtp = (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                voterID: voterId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.valid) {
                    //how to send otp request
                    setOtpInput(true);
                } else {
                    setError("Invalid Voter Id")
                }
            })
            .catch((err) => {
                //kya likhu yaha
            });
        setVoterId("");
    }


    const onChangeOtp = (e) => {
        setOtp(e.target.value)
        setCheckOtpDisable(!(otp !== undefined || otp !== null || otp !== ""))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                Otp: otp,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.valid) {
                    setIsOfficerLoggedIn(true);
                    // localStorage.setItem("isofficerLoggedin", isOfficerLoggedIn);
                    history("/areavotes")
                } else {
                    setError("Invalid otp")
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
                <h2>Voting Officer Log In</h2>
                <div className="input-container">
                    <label>Officer Id No.</label>
                    <input type="text" name="id" value={voterId} onChange={onChangeVoter} required />
                    {/* {renderErrorMessage("uname")} */}
                    <div>
                        <Button color="primary" disabled={otpsendDisable} onClick={sendOtp}> send otp</Button>
                    </div>
                </div>
                <div className="input-container">
                    <label>Enter Otp </label>
                    <input type="text" name="otp" value={otp} onChange={onChangeOtp} disabled={otpInput} required />
                    {/* {renderErrorMessage("pass")} */}
                </div>
                <div>
                    <Button color="primary" disabled={checkOtpDisable} onClick={handleSubmit}>Check</Button>
                </div>
            </form>
        </div>
    );
};

export default OfficerLogin;