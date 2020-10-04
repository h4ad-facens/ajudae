import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  width: ${(props) => props.width};
  height: 58px;
  background: ${(props) => props.backgroundColor};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

export const ButtonText = styled.Text`
  color: #fff;
  margin-right: 8px;
  font-size: 18px;
  font-weight: bold;
`;
