import React, { useEffect } from 'react'
import Layout from "../../components/Layout/Layout";
import WithSpinner from '../../components/with-spinner/WithSpinner';
import Image from '../../components/Image/Image';
import { compose } from 'redux'
// import { Typography, Grid, Button, makeStyles } from "@material-ui/core";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    selectProductById,
    selectIsProductLoading
} from '../../redux/product/product.selectors';
import { fetchProductStart } from '../../redux/product/product.actions'

import { useParams } from "react-router-dom";




function ShowProduct(props) {
    const { product: productId } = useParams();
    const { product, fetchProductStart } = props;


    // useEffect(() => {
    //     fetchProductStart(productId)

    // }, [fetchProductStart, productId]);

    return (
        <Layout>
            <div>
                {product && <Image size='large' value={product.imageArray} />}
            </div>
        </Layout>
    )
}


const mapStateToProps = createStructuredSelector({
    product: selectProductById,
    isLoading: selectIsProductLoading
});

const mapDispatchToProps = (dispatch) => ({
    fetchProductStart: (productId) => dispatch(fetchProductStart(productId))

});

const ShowProductContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithSpinner
)(ShowProduct);


export default ShowProductContainer



