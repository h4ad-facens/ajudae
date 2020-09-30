import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #FFF;
    flex-direction: row;
    border-radius: 12px;
    border: 2px solid #D9D9D9;
    padding-left: 22px;
    align-items: center;
    margin-bottom: 24px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 14px;
    color: #BFBFBF;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
    return(
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
}