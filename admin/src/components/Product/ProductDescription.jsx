import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Image from '../Image/Image';

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function createData(name, value) {
    return { name, value };
}




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    section: {
        backgroundColor: theme.palette.background.paper,
    },
    descriptionTab: {
        display: 'flex',
        '& > .text': {
            paddingLeft: 20,
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            '& > .text': {
                padding: 0,
            }

        },

    },
    list: {
        '& ul': {
            paddingLeft: 40,
        }
    }
}));

function ProductDescription({ product }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const imageArray = product && product.imageArray
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const rows = product && [
        createData('Categorie', product.SubCategorie.name),
        createData('Brand', product.brand),
        createData('Color', 'Red'),
        createData('Quality', 'High'),
        createData('Material', 'Fiber'),
    ]



    return (
        <div className={classes.root}>
            <Typography variant='subtitle1'>
                Product description:
            </Typography>
            <div className={classes.section}>
                <AntTabs value={value} onChange={handleChange} >
                    <AntTab label="Description" />
                    <AntTab label="Specifications" />
                </AntTabs>
            </div>
            {rows &&
                <>
                    <TabPanel value={value} index={0} >

                        <div className={classes.descriptionTab}>
                            <Image value={imageArray && imageArray[0]} size='small' />

                            <div class="text">
                                <Typography color='textSecondary'>If several languages coalesce, the grammar of the resulting language is more simple and regular</Typography>
                                <Typography color='textSecondary'>Everyone realizes why a new common language would be desirable, one could refuse to pay expensive translators.</Typography>
                                <Typography color='textSecondary'>It will be as simple as occidental in fact.</Typography>

                                <div className={classes.list}>
                                    <ul>
                                        <li>
                                            <Typography color='textSecondary' >
                                                Lorem ipsum dolor sit.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography color='textSecondary'>
                                                Lorem, ipsum dolor.
                                         </Typography>
                                        </li>
                                        <li>
                                            <Typography color='textSecondary'>
                                                Lorem ipsum dolor sit.
                                          </Typography>
                                        </li>
                                    </ul>

                                </div>
                            </div>                        </div>

                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell >{row.value}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </>
            }

        </div>
    );
}

export default ProductDescription








