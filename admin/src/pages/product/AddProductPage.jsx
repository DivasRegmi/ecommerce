import React, { useState, useEffect } from "react";

import Layout from "../../components/Layout/Layout";
import { Autocomplete } from '@material-ui/lab';
import { Typography, makeStyles, TextField, InputAdornment, Paper, Button } from "@material-ui/core";


import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSubCategories } from "../../redux/categorie/categorie.selectors";
import { fetchSubCategorieStart } from '../../redux/categorie/categorie.actions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    form: {
        padding: '10px',

    },
    formSection: {
        [theme.breakpoints.up("sm")]: {
            display: 'flex'
        },
    },
    textField: {
        paddingLeft: "10px"
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    formTitle: {
        margin: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    imagePreview: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '& > div': {
            padding: '10px',
            '& > img': {
                width: '166px',
                height: 'auto'
            }
        }

    },
    btnImageUpload: {
        margin: '10px'
    }

}));

const AddProductPage = ({ subCategories, fetchSubCategorieStart }) => {
    const classes = useStyles();
    const [subCategorie, setSubCategorie] = useState(null)
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        subCategorie: '',
        costPrice: '',
        markedPrice: '',
        discount: '',
        totalProduct: '',
        highlight: '',
        description: ''
    });

    useEffect(() => {
        fetchSubCategorieStart()
    }, [fetchSubCategorieStart]);

    const [images, setImages] = useState({
        imageFile: null,
        imagePreview: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: [value] });

        // if (errors.err) {
        //     setErrors({
        //         ...errors,
        //         err: false,
        //         [name]: "",
        //     });
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


    };

    const handleImagePreview = (e) => {
        const { files } = e.target
        console.log(files);
        let imageAsBase64 = Object.values(files).map((file) => {
            console.log(file)
            return URL.createObjectURL(file)
        }
        )
        let imageAsFiles = e.target.files;



        setImages({
            imageFile: imageAsFiles,
            imagePreview: imageAsBase64
        })
    }

    const imagePreview = () => {
        const { imageFile, imagePreview } = images
        let div = []
        if (imagePreview && imageFile) {

            for (let i = 0; i < imagePreview.length; i++) {
                const component = <div>
                    <img src={imagePreview[i]} alt="product" />
                    < Typography variant='subtitle1' >
                        {imageFile[i].name}</Typography >
                </div >

                div.push(component)

            }

        }
        return div
    }

    return (
        <Layout>
            <Typography className={classes.title} variant="h5" component="h1">
                Add New Post
                 </Typography>

            <Paper >
                <div className={classes.root}>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>

                        <div>
                            <Typography variant='h6' xs='12'>
                                Name
                            </Typography>
                            <div className={classes.formSection}>
                                <TextField
                                    id='name'
                                    className={classes.textField}
                                    helperText="Product name*"
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="name"
                                    value={product.name}
                                    autoFocus
                                    onChange={handleChange}
                                />
                                <TextField
                                    id='brand'
                                    className={classes.textField}
                                    helperText="Brand name"
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    name="brand"
                                    value={product.brand}
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography variant='h6'>
                                Categorie
                            </Typography>
                            <Autocomplete
                                id="autocomplete"
                                fullWidth
                                options={subCategories}
                                getOptionLabel={(option) => option.name}
                                value={subCategorie}
                                onChange={(event, newValue) => {
                                    setSubCategorie(newValue);
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
                                helperText='Sub Categorie*'
                                margin="normal"
                                variant='outlined'
                                size='small'
                                fullWidth
                                required
                                name="subCategorie"
                                value={product.subCategorie}
                                autoFocus
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Typography variant='h6'>
                                Price
                            </Typography>
                            <div className={classes.formSection}>
                                <TextField
                                    id='costPrice'
                                    className={classes.textField}
                                    helperText='Cost Price*'
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="costPrice"
                                    value={product.costPrice}
                                    autoFocus
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    id='markedPrice'
                                    className={classes.textField}
                                    helperText='Marked Price*'
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="markedPrice"
                                    value={product.markedPrice}
                                    autoFocus
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    id='discount'
                                    className={classes.textField}
                                    helperText='Discount Percent'
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="discount"
                                    value={product.discount}
                                    autoFocus
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}

                                />
                            </div>

                        </div>
                        <div>
                            <Typography variant='h6'>
                                Product Number
                            </Typography>
                            <TextField
                                id='totalProduct'
                                className={classes.textField}
                                helperText='No. of Product'
                                margin="normal"
                                variant='outlined'
                                size='small'
                                fullWidth
                                name="totalProduct"
                                value={product.totalProduct}
                                autoFocus
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Typography variant='h6'>
                                Highlight
                            </Typography>
                            <TextField
                                id='highlight'
                                className={classes.textField}
                                helperText='Product highlight (comma seperated)'
                                margin="normal"
                                variant='outlined'
                                size='small'
                                fullWidth
                                name="highlight"
                                value={product.highlight}
                                autoFocus
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Typography variant='h6'>
                                Description
                            </Typography>
                            <TextField
                                id='description'
                                className={classes.textField}
                                helperText='Product Description'
                                margin="normal"
                                variant='outlined'
                                size='small'
                                fullWidth
                                multiline
                                name="description"
                                value={product.description}
                                autoFocus
                                onChange={handleChange} />
                        </div>

                        <div>
                            <Typography variant='h6'>
                                Product Images
                            </Typography>

                            <Button
                                variant="contained"
                                component="label"
                                color="primary"
                                className={classes.btnImageUpload}
                            >
                                Upload
                                 <input
                                    type="file"
                                    hidden
                                    onChange={handleImagePreview}
                                    multiple
                                />
                            </Button>

                            <div className={classes.imagePreview}>
                                {images.imagePreview && imagePreview()}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            submit
                       </Button>

                    </form>


                </div >
            </Paper>
        </Layout >
    );
};

const mapStateToProps = createStructuredSelector({
    subCategories: selectSubCategories
});

const mapDispatchToProps = (dispatch) => ({
    fetchSubCategorieStart: () => dispatch(fetchSubCategorieStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage);



