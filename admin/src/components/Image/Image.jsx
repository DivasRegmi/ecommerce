import React from 'react'
import { makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types';



const useStyles = makeStyles(theme => ({
    root: {
        minWidth: props => {
            const { size } = props
            if (size === 'small') {
                return '77px';
            } else if (size === 'medium') {
                return '150px';
            } else if (size === 'large') {
                return '400px';
            } else {
                return '300px'
            }
        },
        maxWidth: props => {
            const { size } = props
            if (size === 'small') {
                return '150px';
            } else if (size === 'medium') {
                return '200px';
            } else if (size === 'large') {
                return '500px';
            } else {
                return '400px'
            }
        },


    },
    img: {
        border: '1px solid #ddd',
        borderRadius: 4,
        padding: 5,
        width: '100%',
        height: 'auto'
    }
}));

function Image(props) {
    const classes = useStyles(props);
    const { value } = props

    const image = `http://localhost:3000/images/product-img/${value || 'productdefault.jpg'}`



    return (
        <div className={classes.root}>
            <img className={classes.img} src={image} alt={value} />
        </div>
    )
}

Image.prototype = {
    value: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
}

export default Image
