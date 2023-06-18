"use client"
import Image from 'next/image'
import HeroSection from './components/HeroSecction'
import FeaturesPage from './components/Features'
import FooterPage from './components/Footer'


export default function Home() {
  return (
    <h1> 
      <HeroSection />
      <FeaturesPage />
      <FooterPage/>
      
      
    </h1>
  )
}
