import React from 'react';
import { Paper, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const useStyle = makeStyles(theme => ({
    root: {
        minWidth: '260px',
        minHeight: '133px',
        padding: '15px',
        margin: '10px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    firstSection: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    lastSection: {
        display: 'flex',
        alignItems: 'center',
        '& > p': {
            display: 'inline-block',
            marginLeft: '4px'
        }
    },
    icon: (props) => ({
        fontSize: '24px',
        color: props.growth ? '#34c381' : '#FF0000'
    }),
    color: (props) => {
        return {
            color: props.growth ? '#34c381' : '#FF0000'
        }
    }
}))








const Cart = (props) => {

    const classes = useStyle(props)
    const { title, subTitle, icon, growth, decrease } = props
    return (
        <Paper className={classes.root}>
            <div className={classes.firstSection}>
                <div className={classes.title}>
                    <Typography variant='h5' >
                        {title}
                    </Typography>
                    <Typography variant='subtitle2' color='textSecondary'>
                        {subTitle}
                    </Typography>
                </div>
                <div>


                    {icon ? <Icon style={{ fontSize: 50, color: '#34c381' }}>{icon}</Icon> :
                        <CircularProgress variant="determinate" value={50 + Math.floor(Math.random() * 30)} color='primary' thickness='5' />}
                </div>

            </div>

            <div className={classes.lastSection}>
                <Icon className={classes.icon}> {growth ? 'arrow_upward' : 'arrow_downward'} </Icon>
                <Typography className={classes.color} color='textSecondary'>{growth || decrease}%</Typography>
                <Typography color='textSecondary'>since last week</Typography>
            </div>
        </Paper >
    );
}

export default Cart;
