import React from 'react';
import { Text, View } from 'react-native';

import RightArrowWhiteIcon from '../../assets/right-arrow-white.svg';
import { ButtonContainer, ButtonText } from './styles';

const AjudaeSaveButton = ({
  backgroundColor = '#1890ff',
  width = '100%',
  onPress,
  text,
}) => {
  return (
    <ButtonContainer
      width={width}
      backgroundColor={backgroundColor}
      onPress={onPress}>
      <ButtonText>{text}</ButtonText>
      <RightArrowWhiteIcon width="16px" height="9px" fill="#FFF" />
    </ButtonContainer>
  );
};

export default AjudaeSaveButton;
