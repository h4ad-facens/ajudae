import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { useQuery } from 'react-query';

import Api from '../../Api';
import LogoutIcon from '../../assets/logout.svg';
import PlusIcon from '../../assets/plus.svg';
import AjudaeHeader from '../../components/AjudaeHeader';
import DefaultButton from '../../components/DefaultButton';
import { UserContext } from '../../contexts/UserContext';
import {
  ButtonArea,
  Container,
  CustomOngCreated,
  CustomOngDescription,
  CustomOngs,
  CustomOngTitle,
  HeaderArea,
  Scroller,
} from './styles';

export default ({ navigation }) => {
  const { state: user } = useContext(UserContext);
  const { isLoading, data: listOngs } = useQuery(
    'organization',
    () => Api.getOngsByUser(user.id),
  );

  const handleLogoutClick = async () => {
    await AsyncStorage.removeItem('ajudae@token');

    navigation.reset({
      routes: [{ name: 'SignIn' }],
    });
  };

  const handleNewOngClick = () => {
    navigation.navigate('AddOng');
  };

  const handleClickOng = (ong) => {
    navigation.navigate('OngInfo', ong);
  };

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <AjudaeHeader
            title={user.name}
            description={'Bem-vindo de volta!\nAbaixo, suas ONGS.'}
            showDetail={true}
          />
        </HeaderArea>
        <ButtonArea>
          <DefaultButton
            IconSvg={PlusIcon}
            text="Adicionar nova ONG"
            width="12"
            height="12"
            onPress={handleNewOngClick}
          />
          <DefaultButton
            IconSvg={LogoutIcon}
            text="Sair do aplicativo"
            width="18"
            height="18"
            onPress={handleLogoutClick}
          />
          {isLoading && <Text>Carregando suas ongs...</Text>}
          {listOngs?.map((ong) => (
            <CustomOngs key={ong.id} onPress={() => handleClickOng(ong)}>
              <CustomOngTitle>{ong.name}</CustomOngTitle>
              <CustomOngCreated>Criada em {ong.createdAt}</CustomOngCreated>
              <CustomOngDescription>
                {ong.description || 'Não há descrição para essa ONG.'}
              </CustomOngDescription>
            </CustomOngs>
          ))}
        </ButtonArea>
      </Scroller>
    </Container>
  );
};
