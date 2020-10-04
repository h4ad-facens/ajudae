import React from 'react';
import { Container, Description, Title, HeaderDetail } from './styles';

const AjudaeHeader = ({ title, description, showDetail = false }) => {
  return (
    <Container>
      {showDetail && <HeaderDetail />}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Container>
  );
};

export default AjudaeHeader;
