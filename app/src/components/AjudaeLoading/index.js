import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './styles';

const AjudaeLoading = ({ size = 'large', color = '#2E2E2E' }) => {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
};

export default AjudaeLoading;
