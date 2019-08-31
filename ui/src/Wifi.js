import React from 'react';
import { Component } from 'react';
import SpeedTestCard from './SpeedTestCard';
import wifiWorker from './speedTest.worker.js'

class Wifi extends Component {
    constructor() {
        super();
        this.state = {
            dl: "",
            ul: "",
            ping: "",
            jitter: "",
            ip: "",
            worker: null
        };
        this.worker = null;
    }

    startStop() {
        if (this.worker != null) {
            //speedtest is running, abort
            this.worker.postMessage('abort');
            this.worker.addEventListener("message", function (e) {
                console.log("test is completed!")
            });
            this.worker = null;
            //I("startStopBtn").className = "";
            //initUI();
        } else {
            //test is not running, begin
            this.worker = new wifiWorker();
            let wifi = { telemetry_level: "basic", time_dl: 5, time_ul: 5 };
            //w.postMessage('start '+JSON.stringify(wifi)); //Add optional parameters as a JSON object to this command
            this.worker.postMessage('start ' + JSON.stringify(wifi)); //Add optional parameters as a JSON object to this command
            //I("startStopBtn").className = "running";
            this.worker.onmessage = function (e) {
                let data = e.data.split(';');
                let status = Number(data[0]);
                if (status >= 4) {
                    //test completed
                    //I("startStopBtn").className = "";
                    this.worker = null;
                }
                this.setState({ ip: data[4] });
                //I("ip").textContent = data[4];
                //test1 = data[4];
                //I("dlText").textContent = (status == 1 && data[1] == 0) ? "..." : data[1];
                this.setState({ dl: data[1] });
                //test2 = data[1];
                //I("ulText").textContent = (status == 3 && data[2] == 0) ? "..." : data[2];
                this.setState({ ul: data[2] });
                //test3 = data[2];
                //I("pingText").textContent = data[3];
                this.setState({ ping: data[3] });
                //test4 = data[3];
                //I("jitText").textContent = data[5];
                this.setState({ jitter: data[5] });
                //test5 = data[5];
            };
        }
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