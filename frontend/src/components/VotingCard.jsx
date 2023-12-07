import React from "react";
import "./user.css";
import { Button } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ReactSession } from 'react-client-session';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    backgroundColor: "#3f587d",
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    "&:hover": {
      boxShadow: "0 5px 30px 4px rgba(0,0,0,0.3)"
    }
  },
media: {
  height: 300,
  },
});


const VotingCard = (props) => {
  let { team, incrementVoteCount } = props;
  let storeVoterId = ReactSession.get("VoterId");
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 550 }} className={classes.card}>
      <CardMedia
        sx={{ height: 120 }}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {team.candidateName}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="success" onClick={() => incrementVoteCount(storeVoterId)}>
          Vote
        </Button>
      </CardActions>
    </Card>
  );
}


export default VotingCard;
