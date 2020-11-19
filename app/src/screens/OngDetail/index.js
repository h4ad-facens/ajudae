import React, { useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import Api from '../../Api';
import PlusIcon from '../../assets/plus.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeHeader from '../../components/AjudaeHeader';
import AjudaeLoading from '../../components/AjudaeLoading';
import DefaultButton from '../../components/DefaultButton';
import { AjudaeCauseTouchButton, Container, Scroller } from './styles';

const OngDetail = ({ navigation, route: { params: ong } }) => {
  const { isLoading: isLoadingOng, data: newOng } = useQuery(
    ['organization', ong.id],
    Api.getOngById,
  );

  const [canFetchMore, setCanFetchMore] = useState(false);
  const { isFetching, data, fetchMore } = useInfiniteQuery(
    ['organization', ong.id, 'causes/unexpired'],
    async (key, organizationId, causeKey, currentPage) => {
      const data = await Api.getCausesByOng(ong.id, currentPage || 1);

      setCanFetchMore(data?.length >= 8);

      return data;
    },
    {
      getFetchMore: (lastPage, allPages) => {
        return (allPages?.length || 0) + 1;
      },
    },
  );
  const listCauses = data?.flat(2);

  if (isLoadingOng) {
    return (
      <Container>
        <Scroller>
          <AjudaeBackButton navigation={navigation} url="ListOngs" />
          <AjudaeHeader title="Carregando..." showDetail={false} />
          <AjudaeLoading />
        </Scroller>
      </Container>
    );
  }

  return (
    <Container>
      <Scroller>
        <AjudaeBackButton navigation={navigation} url="ListOngs" />
        <AjudaeHeader title={newOng?.name} showDetail={false} />
        {Array.isArray(listCauses) &&
          listCauses.map((cause, index) => (
            <AjudaeCauseTouchButton
              key={index}
              onPress={() => navigation.navigate('OngCauseDetail', cause)}>
              <AjudaeCause key={index} cause={cause} isEditMode={false} />
            </AjudaeCauseTouchButton>
          ))}
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

export default OngDetail;
