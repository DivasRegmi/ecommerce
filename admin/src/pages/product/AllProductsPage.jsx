import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from 'moment'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductsForTabel } from '../../redux/product/product.selectors';
import { fetchProductsStart } from '../../redux/product/product.actions'


import Image from '../../components/Image/Image'

const useStyles = makeStyles(theme => ({
    my3: {
        margin: "1.3rem 0"
    },
    mb0: {
        marginBottom: 0
    },
    mRight: {
        marginRight: ".85rem"
    },
    p1: {
        padding: ".85rem"
    }
}));

const columns = [
    {
        name: "id",
        label: "Id",
        options: {
            filter: false,
            sort: false,
            display: 'excluded'
        }
    },
    {
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "imageArray",
        label: "Image",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Image value={value} size='small' />
            }

        }
    },

    {
        name: "highlights",
        label: "Highlights",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        name: "price",
        label: "Price",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                return (
                    <div>
                        <Typography variant='body1'>
                            C.P.: Rs {value.costPrice}
                        </Typography>
                        <Typography variant='body1'>
                            M.P.: Rs {value.markedPrice}
                        </Typography>
                        <Typography variant='body1'>
                            D.P.: {value.discountPercent} %
                        </Typography>
                        <Typography variant='body1'>
                            S.P.: Rs {value.seelingPrice}
                        </Typography>

                    </div >)
            }
        }
    },

    {
        name: "createdAt",
        label: "CreatedAt",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                return (
                    <div>
                        <Typography variant='body1'>
                            {moment(value).calendar()}
                        </Typography>
                        <Typography variant='caption'>
                            {moment(value).fromNow()}
                        </Typography>
                    </div>)
            }
        }
    }
];





const AllProductsPage = props => {
    const { products, fetchProductStart } = props;
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        fetchProductStart()
    }, [fetchProductStart]);

    console.log(products);

    const options = {
        filterType: "checkbox",
        onRowClick: (rowData) => {
            history.push(`/pages/products/show/${rowData[0]}`)
        },
        onRowsDelete: (data) => {
            console.log(data);
        }
    };

    return (
        <Layout>
            <Grid container className={classes.my3} alignItems="center">
                <Grid item className={classes.mRight}>
                    <Typography variant="h5" component="h1">
                        Posts
                     </Typography>
                </Grid>

                <Grid item>
                    <Button
                        onClick={() => history.push("/pages/products/add-product")}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        Add Post
                    </Button>
                </Grid>
            </Grid>
            <MUIDataTable
                title={"Product List"}
                data={products}
                columns={columns}
                options={options}
            />
        </Layout>
    );
};


const mapStateToProps = createStructuredSelector({
    products: selectProductsForTabel
});

const mapDispatchToProps = (dispatch) => ({
    fetchProductStart: () => dispatch(fetchProductsStart())

});


export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
