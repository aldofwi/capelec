import React from 'react'

import { Product, Footer, FooterBanner } from '../../components'

const Home = () => {

  return (

    <>
      HeroBanner

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Cables of many sizes</p>
      </div>

      <div className='products-container'>
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>

      Footer
    </>

  )
}

export default Home