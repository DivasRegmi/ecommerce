import React, { useState } from "react";
import { Typography, makeStyles, TextField, Paper, Button, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";



const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '10px'
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



}));

const AddCategorie = (props) => {
    const classes = useStyles();
    const [categorie, setCategorie] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategorie({ ...categorie, [name]: [value] });
    };

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
                    <Typography className={classes.heading} variant='h6'>Add Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Typography variant="h5" component="h1">
                            Add New Categorie
                         </Typography>


                        <TextField
                            id='name'
                            className={classes.textField}
                            margin="normal"
                            variant='outlined'
                            size='small'
                            required
                            fullWidth
                            name="name"
                            value={categorie.name}
                            autoFocus
                            onChange={handleChange}
                        />
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






export default AddCategorie;
