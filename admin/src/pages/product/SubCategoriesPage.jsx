import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSubCategories } from "../../redux/categorie/categorie.selectors";
import { fetchSubCategorieStart } from '../../redux/categorie/categorie.actions'


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

const SubCategoriePage = props => {
    const { subCategories, fetchSubCategorieStart } = props;
    const classes = useStyles();

    useEffect(() => {
        fetchSubCategorieStart()
    }, [fetchSubCategorieStart]);

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
                title={"SubCategorie List"}
                data={subCategories}
                columns={columns}
                options={options}
            />
        </Layout>
    );
};


const mapStateToProps = createStructuredSelector({
    subCategories: selectSubCategories
});

const mapDispatchToProps = (dispatch) => ({
    fetchSubCategorieStart: () => dispatch(fetchSubCategorieStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(SubCategoriePage);
