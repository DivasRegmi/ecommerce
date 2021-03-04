import React from 'react'
import { makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types';



const useStyles = makeStyles(theme => ({
    root: {
        width: props => {
            const { size } = props
            if (size === 'small') {
                return '66px';
            } else if (size === 'medium') {
                return '300px';
            } else if (size === 'large') {
                return '500px';
            } else {
                return '250px'
            }
        },
        height: 'auto'
    }
}));

function Image(props) {
    const classes = useStyles(props);
    const { value } = props

    const image = `http://localhost:3000/images/product-img/${value || 'productdefault.jpg'}`



    return (
        <img className={classes.root} src={image} alt={value} />
    )
}

Image.prototype = {
    value: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
}

export default Image
