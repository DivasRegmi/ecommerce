import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';



const data = {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'aug', 'sept', 'oct', 'nov', 'dec'],
    datasets: [
        {
            type: 'bar',
            label: 'Mobile',
            backgroundColor: '#7388EB',
            barThickness: 20,
            data: [18, 7, 12, 15, 10, 17, 22, 25, 18, 10, 15, 25],
        },
        {
            type: 'line',
            label: 'Laptop',
            borderColor: '#FF7700',
            borderWidth: 5,
            fill: false,
            data: [30, 25, 36, 30, 45, 35, 64, 50, 37, 55, 40, 45, 50]
        },
        {
            type: 'line',
            label: 'Desktop',
            backgroundColor: '#F2F2F2',
            borderColor: '#DFE2E6',
            borderWidth: 4,
            fill: true,
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 32, 30],
        },

    ],
}

const options = (theme) => {
    const options = {

        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Points',
                        fontColor: theme.palette.text.primary
                    },
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 80,
                        width: 20,
                        fontColor: theme.palette.text.primary
                    },
                    gridLines: {
                        zeroLineColor: theme.palette.text.secondary,
                        color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(216,216,216, 0.1)'
                    }
                },
            ],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Months',
                    fontColor: theme.palette.text.primary
                },
                ticks: {
                    fontColor: theme.palette.text.primary
                },
                gridLines: {
                    display: false,
                    // zeroLineWidth: 0,
                    // color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(216,216,216, 0.1)'
                }
            }]

        },
        elements: {
            point: {
                radius: 0
            }
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: theme.palette.text.primary
            }

        }


    }

    return options
}




const useStyle = makeStyles(theme => ({
    root: {
        maxWidth: 700
    },
    barBox: {
        maxWidth: 900
    }

})
)

const CostumerChart = () => {
    const classes = useStyle()
    const theme = useTheme();
    return (
        <>
            <div className='header'>
                <h1 className='title'>Vertical Bar Chart</h1>
            </div>
            <div className={classes.barBox}>

                <Bar data={data} options={options(theme)} />
            </div>
        </>
    );
}
// 
export default CostumerChart;



