import React from 'react';

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

const AddOng = ({ navigation }) => {
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
        />
        <AjudaeInput
          IconSvg={JobIcon}
          placeholder="O e-mail de contato da ONG"
          iconFill="none"
        />
        <AjudaeInput
          IconSvg={WhatsAppIcon}
          placeholder="O número de contato da ONG"
          iconFill="none"
        />
        <AjudaePersonSelect
          onSelectPersonImage={(personImage) => console.log(personImage)}
        />
        <AjudaeInput
          IconSvg={MessageIcon}
          placeholder="Fale um pouco sobre a missão da sua ONG para as outras pessoas que forem ver as suas causas saibam o que vocês fazem."
          iconFill="none"
          textAreaMode={true}
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
            <AjudaeSaveButton text="Criar" />
          </SaveButtonContainer>
        </ButtonsContainer>
      </Scroller>
    </Container>
  );
};

export default AddOng;
