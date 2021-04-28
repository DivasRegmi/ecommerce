import React from 'react';
import Layout from '../../components/Layout/Layout'

import Cart from '../../components/Cart/Cart'

import { makeStyles } from '@material-ui/core';

import CostumerChart from '../../components/Chart/CostumerChart';



const useStyle = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flex: '1 1 0'
        }
    },

})
)


const DashBoard = () => {
    const classes = useStyle()
    return (
        <Layout>
            <h1>Dashboard</h1>
            <div className={classes.root}>
                <Cart title='$35,000' subTitle='Total Revenue' icon='paid' growth='2.50' />
                <Cart title='8,654' subTitle='Orders' decrease='2.40' />
                <Cart title='87,000' subTitle='Customers' decrease='1.56' />
                <Cart title='+6.50%' subTitle='Growth' icon='outbound' growth='5.50' />
            </div>

            <CostumerChart />
        </Layout>
    );
}

export default DashBoard;
