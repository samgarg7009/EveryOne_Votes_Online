import React, { useEffect, useState } from "react";
import VotingCard from "./VotingCard";
import "bootstrap/dist/css/bootstrap.css";
import Grid from '@mui/material/Grid';
import "./user.css";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session'
function Votepage() {
    let [teams, setTeams] = useState([]);
    const history = useNavigate();
    const [voterId, setVoterId] = useState();

    useEffect(() => {
        fetch("http://localhost:3500/api/candidates/get", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setTeams(data?.candidates)
                console.log(teams)
            })
            .catch((error) => console.log(error))
        // setTeams(teamsJson);
    }, []);

    const incrementVoteCount = async (teamId) => {
        fetch('http://localhost:3500/api/vote', {
            method: 'POST',
            body: JSON.stringify({
                aadharNumber: ReactSession.get(voterId),
                constituency: "ABC",
                candidateId: teamId
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'authorization': localStorage.getItem('login')
            },
        })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    history("/finalpage")
                }
            }
            )
            .catch((err) => {
                // Handle error if needed
            });
    }

    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {teams?.map((team) => {
                return (
                    <Grid item xs={4}>
                        <VotingCard
                            team={team}
                            incrementVoteCount={() => incrementVoteCount(team._id)}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}
export default Votepage;
