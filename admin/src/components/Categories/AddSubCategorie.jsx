import React, { useState, useEffect } from "react";
import { Typography, makeStyles, TextField, Paper, Button, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories } from "../../redux/categorie/categorie.selectors";
import { fetchCategorieStart } from '../../redux/categorie/categorie.actions'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '10px'
    },
    select: {
        height: '10px'
    },
    form: {
        width: '100%',
        padding: '10px',
    },

    textField: {
        paddingLeft: "10px"

    },
    heading: {
        paddingLeft: '10px'
    },

    submit: {
        margin: '10px 0',
    },
    textFieldSection: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    }



}));

const AddCategorie = ({ categories, fetchCategorieStart }) => {
    const classes = useStyles();
    const [categorie, setCategorie] = useState(null);
    const [subCategorie, setSubCategorie] = useState('')

    useEffect(() => {
        fetchCategorieStart()
    }, [fetchCategorieStart]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('subbmit');

    };





    return (

        <Paper className={classes.root} >
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel2a-header"
                >
                    <Typography className={classes.heading} variant='h6'>Add SubCategories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Typography variant="h5" component="h1">
                            Add New SubCategorie
                         </Typography>

                        <div className={classes.textFieldSection}>
                            <Autocomplete
                                id="autocomplete"
                                fullWidth
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                value={categorie}
                                onChange={(event, newValue) => {
                                    setCategorie(newValue);
                                }}
                                getOptionSelected={(option, value) => option.id === value.id}
                                renderInput={(params) => {
                                    console.log(params);
                                    return <TextField {...params} id='categorie'
                                        className={classes.textField}
                                        margin="normal"
                                        variant='outlined'
                                        helperText='Categorie'
                                        size='small'
                                        required
                                        fullWidth
                                        autoFocus />
                                }}
                            />

                            <TextField
                                id='subCategorie'
                                className={classes.textField}
                                helperText='SubCategorie'
                                margin="normal"
                                variant='outlined'
                                size='small'
                                required
                                fullWidth
                                value={subCategorie}
                                autoFocus
                                onChange={(e) => {

                                    console.log(categorie);
                                    setSubCategorie(e.target.value)
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            submit
                       </Button>
                    </form>
                </AccordionDetails>
            </Accordion>


        </Paper>

    );
};


const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategorieStart: () => dispatch(fetchCategorieStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(AddCategorie);






