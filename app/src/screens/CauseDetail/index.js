import React from 'react';
import { Alert, Linking } from 'react-native';

import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeSaveButton from '../../components/AjudaeSaveButton';
import AjudaeSpacing from '../../components/AjudaeSpacing';
import { BoldText, Container, Scroller } from './styles';

const CauseDetail = ({ navigation, route: { params: cause } }) => {
  function onClickWhatsApp() {
    const appUrl = `whatsapp://send?phone=55${
      cause?.ong?.whatsapp
    }&text=${encodeURIComponent(
      `Olá, eu queria ajudar na seguinte causa: ${cause.description}`,
    )}`;

    const fallbackUrl = `https://api.whatsapp.com/send?phone=55${
      cause?.ong?.whatsapp
    }&text=${encodeURIComponent(
      `Olá, eu queria ajudar na seguinte causa: ${cause.description}`,
    )}`;

    Linking.canOpenURL(appUrl).then((supported) => {
      return supported ? Linking.openURL(appUrl) : Linking.openURL(fallbackUrl);
    });
  }

  function onClickEmail() {
    const appUrl = `mailto:${cause.ong.email}?subject=${encodeURIComponent(
      '[Ajudae] Apoiar uma causa',
    )}&body=${encodeURIComponent(
      `Olá, eu queria ajudar na seguinte causa: ${cause.description}`,
    )}`;

    Linking.canOpenURL(appUrl).then((supported) => {
      return supported
        ? Linking.openURL(appUrl)
        : Alert.alert(
            'Alerta!',
            'Não foi possível abrir o seu aplicativo para enviar um e-mail.',
            [{ text: 'Entendi!' }],
          );
    });
  }

  return (
    <Container>
      <Scroller>
        <AjudaeBackButton navigation={navigation} />
        <AjudaeCause cause={cause} isEditMode={false} />
        <AjudaeSpacing marginTop="16px" marginBottom="32px">
          <BoldText>Tem interesse em ajudar?</BoldText>
          <BoldText>Entre em Contato!</BoldText>
        </AjudaeSpacing>
        <AjudaeSpacing marginBottom="16px">
          <AjudaeSaveButton
            text="Enviar E-mail"
            onPress={onClickEmail}
          />
        </AjudaeSpacing>
        <AjudaeSpacing marginBottom="16px">
          <AjudaeSaveButton text="Abrir WhatsApp" onPress={onClickWhatsApp} />
        </AjudaeSpacing>
      </Scroller>
    </Container>
  );
};

export default CauseDetail;
