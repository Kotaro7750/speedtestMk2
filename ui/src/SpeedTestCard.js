import React from 'react';
import { Component } from 'react';
import './SpeedTestCard.css';

class SpeedTestCard extends Component {
    componentDidMount() {
    }
    render(props) {
        return (
            <div id="test">
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