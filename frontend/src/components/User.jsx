import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import "./user.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

function User() {
  const history = useNavigate();

  const Voterlogin =()=>{
    history("/login")
  }
  const Officerlogin = () => {
    history("/officerlogin")
  }
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Are you a Voter</h5>
                <div><Button onClick={Voterlogin}>Click here </Button></div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">Are you a Votting Officer</h5>
                <Button onClick={Officerlogin}>Click here </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
export default User;
