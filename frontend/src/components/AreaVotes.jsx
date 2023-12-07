import React, { useState, useEffect } from "react";
import AreaJson from "./area.json";
import { Button } from "react-bootstrap";
import Votes from "./AreaVoteCard";
import "./areavotes.css";
// const allvotes = {
//     allusers: 3,
//     votedusers: 1,
//     pending: 2
// }

const AreaVotes = () => {
    const [area, setArea] = useState([]);
    const [Data, setData] = useState({});
    const [isVisible, setIsvisible] = useState(true)


    useEffect(() => {
        setArea(AreaJson);
    }, []);

    const onChangeArea = (event) => {
        event.preventDefault();
    };

    const selectArea = (event) => {
        setArea(event.target.value);
    }

    const showData = async (e) => {
        e.preventDefault();
        fetch('http://localhost:3500/api/admin/get', {
            method: 'POST',
            body: JSON.stringify({
                Area: area
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                //setArea(AreaJson);
            })
            .catch((err) => {
                console.log(err);
            });


    }
    return (
        <>
            <h1>Welcome, Voting Officer</h1>
            <p>select the constituency</p>
            <div className="sub_header">
                <select value={area.city} onChange={onChangeArea}>
                    {area.map((option) => (
                        <option value={option.id} onClick={selectArea}>{option.city}</option>
                    ))}
                </select>
                <Button variant="success" onClick={showData}>
                    Show
                </Button>
                {isVisible && <Votes data={Data} />}
            </div>
        </>
    );
};

export default AreaVotes;