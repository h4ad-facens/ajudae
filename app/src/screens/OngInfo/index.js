import React from 'react';
import { Text } from 'react-native';
import { useQuery } from 'react-query';

import Api from '../../Api';
import addButtonIconSvg from '../../assets/add-button.svg';
import readerButtonIconSvg from '../../assets/reader-button.svg';
import scheduleButtonIconSvg from '../../assets/schedule-button.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeHeader from '../../components/AjudaeHeader';
import DefaultButton from '../../components/DefaultButton';
import { Container, Scroller } from './styles';

const OngInfo = ({ navigation, route: { params: oldOng } }) => {
  const { isLoading: isLoadingOng, data: ong } = useQuery(
    ['organization', oldOng?.id],
    Api.getOngById,
  );

  const { isLoading, data } = useQuery(
    ['organization', oldOng?.id, 'causes'],
    Api.getCausesByOng,
  );

  if (!oldOng) {
    return navigation.navigate('ProfileUser');
  }

  if (isLoadingOng) {
    return <Text>Carregando ong...</Text>;
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
          onPress={() => navigation.navigate('EditOng', ong)}
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
        {isLoading && <Text>Carregando causas...</Text>}
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
