import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  width: 58px;
  height: 58px;
  background: ${(props) => props.backgroundColor};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (!props.disabledMargins ? 'margin-bottom: 24px;' : '')}
  ${(props) => (!props.disabledMargins ? 'margin-top: 24px;' : '')}
`;
