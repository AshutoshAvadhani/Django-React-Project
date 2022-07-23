import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default class CreateRoomPage extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestCanpause: true,
        update: false,
        roomCode: null,
        updateCallback: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {
            guestCanpause: this.props.guestCanpause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: "",
        };
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handelVotesChange = this.handelVotesChange.bind(this);
        this.handelGuestCanPauseChange = this.handelGuestCanPauseChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    handelVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }
    handelGuestCanPauseChange(e) {
        this.setState({
            guestCanpause: e.target.value === "true" ? true : false,
        });
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanpause,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push("/room/" + data.code));
    }

    handleUpdateButtonPressed() {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanpause,
                code: this.props.roomCode,
            }),
        };
        fetch("/api/update-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        successMsg: "Room Updated Successfully",
                    });
                } else {
                    this.setState({
                        errorMsg: "Error updating room...",
                    });
                }
                this.props.updateCallback();
            });
    }




    renderCreateButtons() {
        return (<Grid container spacing={1}><Grid item xs={12} align="center">
            <Button
                color="primary"
                variant="contained"
                onClick={this.handleRoomButtonPressed}
            >
                Create A Room
            </Button>
        </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
        );
    }

    renderUpdateButtons() {
        return (<Grid item xs={12} align="center">
            <Button
                color="primary"
                variant="contained"
                onClick={this.handleUpdateButtonPressed}
            >
                Update A Room
            </Button>
        </Grid>);
    }

    render() {

        const title = this.props.update ? "Update Room" : "Create a Room";

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
                        {this.state.successMsg != "" ? (
                            <Alert
                                severity="success"
                                onClose={() => {
                                    this.setState({ successMsg: "" });
                                }}
                            >
                                {this.state.successMsg}
                            </Alert>
                        ) : (
                            <Alert
                                severity="error"
                                onClose={() => {
                                    this.setState({ errorMsg: "" });
                                }}
                            >
                                {this.state.errorMsg}
                            </Alert>
                        )}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State.</div>
                        </FormHelperText>
                        <RadioGroup
                            row
                            defaultValue={this.props.guestCanpause.toString()}
                            onChange={this.handelGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            ></FormControlLabel>
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            ></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            onChange={this.handelVotesChange}
                            defaultValue={this.state.votesToSkip}
                            inputProps={{ min: 1, style: { textAlign: "Center" } }}
                        ></TextField>
                        <FormHelperText>
                            <div align="center">Votes required to skip the song.</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
            </Grid>
        );
    }
}
