import React from 'react';
import ReactSpeedometer from "react-d3-speedometer"
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import './SpeedTestCard.css';

const useStyles = makeStyles({
  testGroup: {
    display: 'inline-block'
  },

  doubleCard: {
    display: 'inline-block',
    width: '60%',
    height: '40%',
    position: 'relative',
    boxSizing: 'border-box',
    margin: '5%'
  },

  singleCard: {
    display: 'inline-block',
    width: '90%',
    height: '90%',
    position: 'relative',
    boxSizing: 'border-box',
    margin: '5%'
	}
});

const SpeedTestCard = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container id="test">

        <Grid item lg={3}>
          <Card className={classes.testGroup}>
            <CardContent>
              <Typography variant="h5" component="h2">Download</Typography>
            </CardContent>
            <CardActions>
              <ReactSpeedometer value={Number(props.state.dl)} maxValue={10} />
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={3}>
          <Card className={classes.testGroup}>
            <CardContent>
              <Typography variant="h5" component="h2">Upload</Typography>
            </CardContent>
            <CardActions>
              <ReactSpeedometer value={Number(props.state.ul)} maxValue={5000} />
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={3}>
          <Card className={classes.doubleCard} >
            <CardContent>
              <Typography variant="h5" component="h2">Ping</Typography>
            </CardContent>
            <CardActions>
              <div id="jitText" className="meterText">{props.state.ping}</div>
              <div className="unit">ms</div>
            </CardActions>
          </Card>
          <Card className={classes.doubleCard} >
            <CardContent>
              <Typography variant="h5" component="h2">Jitter</Typography>
            </CardContent>
            <CardActions>
              <div id="jitText" className="meterText">{props.state.jitter}</div>
              <div className="unit">ms</div>
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={3}>
          <Card className={classes.singleCard} >
            <CardContent>
              <Typography variant="h5" component="h2">IP Address</Typography>
              <span id="ip">{props.state.ip}</span>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  )
}

export default SpeedTestCard;
