import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Typography, Grid, Box, withStyles } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        width: 138

    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        backgroundColor: '#ffb400',
    },
}))(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 0',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'start',

        }

    },
    firstComponent: {
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        flex: 1
    },
    secondComponent: {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            flex: 2,


        }
    },
    bar: {
        display: 'flex',
        alignItems: 'center'
    },
    mRight: {
        marginRight: 10
    }
}


));

const ProductReview = () => {
    const classes = useStyles()
    return (
        <>
            <Box mb={2}>
                <Typography variant='subtitle1' >
                    Product Review:
            </Typography>
            </Box>


            <Box component="fieldset" p={2} className={classes.root} >
                <Box borderColor="transparent" className={classes.firstComponent}>

                    <div>
                        <Typography variant='h1' component='span'>
                            4.0
                     </Typography>
                        <Typography variant='h2' color='textSecondary' component='span'>
                            /5
                     </Typography>
                    </div>



                    <Rating style={{ fontSize: "40px" }} name="product-rating" value={4} readOnly />
                    <Typography variant='body1' color='textSecondary'>
                        30 Ratings
                     </Typography>
                    <Box />

                    <Box borderColor="transparent">

                    </Box>
                </Box>

                <Box className={classes.secondComponent}>
                    <div className={classes.bar}>
                        <Rating className={classes.mRight} name="product-rating" value={5} readOnly />
                        <BorderLinearProgress className={classes.mRight} variant="determinate" value={70} />
                        <Typography component='span'>21</Typography>
                    </div>
                    <div className={classes.bar}>
                        <Rating className={classes.mRight} name="product-rating" value={4} readOnly />
                        <BorderLinearProgress className={classes.mRight} variant="determinate" value={15} />
                        <Typography component='span'>3</Typography>

                    </div>
                    <div className={classes.bar}>
                        <Rating className={classes.mRight} name="product-rating" value={3} readOnly />
                        <BorderLinearProgress className={classes.mRight} variant="determinate" value={18} />
                        <Typography component='span'>4</Typography>

                    </div>
                    <div className={classes.bar}>
                        <Rating className={classes.mRight} name="product-rating" value={2} readOnly />
                        <BorderLinearProgress className={classes.mRight} variant="determinate" value={10} />
                        <Typography component='span'>2</Typography>

                    </div>
                    <div className={classes.bar}>
                        <Rating className={classes.mRight} name="product-rating" value={1} readOnly />
                        <BorderLinearProgress className={classes.mRight} variant="determinate" value={0} />
                        <Typography component='span'>0</Typography>

                    </div>

                </Box>
            </Box>


        </>
    );
}

export default ProductReview;


