import React from 'react';
import { Component } from 'react';
import SpeedTestCard from './SpeedTestCard';

class Wifi extends Component {
    constructor() {
        super();
        this.state = {
            dl: "",
            ul: "",
            ping: "",
            jitter: "",
            ip: ""
        }
    }

    startStop() {
        this.setState({ dl: "15.7" })
    }

    submitData() {
    }

    render() {
        return (
            <div>
                <body>
                    <h1>東京大学教養学部学生自治会 UTokyoWiFiスピードテスト</h1>
                    <div id="startStopBtn" onClick={() => this.startStop()}></div>
                    <div id="submit" onClick={() => this.submitData()}></div>
                    <SpeedTestCard state={this.state} />
                </body>
            </div>
        );
    }
}

export default Wifi;