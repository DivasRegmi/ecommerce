import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProducts } from '../../redux/product/product.selectors';
import { fetchProductStart } from '../../redux/product/product.actions'


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
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: true
        }
    },
    // {
    //     name: "imageArray",
    //     label: "ImageArray",
    //     options: {
    //         filter: false,
    //         sort: false
    //     }
    // },
    {
        name: "highlights",
        label: "Highlights",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        name: "costPrice",
        label: "CostPrice",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "seelingPrice",
        label: "SP",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "createdAt",
        label: "CreatedAt",
        options: {
            filter: true,
            sort: true
        }
    }
];



const options = {
    filterType: "checkbox"
};

const AllProductsPage = props => {
    const { history, products, fetchProductStart } = props;
    const classes = useStyles();

    useEffect(() => {
        fetchProductStart()
    }, [fetchProductStart]);

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
                        onClick={() => history.push("/pages/posts/add-post")}
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
    products: selectProducts
});

const mapDispatchToProps = (dispatch) => ({
    fetchProductStart: () => dispatch(fetchProductStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
