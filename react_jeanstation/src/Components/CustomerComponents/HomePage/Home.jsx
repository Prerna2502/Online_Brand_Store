import React from 'react'
import './Home.css'
import ProductCard from './ProductCard/ProductCard'
export default function Home() {
  return (
    <div className="col pb-5">
      <section className="HeroSection row">
        <img className="HeroImage col-sm-5 img-fluid " style={{ maxWidth: "80vw" }} src="heroSectiontravelbag.jpg" alt="models with jeanstation black travel bags" />
        <div className="HeroCaption col-sm-5">
          <h1>Welcome To JeanStation</h1>
          <p><b>Check our trending collection of bags which can go with all your styles</b></p>
          <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nemo saepe hic facilis sequi. Temporibus at numquam in unde
          , sit neque perspiciatis ut deserunt totam blanditiis ad odit,
          aliquid dolorum voluptates.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Veniam ipsam praesentium maxime repellat, at alias et exercitationem assumenda recusandae
           accusamus doloremque, ipsa optio, beatae eaque quis cum quia quos! Ipsam!</p>
        </div>
      </section>

      <section className="cointainerCateogory Container col-md-10 offset-1">
        <ProductCard />
      </section>
    </div>
  )
}
