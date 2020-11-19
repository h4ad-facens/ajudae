import React, { useState } from 'react';
import { useQueryCache } from 'react-query';

import JobIcon from '../../assets/job.svg';
import ReaderIcon from '../../assets/reader.svg';
import WhatsAppIcon from '../../assets/whatsapp.svg';
import MessageIcon from '../../assets/message.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeHeader from '../../components/AjudaeHeader';
import AjudaeInput from '../../components/AjudaeInput';
import AjudaePersonSelect from '../../components/AjudaePersonSelect';
import {
  Container,
  Scroller,
  ButtonsContainer,
  SaveButtonContainer,
} from './styles';
import AjudaeSaveButton from '../../components/AjudaeSaveButton';
import AjudaeSpacing from '../../components/AjudaeSpacing';
import { Alert } from 'react-native';
import Api from '../../Api';

const AddOng = ({ navigation }) => {
  const queryCache = useQueryCache();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const ong = {
    image: '',
    color: '',
  };

  function onSelectPersonImage({ color, image }) {
    ong.image = `https://ajudae.com.br/${image}.png`;
    ong.color = color;
  }

  const presentMessage = (title, message) =>
    Alert.alert(title, message, [{ text: 'Entendi!' }]);

  async function createOng() {
    if (!ong.color)
      return presentMessage(
        'OOPS!',
        'Você precisa selecionar um personagem para essa ONG.',
      );

    const payload = {
      ...ong,
      name,
      email,
      whatsapp,
      description,
    };

    const result = await Api.createOng(payload);

    if (result === null)
      return presentMessage(
        'OOPS!',
        'Ocorreu um erro desconhecido, por favor, tente novamente!',
      );

    const { message } = result;

    if (message)
      return presentMessage(
        'OOPS!',
        Array.isArray(message) ? message[0] : message,
      );

    await queryCache.invalidateQueries(['organization']);
    await queryCache.invalidateQueries(['user']);

    presentMessage('Sucesso', 'A ONG foi criada com sucesso!');
    navigation.navigate('ProfileUser');
  }

  return (
    <Container>
      <Scroller>
        <AjudaeHeader
          title="Criar uma ONG"
          description="Por favor, preencha os campos abaixo:"
          showDetail={true}
        />
        <AjudaeInput
          IconSvg={ReaderIcon}
          placeholder="O nome da ONG"
          iconFill="none"
          onChangeText={setName}
        />
        <AjudaeInput
          IconSvg={JobIcon}
          placeholder="O e-mail de contato da ONG"
          iconFill="none"
          onChangeText={setEmail}
        />
        <AjudaeInput
          IconSvg={WhatsAppIcon}
          placeholder="O número de contato da ONG"
          iconFill="none"
          onChangeText={setWhatsapp}
        />
        <AjudaePersonSelect onSelectPersonImage={onSelectPersonImage} />
        <AjudaeInput
          IconSvg={MessageIcon}
          placeholder="Fale um pouco sobre a missão da sua ONG para as outras pessoas que forem ver as suas causas saibam o que vocês fazem."
          iconFill="none"
          textAreaMode={true}
          onChangeText={setDescription}
        />
        <ButtonsContainer>
          <AjudaeSpacing paddingRight="24px">
            <AjudaeBackButton
              backgroundColor="#00519C"
              disabledMargins={true}
              navigation={navigation}
              url="ProfileUser"
            />
          </AjudaeSpacing>
          <SaveButtonContainer>
            <AjudaeSaveButton text="Criar" onPress={createOng} />
          </SaveButtonContainer>
        </ButtonsContainer>
      </Scroller>
    </Container>
  );
};

export default AddOng;
