import React from 'react'

import { Typography , Container } from '@material-ui/core';

import Carousel from './Carousel';

import useStyles from './styles';

const Header = () => {

  const classes = useStyles();

  return (
    <div>
      <Typography color='primary' style={{padding:"30px 0",color:'#FFFFFFCC'}} align='center' variant='h3'>Crypto Tracker</Typography>
    
      <div className={classes.banner}>
        <Container className={classes.container}>
        
          <Carousel></Carousel>
        </Container>
      </div>
    </div>
  )
}

export default Header;