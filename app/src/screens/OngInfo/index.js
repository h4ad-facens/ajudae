import React, { Fragment, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import Api from '../../Api';
import addButtonIconSvg from '../../assets/add-button.svg';
import PlusIcon from '../../assets/plus.svg';
import readerButtonIconSvg from '../../assets/reader-button.svg';
import scheduleButtonIconSvg from '../../assets/schedule-button.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeHeader from '../../components/AjudaeHeader';
import AjudaeLoading from '../../components/AjudaeLoading';
import DefaultButton from '../../components/DefaultButton';
import { Container, Scroller } from './styles';

const OngInfo = ({ navigation, route: { params: oldOng } }) => {
  const [canFetchMore, setCanFetchMore] = useState(false);

  const { isFetching, data, fetchMore } = useInfiniteQuery(
    ['organization', oldOng.id, 'causes/unexpired'],
    async (key, organizationId, causeKey, currentPage) => {
      const data = await Api.getCausesByOng(oldOng.id, currentPage || 1);

      setCanFetchMore(data?.length >= 8);

      return data;
    },
    {
      getFetchMore: (lastPage, allPages) => {
        return (allPages?.length || 0) + 1;
      },
    },
  );

  const { isLoading: isLoadingOng, data: ong } = useQuery(
    ['organization', oldOng?.id],
    Api.getOngById,
  );

  if (!oldOng) {
    return navigation.navigate('ProfileUser');
  }

  if (isLoadingOng) {
    return (
      <Container>
        <Scroller>
          <AjudaeBackButton url="ProfileUser" navigation={navigation} />
          <AjudaeHeader title="Carregando..." />
          <AjudaeLoading />
        </Scroller>
      </Container>
    );
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
          onPress={() => navigation.navigate('AddCause', ong)}
        />
        <DefaultButton
          text="Ver causas expiradas"
          IconSvg={scheduleButtonIconSvg}
          iconFill="none"
          onPress={() => navigation.navigate('CausesExpired', ong)}
        />
        {Array.isArray(data) &&
          data.map((causePage, i) => {
            return (
              <Fragment key={i.toString()}>
                {Array.isArray(causePage) &&
                  causePage.map((cause, index) => (
                    <AjudaeCause key={index} cause={cause} isEditMode={true} />
                  ))}
              </Fragment>
            );
          })}
        {isFetching && <AjudaeLoading />}
        {canFetchMore && (
          <DefaultButton
            text="Carregar mais..."
            IconSvg={PlusIcon}
            width="12"
            height="12"
            onPress={() => {
              fetchMore();
            }}
          />
        )}
      </Scroller>
    </Container>
  );
};

export default OngInfo;
