import React , { useEffect , useContext } from 'react'

import { Line } from 'react-chartjs-2';
import {CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,Chart} from 'chart.js'


import { useParams } from 'react-router-dom';

import { CryptoContext } from '../store/Context';

import useStyles from './coinInfo.styles';
import { Button } from '@material-ui/core';

Chart.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const CoinInfo = () => {

    const buttons = [
        {
          label: "24 Hours",
          value: 1,
        },
        {
          label: "30 Days",
          value: 30,
        },
        {
          label: "3 Months",
          value: 90,
        },
        {
          label: "1 Year",
          value: 365,
        }]

    const classes = useStyles();

    const { HistoricalChart , historicalData , days ,setDays  } = useContext(CryptoContext);

    const {id} = useParams();

    useEffect(() => {
        HistoricalChart(id,days);
    },[days,id])

  return (
    <div className={classes.container}>
        { historicalData && 
        <Line
        data={{
          labels: historicalData?.prices?.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicalData?.prices?.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in $`,
              borderColor: "#3f51b5",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
        }

        <div style={{display:'flex',justifyContent:'space-around',marginTop:"20px",width:"100%"}}>
        {buttons.map(btn => 
            <Button key={btn.value} onClick={() => {setDays(btn.value)}} variant="contained" color="primary">{btn.label}</Button>
        )}
        </div>
    </div>
  )
}

export default CoinInfo