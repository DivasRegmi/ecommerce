import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer as MUIDrawer } from "@material-ui/core";

import Navigation from "../components/Navigation/Navigation";
import NavigationContext from "../context/NavigationContext";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
    "& *": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
}));

const Drawer = (props) => {
  const classes = useStyles(props);
  const { open } = React.useContext(NavigationContext);

  return (
    <MUIDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Navigation />
    </MUIDrawer>
  );
};

export default Drawer;
