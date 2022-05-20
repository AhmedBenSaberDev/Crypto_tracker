import React , {useEffect , useContext} from 'react'

import { useParams } from 'react-router-dom';

import { CryptoContext } from '../store/Context'

import CoinInfo from '../components/CoinInfo';

import useStyles from './coin-styles';

import { Typography , CircularProgress } from '@material-ui/core';

import ReactHtmlParser from 'react-html-parser';

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coin = () => {

  const classes = useStyles();

  const { getCoinsDetails , coin , loading } = useContext(CryptoContext);

  const {id} = useParams();

  useEffect(() => {
    getCoinsDetails(id);
  }, []);

  
  return (

    <div className={classes.container}>  
      { loading ? <div style={{width:"30%",display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress style={{width:"100px"}}/></div> :  
      <div className={classes.sideBar}>
        <img src={coin?.image?.large} alt={coin?.name} height='200' style={{marginBottom:"20px"}}></img>
        <Typography variant='h3' className={classes.heading} >{coin?.name}</Typography>
        <Typography variant='subtitle1' className={classes.description} >{ ReactHtmlParser(coin?.description?.en.split(". ")[0])}</Typography>
        <div className={classes.marketData}>
          <span style={{display:'flex'}}>
            <Typography variant='h5' className={classes.heading}>Current Price : $ {numberWithCommas(coin?.market_data?.current_price?.usd)}</Typography>
          </span>

          <span style={{display:'flex'}}>
            <Typography variant='h5' className={classes.heading}>Rank : {coin?.market_cap_rank}</Typography>
          </span>

          <span style={{display:'flex'}}>
            <Typography variant='h5' className={classes.heading}>Market Cap : $ {numberWithCommas(coin?.market_data?.market_cap?.usd)?.slice(0,-6)} M</Typography>
          </span>
        </div>

      </div>
      }
      {/* chart */}
      <CoinInfo></CoinInfo> 
    </div>
  )
}

export default Coin