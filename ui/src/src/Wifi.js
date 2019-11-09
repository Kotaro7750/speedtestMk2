import React from 'react';
import { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import SpeedTestCard from './SpeedTestCard';
//import wifiWorker from './speedTest.worker.js'

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

    componentDidMount() {
        setInterval(() => {
            if (this.worker !== null) this.worker.postMessage('status');
        }, 200);
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
            this.worker = new Worker("./speedtest.worker.js");
            let wifi = { telemetry_level: "basic", time_dl: 5, time_ul: 5 };
            //w.postMessage('start '+JSON.stringify(wifi)); //Add optional parameters as a JSON object to this command
            this.worker.postMessage('start ' + JSON.stringify(wifi)); //Add optional parameters as a JSON object to this command
            //I("startStopBtn").className = "running";
            this.worker.onmessage = function (e) {
                let data = e.data.split(';');
                //console.log(data);
                let status = Number(data[0]);
                if (status >= 4) {
                    //test completed
                    //I("startStopBtn").className = "";
                    this.worker = null;
                }
                this.setState({ ip: data[4] });
                this.setState({ dl: data[1] });
                this.setState({ ul: data[2] });
                this.setState({ ping: data[3] });
                this.setState({ jitter: data[5] });
            }.bind(this);
        }
    }

    submitData(){
      console.log(process.env.REACT_APP_TEST);
      let url = "http://localhost:1991";
      let data = JSON.stringify({
        place:1,
        ping:Number(this.state.ping),
        jitter:Number(this.state.jitter),
        upload:Number(this.state.ul),
        download:Number(this.state.dl),
      });

      fetch(url+"/telemetry",{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:data
      }).then((res) => {
        console.log("res");
      }).catch((error) => {
        console.log("error");
      });
    }

    render() {
        return (
            <div>
                <body>
                    <h1>東京大学教養学部学生自治会 UTokyoWiFiスピードテスト</h1>
                    <Fab color="secondary" variant="extended" aria-label="delete" onClick={() => this.startStop()}>start</Fab>
                    <Button variant="contained" color="primary" onClick={() => this.submitData()}>
                        送信
                        <SendIcon />
                    </Button>
                    <SpeedTestCard state={this.state} />
                </body>
            </div>
        );
    }
}

export default Wifi;
