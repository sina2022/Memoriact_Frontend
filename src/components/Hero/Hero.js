import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';

const Hero = () => {
	return (
		<HeroSection>
			<HeroVideo src="../../../public/assets/hero.mp4" autoPlay muted loop />
			<Container>
				<MainHeading>Learn Coding Language with us</MainHeading>
				<HeroText>We provide the best flashcards for you studying</HeroText>
				<ButtonWrapper>
					<Link to="register">
						<Button>Get Started</Button>
					</Link>
					
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);
};

export default Hero;
