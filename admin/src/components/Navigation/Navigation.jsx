import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import navigationConfig from "../../configs/navigationConfig";

import NavGroup from "./sections/NavGroup";
import NavCollapse from "./sections/NavCollapse";
import NavItem from "./sections/NavItem";
import NavLink from "./sections/NavLink";
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logoBg: {
    backgroundColor: theme.palette.type !== "dark" && "#18202c"
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    padding: "1rem",
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
      <div className={clsx(classes.toolbar, classes.logoBg, classes.center)}>
        <LogoSVG className={classes.logo} height='200px' />
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
