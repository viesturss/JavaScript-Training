import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.defaults };
  }

  pause = event => {
    event.preventDefault();
    this.props.pause();
  };

  update = event => {
    event.preventDefault();
    this.props.update({ ...this.state });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes, isPaused } = this.props;
    const { sizeX, sizeY, speed } = this.state;
    const fieldProps = {
      margin: "dense",
      className: classes.textField,
      InputLabelProps: { shrink: true },
      type: "number",
      onChange: this.handleInputChange
    };

    return (
      <form>
        <TextField name="sizeX" label="Size X" value={sizeX} {...fieldProps} />
        <TextField name="sizeY" label="Size Y" value={sizeY} {...fieldProps} />
        <TextField name="speed" label="Speed" value={speed} {...fieldProps} />
        <div>
          <Button size="small" variant="outlined" onClick={this.update} className={classes.button}>
            Update
          </Button>
          <Button size="small" variant="outlined" onClick={this.pause} className={classes.button}>
            {isPaused ? "Continue" : "Pause"}
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(Config);
