import React from 'react';

import Bird1 from '../../assets/bird_1.png';
import Bird2 from '../../assets/bird_2.png';
import Bird3 from '../../assets/bird_3.png';
import { BirdContainer, BirdImage, Container, OngTitle } from './styles';

const styles = [
  {
    color: '#3ED598',
    icon: Bird1,
  },
  {
    color: '#FFC542',
    icon: Bird2,
  },
  {
    color: '#FF565E',
    icon: Bird3,
  },
];

const AjudaeOng = ({ ong, style }) => {
  const selectedStyle = styles[style] || styles[0];

  return (
    <Container backgroundColor={selectedStyle.color}>
      <OngTitle>{ong.name}</OngTitle>

      <BirdContainer>
        <BirdImage source={selectedStyle.icon} />
      </BirdContainer>
    </Container>
  );
};

export default AjudaeOng;
