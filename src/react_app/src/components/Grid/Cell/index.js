import React, { PureComponent } from "react";
import classnames from "classnames";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const cellClassName = (value, classes) => {
  return classnames(classes.cell, {
    [classes.alive]: value,
    [classes.dead]: !value
  });
};

class Cell extends PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.value !== this.props.value;
  // }

  render() {
    const { value, classes } = this.props;

    return <div className={cellClassName(value, classes)} />;
  }
}

export default withStyles(styles)(Cell);
