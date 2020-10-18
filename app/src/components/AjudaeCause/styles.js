import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: #fff;
  padding: 24px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #ddd;
  shadow-opacity: 0.9;
  elevation: 3;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  position: relative;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Info = styled.View`
  padding: 0 8px;
  justify-content: center;
  display: flex;
  ${(props) => props.isEditMode && 'max-width: 76%;'}
  ${(props) => !props.isEditMode && 'max-width: 80%;'}
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #262626;
  font-weight: bold;
`;

export const ExpiresAt = styled.Text`
  color: #96a7af;
  font-size: 12px;
`;

export const Body = styled.View`
  padding-top: 8px;
  padding-bottom: 8px;
  ${(props) => props.isEditMode && 'padding-right: 24px;'}
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #262626;
  text-align: justify;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Hashtag = styled.Text`
  color: #f13642;
  font-size: 14px;
  margin-right: 4px;
  font-weight: bold;
`;

export const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
`;
