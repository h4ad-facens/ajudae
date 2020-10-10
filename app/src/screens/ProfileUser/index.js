import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext } from 'react';
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

  const handleLogoutClick = async () => {
    await AsyncStorage.removeItem('ajudae@token');

    navigation.reset({
      routes: [{ name: 'SignIn' }],
    });
  };

  const handleNewOngClick = async () => {
    navigation.reset({
      routes: [{ name: 'AddOng' }],
    });
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
          <CustomOngs>
            <CustomOngTitle>Amigos do Bem</CustomOngTitle>
            <CustomOngCreated>Criada em 20 de Abril de 2020</CustomOngCreated>
            <CustomOngDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non
              justo vitae velit accumsan laoreet eget at orci. Donec elit orci,
              vehicula vitae viverra ut, finibus id ex.
            </CustomOngDescription>
          </CustomOngs>
          <CustomOngs>
            <CustomOngTitle>Amigos do Bem</CustomOngTitle>
            <CustomOngCreated>Criada em 20 de Abril de 2020</CustomOngCreated>
            <CustomOngDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non
              justo vitae velit accumsan laoreet eget at orci. Donec elit orci,
              vehicula vitae viverra ut, finibus id ex.
            </CustomOngDescription>
          </CustomOngs>
        </ButtonArea>
      </Scroller>
    </Container>
  );
};
