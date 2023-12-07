import React from "react";
import { Button } from "react-bootstrap";
import "./user.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

function FinalPage() {
    const history = useNavigate();

    const Logout =()=>{
        history("/");
    }
    return (
        <>
            <div class="main_header">
                <h1>you have successfully voted 🙋 </h1>
                <Button color="primary" onClick={Logout}>Log Out</Button>
            </div>
        </>
    );
}
export default FinalPage;
