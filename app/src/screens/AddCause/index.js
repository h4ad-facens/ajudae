import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useQueryCache } from 'react-query';
import Api from '../../Api';

import BookmarkIcon from '../../assets/bookmark.svg';
import MessageIcon from '../../assets/message.svg';
import DatepickerIcon from '../../assets/datepicker.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeHeader from '../../components/AjudaeHeader';
import AjudaeInput from '../../components/AjudaeInput';
import AjudaeSaveButton from '../../components/AjudaeSaveButton';
import AjudaeSpacing from '../../components/AjudaeSpacing';
import {
  ButtonsContainer,
  Container,
  SaveButtonContainer,
  Scroller,
} from './styles';

const AddCause = ({ navigation, route: { params: ong } }) => {
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [expiresAt, setExpiresAt] = useState(new Date());
  const [expiresAtString, setExpiresAtString] = useState('');
  const [showDatetimePicker, setShowDatetimePicker] = useState(false);
  const queryCache = useQueryCache();

  const presentMessage = (title, message) =>
    Alert.alert(title, message, [{ text: 'Entendi!' }]);

  function resetState() {
    setCategories('');
    setDescription('');

    const now = new Date();
    setExpiresAt(now);
    setExpiresAtString(
      `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
    );
  }

  async function createCause() {
    const payload = {
      categories,
      description,
      expiresAt: +new Date(
        expiresAt.getFullYear(),
        expiresAt.getMonth(),
        expiresAt.getDate(),
        23,
        59,
        59,
        999,
      ),
      ongId: ong.id,
    };

    const result = await Api.createCause(payload);

    if (result === null) {
      return presentMessage(
        'Oops...',
        'Ocorreu um erro ao tentar salvar a causa, por favor, tente novamente.',
      );
    }

    resetState();
    await queryCache.invalidateQueries([
      'organization',
      ong.id,
      'causes/unexpired',
    ]);
    await queryCache.invalidateQueries([
      'organization',
      ong.id,
      'causes/expired',
    ]);
    presentMessage('Sucesso', 'A causa foi criada com sucesso!');
    navigation.navigate('OngInfo');
  }

  return (
    <Container>
      <Scroller>
        <AjudaeHeader
          title="Criar uma Causa"
          description="Por favor, preencha os campos abaixo:"
          showDetail={true}
        />
        <AjudaeInput
          IconSvg={BookmarkIcon}
          placeholder="Categorias da causa. Ex: Animais."
          iconFill="none"
          value={categories}
          onChangeText={setCategories}
        />
        <AjudaeInput
          IconSvg={MessageIcon}
          placeholder="Descreva um pouco da sua situação, para que alguém possa simpatizar coma sua causa e te ajudar."
          iconFill="none"
          textAreaMode={true}
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity onPress={() => setShowDatetimePicker(true)}>
          <AjudaeInput
            IconSvg={DatepickerIcon}
            placeholder="Selecione a data de expiração"
            iconFill="none"
            value={expiresAtString}
          />
        </TouchableOpacity>
        {showDatetimePicker && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={expiresAt}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(_, currentDate) => {
              const selectedDate = currentDate || expiresAt;

              setShowDatetimePicker(false);
              setExpiresAtString(
                `${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getFullYear()}`,
              );
              setExpiresAt(selectedDate);
            }}
          />
        )}
        <ButtonsContainer>
          <AjudaeSpacing paddingRight="24px">
            <AjudaeBackButton
              backgroundColor="#00519C"
              disabledMargins={true}
              navigation={navigation}
              url="OngInfo"
            />
          </AjudaeSpacing>
          <SaveButtonContainer>
            <AjudaeSaveButton text="Criar" onPress={createCause} />
          </SaveButtonContainer>
        </ButtonsContainer>
      </Scroller>
    </Container>
  );
};

export default AddCause;
