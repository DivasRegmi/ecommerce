import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsProductLoading, selectProduct } from '../../../redux/product/product.selectors';
import WithSpinner from '../../../components/with-spinner/WithSpinner';
import Carousel from '../../../components/Carousel/Carousel';

import { makeStyles, Typography, Grid, Card } from "@material-ui/core";

import ProductReview from '../../../components/Product/ProductReview';
import ProductDescription from '../../../components/Product/ProductDescription';
import ProductDetails from '../../../components/Product/ProductDetails';

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
            '& li': {
                color: 'rgba(0, 0, 0, 0.58)'
            }
        }
    }

}));


function ShowProduct({ product }) {
    const classes = useStyles()

    console.log(product);
    return (
        <div>

            <Typography variant="h5" component="h1" className={classes.my3}>
                Product Details
             </Typography>

            <Card className={classes.root}>
                <Grid container className={classes.my3} spacing={2} >
                    <Grid item xm='12' sm='6' md='5' >
                        <Carousel images={product && product.imageArray} />
                    </Grid>
                    <Grid item xs='12' sm='6' md='7' >
                        <ProductDetails product={product} />
                    </Grid>
                    <Grid item xs='12' >
                        <ProductDescription product={product} />
                    </Grid>
                    <Grid item xs='12' className={classes.my3} >
                        <ProductReview />
                    </Grid>
                </Grid>
            </Card>
        </div>



    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsProductLoading,
    product: selectProduct
});



export default compose(
    connect(mapStateToProps),
    WithSpinner
)(ShowProduct);;
