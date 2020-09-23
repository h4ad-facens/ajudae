import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #F5F6FC;
    flex: 1;
    align-items: center;
`;

export const HeaderArea = styled.View`
    width: 100%;
    padding: 0 40px 0 40px;
    margin-bottom: 24px;
    margin-top: 10%;
`;

export const BlueSquare = styled.View`
    width: 45px;
    height: 43px;
    color: #262626;
    background-color: #1890FF;
    border-radius: 12px;
    margin-bottom: 28px;
`;
export const WelcomeText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 15px;
`;
export const WelcomeDescription = styled.Text`
    font-size: 24px;
    color: #262626;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 0 40px 0 40px;
`;

export const SignMessageButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 14px;
    color: #1890FF;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #1890FF;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;
export const CustomButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin-right: 16px;
`;

export const CustomButtonArrow = styled.View`
    margin-top: 4px;
`;