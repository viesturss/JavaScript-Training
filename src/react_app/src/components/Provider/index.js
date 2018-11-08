import React, { Component } from "react";

import ReactProvider from "./../../main_app/providers/ReactProvider";
import GameOfLife from "./../../main_app/app/GameOfLife";

import Changelog from "./../Changelog";
import Grid from "./../Grid";
import Config from "./../Config";

import MuiGrid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  config: {
    flexGrow: 0
  },
  grid: {
    width: 0
  }
});

const DEFAULTS = { sizeX: 100, sizeY: 50, speed: 500 };

class Provider extends Component {
  state = { grid: [], changeLog: [], isPaused: false };

  componentDidMount = () => {
    this.provider = new ReactProvider(this);
    this.game = new GameOfLife({
      provider: this.provider,
      sizeX: DEFAULTS.sizeX,
      sizeY: DEFAULTS.sizeY,
      speed: DEFAULTS.speed
    });

    this.game.start();
  };

  onIteration = (grid, counter) => {
    this.setState({ grid, changeLog: [...this.state.changeLog, counter].slice(-10) });
  };

  pause = () => {
    if (this.game.isPaused()) {
      this.game.start();
    } else {
      this.game.pause();
    }

    this.setState({ isPaused: this.game.isPaused() });
  };

  update = config => {
    const sizeX = parseInt(config.sizeX);
    const sizeY = parseInt(config.sizeY);
    const speed = parseInt(config.speed);

    if (sizeX && sizeY) {
      this.game.restart({
        provider: new ReactProvider(this),
        sizeX,
        sizeY,
        speed
      });

      this.setState({ isPaused: this.game.isPaused() });
    }
  };

  render() {
    const { classes } = this.props;
    const { grid, changeLog, isPaused } = this.state;

    return (
      <>
        <MuiGrid container>
          <MuiGrid item xs className={classes.config}>
            <Config pause={this.pause} update={this.update} defaults={DEFAULTS} isPaused={isPaused} />
          </MuiGrid>
          <MuiGrid item xs className={classes.grid}>
            <Grid grid={grid} />
          </MuiGrid>
        </MuiGrid>
        <Changelog changeLog={changeLog} />
      </>
    );
  }
}

export default withStyles(styles)(Provider);
