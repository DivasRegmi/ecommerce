import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Typography, Box, } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 10px'

    },
    my3: {
        margin: "1.3rem 0"
    },

    mRight: {
        marginRight: ".85rem"
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    priceSection: {
        display: 'flex',
        alignItems: 'center'

    },
    descriptionSection: {
        maxWidth: '450px',
        display: 'flex',
        justifyContent: 'space-between',
        flex: '1 1 0',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }

    },
    list: {
        '& ul': {
            paddingLeft: '30px',
        }
    }

}));
const ProductDetails = ({ product }) => {
    const classes = useStyles()
    return (
        <>
            <Box component="fieldset" borderColor="transparent" >
                <Typography
                    color='textSecondary'
                    variant='subtitle1'
                    className={classes.capitalize} >
                    {product && product.brand}
                </Typography>
                <Typography variant='h4'
                    className={classes.capitalize}>
                    {product && product.name}
                </Typography>
            </Box>


            <Box className={classes.flex} component="fieldset" borderColor="transparent">

                <Rating name="product-rating" value={4} readOnly />
                <Typography variant='subtitle2' color='textSecondary'>  (234) Reviews</Typography>
            </Box>


            <Box className={classes.priceSection} component="fieldset" mb={3} borderColor="transparent">
                <Typography
                    variant='h6'
                    className={classes.mRight}
                    color='textSecondary'
                    style={{ textDecoration: 'line-through' }} >
                    ${product && product.markedPrice}
                </Typography>

                <Typography variant='h6' className={classes.mRight}>
                    ${product && product.seelingPrice}
                </Typography>

                <Typography variant='subtitle1' className={classes.mRight} color='error'>
                    -{product && product.discountPercent}% off
        </Typography>
            </Box>
            <Typography color='textSecondary' variant='subtitle2' className={classes.mRight} >
                If several languages coalesce, the grammar of the resulting language is more simple and regular
             </Typography>

            <Box className={classes.descriptionSection} component="fieldset" mb={1} mt={3} borderColor="transparent">

                <div className={classes.list}>
                    <Typography variant='subtitle2' className={classes.mRight} >
                        Specification:
            </Typography>
                    <ul>
                        <li>
                            <Typography color='textSecondary' >
                                High Quality
                            </Typography>
                        </li>
                        <li>
                            <Typography color='textSecondary'>
                                Quality
                            </Typography>
                        </li>
                        <li>
                            <Typography color='textSecondary'>
                                All Sizes available
                            </Typography>
                        </li>
                        <li>
                            <Typography color='textSecondary'>
                                4 Different Color
                            </Typography>
                        </li>

                    </ul>
                </div>
                <div className={classes.list}>
                    <Typography variant='subtitle2' className={classes.mRight} >
                        Services:
            </Typography>
                    <ul>
                        <li>
                            <Typography color='textSecondary'>
                                10 Days Replacement
                            </Typography>
                        </li><li>
                            <Typography color='textSecondary'>
                                Cash on Delivery available
                            </Typography>
                        </li>


                    </ul>
                </div>
            </Box>
        </>
    );
}

export default ProductDetails;

