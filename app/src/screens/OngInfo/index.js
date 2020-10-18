import React from 'react';
import { Text } from 'react-native';
import { useQuery } from 'react-query';
import Api from '../../Api';

import readerButtonIconSvg from '../../assets/reader-button.svg';
import addButtonIconSvg from '../../assets/add-button.svg';
import scheduleButtonIconSvg from '../../assets/schedule-button.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeHeader from '../../components/AjudaeHeader';
import DefaultButton from '../../components/DefaultButton';

import { Container, Scroller } from './styles';
import AjudaeCause from '../../components/AjudaeCause';

const OngInfo = ({ navigation, route: { params: ong } }) => {
  if (!ong) {
    return navigation.navigate('ProfileUser');
  }

  const { isLoading, data } = useQuery(
    ['organization', ong.id],
    Api.getCausesByOng,
  );

  if (isLoading) {
    return <Text>Carregando causas...</Text>;
  }

  return (
    <Container>
      <Scroller>
        <AjudaeBackButton url="ProfileUser" navigation={navigation} />
        <AjudaeHeader title={ong.name} />
        <DefaultButton
          text="Editar informações da ONG"
          IconSvg={readerButtonIconSvg}
          iconFill="none"
        />
        <DefaultButton
          text="Adicionar nova causa"
          IconSvg={addButtonIconSvg}
          iconFill="none"
        />
        <DefaultButton
          text="Ver causas expiradas"
          IconSvg={scheduleButtonIconSvg}
          iconFill="none"
        />
        {data &&
          data.map((cause) => {
            return (
              <AjudaeCause
                key={cause.id.toString()}
                cause={cause}
                isEditMode={true}
              />
            );
          })}
      </Scroller>
    </Container>
  );
};

export default OngInfo;
