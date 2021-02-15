import React from "react";

import NavCollapse from "./NavCollapse";
import NavItem from "./NavItem";
import NavLink from "./NavLink";
import { ListSubheader } from "@material-ui/core";

const NavGroupComponent = props => {
  const { item } = props;

  return (
    <>
      <ListSubheader>{item.title}</ListSubheader>

      {item.children && (
        <React.Fragment>
          {item.children.map(item => (
            <React.Fragment key={item.id}>
              {item.type === "group" && <NavGroup item={item} />}

              {item.type === "collapse" && <NavCollapse item={item} />}

              {item.type === "item" && <NavItem item={item} />}

              {item.type === "link" && <NavLink item={item} />}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </>
  );
};

const NavGroup = React.memo(NavGroupComponent);

export default NavGroup;
