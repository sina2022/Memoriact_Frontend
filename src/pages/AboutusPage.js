import React from 'react';

import { Content } from '../components/Content/Content';
import { heroTwo } from '../data/HeroData';
import Carousel from '../components/Carousel/Carousel'

const AboutusPage = () => {
    
        return (
            <>
                
            
                {/* <Features /> */}
                <Content {...heroTwo} />
           
            
              
                <Carousel />
            </>
        );
};

export default AboutusPage;
