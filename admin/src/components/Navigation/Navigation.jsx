import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import navigationConfig from "../../configs/navigationConfig";

import NavGroup from "./sections/NavGroup";
import NavCollapse from "./sections/NavCollapse";
import NavItem from "./sections/NavItem";
import NavLink from "./sections/NavLink";
import { Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logoBg: {
    backgroundColor: theme.palette.type !== "dark" && "#18202c",
    // backgroundColor: "#18202c"
  },
  logo: {
    padding: "1rem",
    "& span": {
      display: "block",
      color: "rgba(41, 113, 245, 0.87)",
    },
  },
  navCustom: {
    "& .MuiTypography-root": {
      fontSize: ".85rem",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "35px",
    },
    "& .MuiCollapse-wrapperInner a": {
      paddingLeft: "50px",
    },
  },
}));

const Navigation = (props) => {
  const classes = useStyles(props);

  return (
    <div>
      <div className={clsx(classes.toolbar, classes.logoBg)}>
        <Typography
          className={classes.logo}
          variant="h6"
          component="h1"
          align="center"
        >
          &copy;
          <span>React Admin</span>
        </Typography>
        <iframe
          title="star repo"
          src="https://ghbtns.com/github-btn.html?user=mohammad&repo=-react-admin&type=star&size=large"
          frameworker="0"
          scrolling="0"
          width="75px"
          height="30px"
          frameBorder="none"
          style={{ margin: "0 0 20px 80px" }}
        />
      </div>
      <Divider />
      <List className={classes.navCustom}>
        {navigationConfig.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === "group" && <NavGroup item={item} />}

            {item.type === "collapse" && <NavCollapse item={item} />}

            {item.type === "item" && <NavItem item={item} />}

            {item.type === "link" && <NavLink item={item} />}

            {item.type === "divider" && <Divider className="my-16" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Navigation;
