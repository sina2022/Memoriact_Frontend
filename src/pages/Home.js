import React from 'react';
// import Carousel from '../components/Carousel/Carousel';
import { Content } from '../components/Content/Content';

import Hero from '../components/Hero/Hero';
import { heroOne, heroThree } from '../data/HeroData';
import Pricing from '../components/Pricing/Pricing';
// import Userdashboard from '../components/Userdashboard/Userdashboard';


// Hero Feature Content Carousel

const Home = () => {
	return (
		<>
			{/* <Userdashboard/> */}
			 <Hero />
			 {/* <Features />  */}
			 <Content {...heroOne} /> 
			 <Pricing /> 
			 {/* <Content {...heroTwo} />  */}
		
			 <Content {...heroThree} /> 
			{/* <Carousel />  */}
		</>
	);
};

export default Home;
