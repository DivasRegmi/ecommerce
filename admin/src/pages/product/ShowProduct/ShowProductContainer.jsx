import React, { useEffect, } from 'react'
import Layout from "../../../components/Layout/Layout";
import { connect } from 'react-redux';

import { fetchProductStart } from '../../../redux/product/product.actions'

import { useParams } from "react-router-dom";
import ShowProduct from './ShowProduct';


function ShowProductContainer(props) {
    const { product: productId } = useParams();
    const { fetchProductStart } = props;



    useEffect(() => {
        fetchProductStart(productId)
    }, [fetchProductStart, productId,]);



    return (
        <Layout>
            <ShowProduct />
        </Layout>
    )
}



const mapDispatchToProps = (dispatch) => ({
    fetchProductStart: (productId) => dispatch(fetchProductStart(productId))
});


export default connect(null, mapDispatchToProps)(ShowProductContainer)

