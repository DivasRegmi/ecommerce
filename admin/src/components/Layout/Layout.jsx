import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { default as InnerLayout } from "../../layouts/Layout";
import LayoutContext from "../../context/LayoutContext";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    }
}));

function Layout(props) {
    const classes = useStyles(props);

    return (
        <LayoutContext.Provider value={{ content: props.children }}>
            <div className={classes.root}>
                <CssBaseline />
                <InnerLayout />
            </div>
        </LayoutContext.Provider>
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.any
};

export default Layout;
