import React, { useState } from 'react';
import { FlatList, Text } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import Api from '../../Api';
import PlusIcon from '../../assets/plus.svg';
import AjudaeOng from '../../components/AjudaeOng';
import DefaultButton from '../../components/DefaultButton';
import { AjudaeOngTouchButton, Container } from './styles';

const ListOngs = ({ navigation }) => {
  const [canFetchMore, setCanFetchMore] = useState(true);

  const { isFetching, data, fetchMore } = useInfiniteQuery(
    ['organization'],
    async (key, organizationId, causeKey, currentPage) => {
      const data = await Api.getOngs(currentPage || 1);

      setCanFetchMore(data?.length >= 8);

      return data;
    },
    {
      getFetchMore: (lastPage, allPages) => {
        return (allPages?.length || 0) + 1;
      },
    },
  );

  const listOngs = data?.flat(2);

  return (
    <Container>
      <FlatList
        data={listOngs}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(ong) => {
          return (
            ong && (
              <AjudaeOngTouchButton
                onPress={() => navigation.navigate('OngDetail', ong.item)}>
                <AjudaeOng ong={ong.item} style={ong.index % 3} />
              </AjudaeOngTouchButton>
            )
          );
        }}
      />
      {isFetching && <Text>Carregando ongs...</Text>}
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
    </Container>
  );
};

export default ListOngs;
