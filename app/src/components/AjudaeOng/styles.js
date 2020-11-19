import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
  min-height: 210px;
  height: 210px;
  margin: 10px;
  border-radius: 25px;
  position: relative;
`;

export const BirdContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const BirdImage = styled.Image`
  height: 80px;
  resizeMode: contain;
`;

export const OngTitle = styled.Text`
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 18px;
  padding: 8px;
`;
