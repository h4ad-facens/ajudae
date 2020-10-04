import React from 'react';
import { View } from 'react-native';

import LeftArrowWhiteIcon from '../../assets/left-arrow-white.svg';
import { ButtonContainer } from './styles';

const AjudaeBackButton = ({ navigation, url }) => {
  return (
    <ButtonContainer onPress={() => navigation.navigate(url)}>
      <LeftArrowWhiteIcon
        width="16px"
        height="9px"
        fill="#FFF"></LeftArrowWhiteIcon>
    </ButtonContainer>
  );
};

export default AjudaeBackButton;
