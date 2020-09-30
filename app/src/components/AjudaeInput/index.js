import React from 'react';
import {Input, InputArea} from './styles';

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
  return (
    <InputArea>
      <IconSvg width="20" height="20" fill="#BBB" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#BFBFBF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
