import React from 'react';
import AjudaeSpacing from '../AjudaeSpacing';
import { Input, InputArea } from './styles';

const AjudaeInput = ({
  IconSvg,
  placeholder,
  value,
  onChangeText,
  password,
  iconFill = '#BBB',
  textAreaMode = false,
  borderRadius = 12,
}) => {
  return (
    <InputArea borderRadius={borderRadius}>
      <AjudaeSpacing marginTop="13px">
        <IconSvg width="20" height="20" fill={iconFill} />
      </AjudaeSpacing>
      <Input
        multiline={textAreaMode}
        numberOfLine={textAreaMode ? 4 : 1}
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
