import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 24px;
  flex-direction: row;
  justify-content: space-between;
`;
export const PersonItem = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  padding: 0 4px;
  background-color: ${(props) => props.color};
  border-radius: 12px;
  border: ${(props) => (props.selected ? '2px solid #2E2E2E' : '0px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PersonImage = styled.Image`
  height: 24px;
  width: 22px;
`;
