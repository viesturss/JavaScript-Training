import React from "react";
import Cell from "./Cell";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const Grid = ({ grid, classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.row}>
            {row.map((cell, colIndex) => (
              <Cell key={colIndex} value={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(Grid);
