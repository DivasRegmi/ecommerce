import React, { useEffect } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from 'moment';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSubCategories } from "../../redux/categorie/categorie.selectors";
import { fetchSubCategorieStart } from '../../redux/categorie/categorie.actions'
import Layout from "../../components/Layout/Layout";
import AddSubCategorie from '../../components/Categories/AddSubCategorie';

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
        name: "Categorie",
        label: "Categorie",
        options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                return value ? <Typography key={value.id} style={{ display: 'block' }} variant='body'>{value.name}</Typography> : 'None'
            }
        }
    },
    {
        name: "name",
        label: "SubCategorie",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Products",
        label: "Products",
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
            <AddSubCategorie />
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
