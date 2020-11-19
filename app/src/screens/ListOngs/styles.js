import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #f5f6fc;
  flex: 1;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const OngList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin-bottom: 38px;
`;

export const AjudaeOngTouchButton = styled.TouchableOpacity`
  width: 50%;
`;
