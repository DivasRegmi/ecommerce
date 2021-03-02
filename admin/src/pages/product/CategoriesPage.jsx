import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories } from "../../redux/categorie/categorie.selectors";
import { fetchCategorieStart } from '../../redux/categorie/categorie.actions'


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
            filter: false,
            sort: true
        }
    },
    {
        name: "createdAt",
        label: "CreatedAt",
        options: {
            filter: false,
            sort: true
        }
    }
];



const options = {
    filterType: "checkbox"
};

const CategoriePage = props => {
    const { categories, fetchCategorieStart } = props;
    const classes = useStyles();

    useEffect(() => {
        fetchCategorieStart()
    }, [fetchCategorieStart]);

    return (
        <Layout>
            <Grid container className={classes.my3} alignItems="center">
                <Grid item className={classes.mRight}>
                    <Typography variant="h5" component="h1">
                        Categories
                     </Typography>
                </Grid>
            </Grid>
            <MUIDataTable
                title={"Categorie List"}
                data={categories}
                columns={columns}
                options={options}
            />
        </Layout>
    );
};


const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategorieStart: () => dispatch(fetchCategorieStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(CategoriePage);
