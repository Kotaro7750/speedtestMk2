import React from 'react';
import { Component } from 'react';
import './SpeedTestCard.css';
import ReactSpeedometer from "react-d3-speedometer"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class SpeedTestCard extends Component {
    componentDidMount() {
    }
    render(props) {
        return (
            <div id="test">

                <Card >
                    <CardContent>
                        <ReactSpeedometer value={Number(this.props.state.dl)} maxValue={10} />
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
                <div className="testGroup">
                    <div className="testArea">
                        <div className="testName">Download</div>
                        <div id="dlText" className="meterText">{this.props.state.dl}</div>
                        <div className="unit">Mbps</div>
                    </div>
                    <div className="testArea">
                        <div className="testName">Upload</div>
                        <div id="ulText" className="meterText">{this.props.state.ul}</div>
                        <div className="unit">Mbps</div>
                    </div>
                </div>
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