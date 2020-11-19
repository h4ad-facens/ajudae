import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import Api from '../../Api';
import LogoutIcon from '../../assets/logout.svg';
import PlusIcon from '../../assets/plus.svg';
import AjudaeHeader from '../../components/AjudaeHeader';
import AjudaeLoading from '../../components/AjudaeLoading';
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
    ['user', user.id, 'organization'],
    () => Api.getOngsByUser(user.id),
  );

  const handleLogoutClick = async () => {
    await AsyncStorage.removeItem('ajudae@token');

    navigation.reset({
      index: 0,
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
        </ButtonArea>
        {isLoading && <AjudaeLoading />}
        {listOngs?.map((ong, index) => (
          <CustomOngs key={index} onPress={() => handleClickOng(ong)}>
            <CustomOngTitle>{ong.name}</CustomOngTitle>
            <CustomOngCreated>Criada em {ong.createdAt}</CustomOngCreated>
            <CustomOngDescription>
              {ong.description || 'Não há descrição para essa ONG.'}
            </CustomOngDescription>
          </CustomOngs>
        ))}
      </Scroller>
    </Container>
  );
};
