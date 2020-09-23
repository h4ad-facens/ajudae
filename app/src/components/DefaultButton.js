import React from 'react';
import styled from 'styled-components/native';

const CustomButton = styled.TouchableOpacity`
    width: 100%;
    height: 72px;
    margin-bottom: 24px;
    border-radius: 25px;
    border: 2px dashed #1890FF;
    position: relative;
    justify-content: center;
`;

const CustomButtonCircle = styled. View`
    width: 38px;
    height: 38px;
    background-color: #1890FF;
    border-radius: 19px;
    position: absolute;
    align-items: center;
    justify-content: center;
    margin-left: 25px;
`;

const CustomButtonTextParent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const CustomButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #1890FF;
`;

export default ({IconSvg, text, width, height, onPress}) => {
    return(
        <CustomButton onPress={onPress}>
            <CustomButtonCircle>
                <IconSvg width={width} height={height} fill="#FFF"/>
            </CustomButtonCircle>
            <CustomButtonTextParent>
                <CustomButtonText>{text}</CustomButtonText>
            </CustomButtonTextParent>
        </CustomButton> 
    );
}