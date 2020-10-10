import React, { useState } from 'react';

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

/**
 * Para usar essa página, é necessário passar alguns argumentos na rota,
 * da seguinte forma:
 *
 * ```javascript
 * navigation.navigate('EditOng', {
 *    id: 1,
 *    name: 'Joga10',
 *    email: 'joga10@gmail.com',
 *    whatsapp: '15988116119',
 *    description: 'All might',
 *    image: 'https://ajudae.com.br/personIcon1.png',
 *});
 * ```
 */
const EditOng = ({ navigation, route: { params: ong } }) => {
  if (!ong) return navigation.navigate('ProfileUser');

  const [name, setName] = useState(ong.name);
  const [email, setEmail] = useState(ong.email);
  const [whatsapp, setWhatsapp] = useState(ong.whatsapp);
  const [description, setDescription] = useState(ong.description);
  const defaultPersonImage = ong.image.includes('personIcon1')
    ? 'personIcon1'
    : ong.image.includes('personIcon2')
    ? 'personIcon2'
    : ong.image.includes('personIcon3')
    ? 'personIcon3'
    : 'personIcon4';

  function onSelectPersonImage({ color, image }) {
    ong.image = `https://ajudae.com.br/${image}.png`;
    ong.color = color;
  }

  const presentMessage = (title, message) =>
    Alert.alert(title, message, [{ text: 'Entendi!' }]);

  async function updateOng() {
    const payload = {
      ...ong,
      name,
      email,
      whatsapp,
      description,
    };

    const result = await Api.updateOng(ong.id, payload);

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

    presentMessage('Sucesso', 'A ONG foi atualizada com sucesso!');
    navigation.navigate('ProfileUser'); // TODO: Alterar depois a rota para retornar a listagem de ongs
  }

  return (
    <Container>
      <Scroller>
        <AjudaeHeader
          title="Editar uma ONG"
          description="Por favor, preencha os campos abaixo:"
          showDetail={true}
        />
        <AjudaeInput
          IconSvg={ReaderIcon}
          placeholder="O nome da ONG"
          iconFill="none"
          onChangeText={setName}
          value={name}
        />
        <AjudaeInput
          IconSvg={JobIcon}
          placeholder="O e-mail de contato da ONG"
          iconFill="none"
          onChangeText={setEmail}
          value={email}
        />
        <AjudaeInput
          IconSvg={WhatsAppIcon}
          placeholder="O número de contato da ONG"
          iconFill="none"
          onChangeText={setWhatsapp}
          value={whatsapp}
        />
        <AjudaePersonSelect
          onSelectPersonImage={onSelectPersonImage}
          defaultPersonImage={defaultPersonImage}
        />
        <AjudaeInput
          IconSvg={MessageIcon}
          placeholder="Fale um pouco sobre a missão da sua ONG para as outras pessoas que forem ver as suas causas saibam o que vocês fazem."
          iconFill="none"
          textAreaMode={true}
          onChangeText={setDescription}
          value={description}
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
            <AjudaeSaveButton text="Salvar" onPress={updateOng} />
          </SaveButtonContainer>
        </ButtonsContainer>
      </Scroller>
    </Container>
  );
};

export default EditOng;
