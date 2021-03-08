import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Autocomplete } from '@material-ui/lab';
import { Typography, makeStyles, TextField, InputAdornment, Paper, Button } from "@material-ui/core";


import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSubCategories } from "../../redux/categorie/categorie.selectors";
import { fetchSubCategorieStart } from '../../redux/categorie/categorie.actions'
import { postProductStart } from "../../redux/product/product.actions";
import FormData from 'form-data'

import { selectProductErrors } from "../../redux/product/product.selectors";


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



const AddProductPage = ({ subCategories, fetchSubCategorieStart, postProductStart, errors }) => {
    const classes = useStyles();
    const initialProduct = {
        name: '',
        brand: '',
        costPrice: '',
        markedPrice: '',
        discountPercent: '',
        totalProduct: '',
        highlight: '',
        description: ''
    }
    const [subCategorie, setSubCategorie] = useState(null)
    const [product, setProduct] = useState(initialProduct);
    const [images, setImages] = useState({
        imageFile: null,
        imagePreview: '',
    })

    useEffect(() => {
        fetchSubCategorieStart()
    }, [fetchSubCategorieStart]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = { ...product }
        if (subCategorie && subCategorie.name) {
            payload = { ...product, subCategorie: subCategorie.name }
        }
        let formData = new FormData()

        for (const key in payload) {
            formData.append(key, payload[key]);
        }
        if (images.imageFile) {
            Object.values(images.imageFile).forEach(file => {
                formData.append("pro_images", file)
            });

        }

        postProductStart(formData)
        if (!errors) {
            setProduct(initialProduct)
            setSubCategorie(null)
            setImages({
                imageFile: null,
                imagePreview: '',
            })
        }
        window.scrollTo(0, 0)


    };

    const handleImagePreview = (e) => {
        const { files } = e.target

        let imageAsBase64 = Object.values(files).map((file) => {
            return URL.createObjectURL(file)
        }
        )
        let imageAsFiles = files
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
                const component = <div key={i} >
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
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">

                        <div>
                            <Typography variant='h6' xs='12'>
                                Name
                            </Typography>
                            <div className={classes.formSection}>
                                <TextField
                                    id='name'
                                    className={classes.textField}
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="name"
                                    value={product.name}
                                    autoFocus
                                    helperText={errors && errors.name ? errors.name : "Product name*"}
                                    error={errors && !!errors.name}
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
                                    return <TextField {...params} id='categorie'
                                        className={classes.textField}
                                        margin="normal"
                                        variant='outlined'
                                        helperText={errors && errors.subCategorie ? errors.subCategorie : "SubCategorie*"}
                                        error={errors && !!errors.subCategorie}
                                        size='small'
                                        required
                                        fullWidth
                                        autoFocus />
                                }}
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
                                    type='number'
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="costPrice"
                                    value={product.costPrice}
                                    helperText={errors && errors.costPrice ? errors.costPrice : "Cost Price*"}
                                    error={errors && !!errors.costPrice}
                                    autoFocus
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    id='markedPrice'
                                    className={classes.textField}
                                    type='number'
                                    helperText={errors && errors.markedPrice ? errors.markedPrice : "Marked Price*"}
                                    error={errors && !!errors.markedPrice}
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
                                    id='discountPercent'
                                    className={classes.textField}
                                    helperText='Discount Percent'
                                    type='number'
                                    margin="normal"
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    required
                                    name="discountPercent"
                                    value={product.discountPercent}
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
    subCategories: selectSubCategories,
    errors: selectProductErrors
});

const mapDispatchToProps = (dispatch) => ({
    fetchSubCategorieStart: () => dispatch(fetchSubCategorieStart()),
    postProductStart: (product) => dispatch(postProductStart(product))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage);



