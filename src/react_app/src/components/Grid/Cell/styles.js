const styles = theme => ({
  cell: {
    display: "table-cell",
    "&:before": {
      content: "''",
      paddingTop: "calc(100% - 1px)",
      display: "block",
      border: "1px solid #efefef",
      borderRight: "none",
      borderBottom: "none"
    }
  },
  alive: {
    backgroundColor: "black"
  },
  dead: {
    backgroundColor: "white"
  }
});

export default styles;
