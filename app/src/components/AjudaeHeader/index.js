import React from 'react';
import { Container, Description, Title } from './styles';

const AjudaeHeader = ({ title, description }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Container>
  );
};

export default AjudaeHeader;
