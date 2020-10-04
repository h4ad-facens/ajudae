import styled from 'styled-components/native';

export const InputArea = styled.View`
  width: 100%;
  ${(props) => (props.multiline ? 'min-height: 140px;' : '')}
  background-color: #fff;
  flex-direction: row;
  border-radius: 12px;
  border: 2px solid #d9d9d9;
  padding-left: 22px;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #bfbfbf;
  margin-left: 10px;
  padding-top: 13px;
  padding-right: 16px;
  padding-bottom: 8px;
  text-align: justify;
  align-items: ${(props) => (props.multiline ? 'flex-start' : 'center')};
  text-align-vertical: top;
  ${(props) => (props.multiline ? 'min-height: 140px;' : '')}
`;
