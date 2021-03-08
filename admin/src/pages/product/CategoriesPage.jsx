import React, { useEffect } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from 'moment'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories } from "../../redux/categorie/categorie.selectors";
import { fetchCategorieStart } from '../../redux/categorie/categorie.actions'

import Layout from "../../components/Layout/Layout";
import AddCategorie from '../../components/Categories/AddCategorie'


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
        name: "SubCategories",
        label: "SubCategories",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                return value ? value.map(data => <Typography key={data.id} style={{ display: 'block' }} variant='body'>{data.name}</Typography>) : 'None'
            }
        },

    },
    {
        name: "createdAt",
        label: "CreatedAt",
        options: {
            filter: false,
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
            <AddCategorie categories={categories} />
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
