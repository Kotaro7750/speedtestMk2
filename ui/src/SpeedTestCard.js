import React from 'react';
import { Component } from 'react';
import './SpeedTestCard.css';
import ReactSpeedometer from "react-d3-speedometer"
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class SpeedTestCard extends Component {
    componentDidMount() {
    }
    render(props) {
        return (
            <div>
                <Grid container id="test">
                    <Grid item lg={3}>
                        <Card className="testGroup">
                            <CardContent>
                                <Typography variant="h5" component="h2">Download</Typography>
                            </CardContent>
                            <CardActions>
                                <ReactSpeedometer value={Number(this.props.state.dl)} maxValue={10} />
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card className="testGroup">
                            <CardContent>
                                <Typography variant="h5" component="h2">Upload</Typography>
                            </CardContent>
                            <CardActions>
                                <ReactSpeedometer value={Number(this.props.state.ul)} maxValue={5000} />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <div className="testGroup">
                    <div className="testArea">
                        <div className="testName">Ping</div>
                        <div id="pingText" className="meterText">{this.props.state.ping}</div>
                        <div className="unit">ms</div>
                    </div>
                    <div className="testArea">
                        <div className="testName">Jitter</div>
                        <div id="jitText" className="meterText">{this.props.state.jitter}</div>
                        <div className="unit">ms</div>
                    </div>
                </div>
                <div id="ipArea">
                    IP Address: <span id="ip">{this.props.state.ip}</span>
                </div>
            </div>
        )
    }
}

export default SpeedTestCard;