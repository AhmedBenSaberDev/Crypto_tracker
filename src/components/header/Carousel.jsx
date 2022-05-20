import React , { useContext } from 'react'

import AliceCarousel from 'react-alice-carousel'

import { Link } from 'react-router-dom'

import { CryptoContext } from '../../store/Context'

import useStyles from './carousel-styles';

const Carousel = () => {

  const classes = useStyles();

  const { trendingCoins } = useContext(CryptoContext)

  const responsive = {
    0:{
      items:2
    },
    512:{
      items:4
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const items = trendingCoins.map((c) => {

    let profit = c?.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${c.id}`}>
        <img
          src={c?.image}
          alt={c.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {c.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {c?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          ${numberWithCommas(c?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });


  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      responsive={responsive}
      autoPlay
      items={items}
      disableButtonsControls
    />
  )
}

export default Carousel