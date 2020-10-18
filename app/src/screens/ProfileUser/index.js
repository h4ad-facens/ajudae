import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

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

export default ({ state, navigation }) => {
  const { state: user } = useContext(UserContext);
  const [listOngs, setListOngs] = useState([]);

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

  const presentMessage = (title, message) =>
    Alert.alert(title, message, [{ text: 'Entendi!' }]);

  useEffect(() => {
    let isCanceled = false;

    Api.getOngsByUser(user.id).then((result) => {
      if (isCanceled) return;

      if (typeof result?.message === 'string' || !Array.isArray(result))
        return presentMessage(
          'Oops...',
          (result?.message && result?.message[0]) ||
            'Não foi possível carregar as suas ONGs.',
        );

      setListOngs(result);
    });

    return () => void (isCanceled = true);
  }, [setListOngs]);

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
          {listOngs.map((ong) => (
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
