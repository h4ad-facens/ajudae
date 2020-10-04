import React from 'react';
import { View } from 'react-native';

import LeftArrowWhiteIcon from '../../assets/left-arrow-white.svg';
import { ButtonContainer } from './styles';

const AjudaeBackButton = ({
  navigation,
  url,
  backgroundColor = '#1890ff',
  disabledMargins = false,
}) => {
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      disabledMargins={disabledMargins}
      onPress={() => navigation.navigate(url)}>
      <LeftArrowWhiteIcon width="16px" height="9px" fill="#FFF" />
    </ButtonContainer>
  );
};

export default AjudaeBackButton;
