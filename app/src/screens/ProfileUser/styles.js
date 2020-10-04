import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #f5f6fc;
  flex: 1;
  align-items: center;
`;

export const Scroller = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding: 0 28px;
`;

export const HeaderArea = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

export const BlueSquare = styled.View`
  width: 45px;
  height: 43px;
  color: #262626;
  background-color: #1890ff;
  border-radius: 12px;
  margin-bottom: 28px;
  margin-top: 24px;
`;

export const ButtonArea = styled.View`
  width: 100%;
`;

export const CustomOngs = styled.TouchableOpacity`
  width: 100%;
  height: 190px;
  background-color: #fff;
  padding: 19px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #ddd;
  shadow-opacity: 0.9;
  elevation: 3;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CustomOngTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #262626;
  margin-bottom: 6px;
`;

export const CustomOngCreated = styled.Text`
  font-size: 14px;
  color: #96a7af;
  margin-bottom: 12px;
`;

export const CustomOngDescription = styled.Text`
  font-size: 14px;
  color: #262626;
  text-align: justify;
`;
