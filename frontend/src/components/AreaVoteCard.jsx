import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
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

function Votes(props) {
    //let { team, incrementVoteCount } = props;
    let { allusers, votedusers, pending } = props.data;
    const classes = useStyles();

    return (
        <div class="container">
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 600 }} className={classes.card}>
                        <CardMedia
                            sx={{ height: 90 }}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No. of people registered
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {allusers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 600 }} className={classes.card}>
                        <CardMedia
                            sx={{ height: 90 }}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No. of people voted
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {votedusers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 600 }} className={classes.card}>
                        <CardMedia
                            sx={{ height: 90 }}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                No. of people pending
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {pending}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}


export default Votes;
