import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  row: {
    height: 32
  }
});

const Changelog = ({ changeLog, classes }) => {
  return (
    <Table padding="dense">
      <TableHead>
        <TableRow className={classes.row}>
          <TableCell numeric>#</TableCell>
          <TableCell numeric>Isolation</TableCell>
          <TableCell numeric>Live</TableCell>
          <TableCell numeric>Over Population</TableCell>
          <TableCell numeric>Reproduction</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {changeLog.map((counter, index) => (
          <TableRow className={classes.row} key={index}>
            <TableCell component="th" scope="row">
              {counter.iteration}
            </TableCell>
            <TableCell numeric>{counter.isolation}</TableCell>
            <TableCell numeric>{counter.live}</TableCell>
            <TableCell numeric>{counter.overPopulation}</TableCell>
            <TableCell numeric>{counter.reproduction}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(Changelog);
