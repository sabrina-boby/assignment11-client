import React from 'react'
import Carousel from '../Carousel/Carousel'
import Register from '../Register/Register'
import States from './States'
import LanguageCategory from './LanguageCategory'
import FAQ from './FAQ'
import SuccessStory from './SuccessStory'

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <States></States>
      <LanguageCategory></LanguageCategory>
      <SuccessStory></SuccessStory>
      <FAQ></FAQ>
      
    </div>
  )
}

export default Home
