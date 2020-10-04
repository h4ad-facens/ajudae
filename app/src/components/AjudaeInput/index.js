import React from 'react';
import { Input, InputArea } from './styles';

const AjudaeInput = ({
  IconSvg,
  placeholder,
  value,
  onChangeText,
  password,
  iconFill = '#BBB',
}) => {
  return (
    <InputArea>
      <IconSvg width="20" height="20" fill={iconFill} />
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

export default AjudaeInput;
