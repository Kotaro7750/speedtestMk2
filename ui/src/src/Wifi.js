import React from 'react';
import { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import SpeedTestCard from './SpeedTestCard';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Wifi.css'
import svg_styles from './svg.css'

class Wifi extends Component {
  constructor() {
    super();
    this.state = {
      dl: "",
      ul: "",
      ping: "",
      jitter: "",
      ip: "",
      worker: null,
      place: [],
      selected_place: 0,
      is_running: false,
      is_complete: false,
    };
    this.worker = null;
  }

  componentWillMount() {
    let url = process.env.REACT_APP_URL;

    fetch(url + "/place", {
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({ place: JSON.parse(json.result) });
      this.setState({ selected_place: this.state.place[0].id })

    }).catch((error) => {
      console.log(error);
    });
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
      this.worker.addEventListener("message", function(e) {
        console.log("test is completed!")
      });
      this.setState({ is_running: false })
      this.setState({ is_complete: false })
      this.worker = null;
    } else {
      //test is not running, begin
      this.worker = new Worker("./speedtest.worker.js");
      let wifi = { telemetry_level: "basic", time_dl: 5, time_ul: 5 };
      this.worker.postMessage('start ' + JSON.stringify(wifi)); //Add optional parameters as a JSON object to this command
      this.setState({ is_running: true })
      this.setState({ is_complete: false })
      this.worker.onmessage = function(e) {
        let data = e.data.split(';');
        let status = Number(data[0]);
        if (status >= 4) {
          //test completed
          this.setState({ is_running: false })
          this.setState({ is_complete: true })
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

  onSelected(event) {
    this.setState({
      selected_place: event.target.value
    })
  }

  submitData() {
    let url = process.env.REACT_APP_URL;

    let data = JSON.stringify({
      place: Number(this.state.selected_place),
      ping: Number(this.state.ping),
      jitter: Number(this.state.jitter),
      upload: Number(this.state.ul),
      download: Number(this.state.dl),
    });

    fetch(url + "/telemetry", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <FormControl className={styles.formControl}>
          <Select onChange={(event) => this.onSelected(event)} class={styles.formControl}>
            {this.state.place.map(d => <option value={d.id}>{d.place}</option>)}
          </Select>
        </FormControl>

        <Button color={this.state.is_running ? "secondary" : "primary"} variant="contained" onClick={() => this.startStop()}>
          {this.state.is_running ? "abort" : "start"}
        </Button>

        {this.state.is_complete &&
          <Button variant="contained" color="primary" onClick={() => this.submitData()}>
            送信<SendIcon />
          </Button>
        }

        <SpeedTestCard state={this.state} />
        <svg width='240' height='500' className={svg_styles.rect}>
          <rect
            y="62.654762"
            x="22.678572"
            height="99.029755"
            width="63.5"
            id="rect26" />
          <rect
            y="202.50595"
            x="78.619049"
            height="88.446426"
            width="77.10714"
            id="rect28" />
          <rect
            y="28.636904"
            x="133.04762"
            height="119.44047"
            width="59.720234"
            id="rect30" />
        </svg>
      </div>
    );
  }
}

export default Wifi;
