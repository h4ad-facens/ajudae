import React, { useState } from 'react';
import { View } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import Api from '../../Api';
import PlusIcon from '../../assets/plus.svg';
import AjudaeLoading from '../../components/AjudaeLoading';
import AjudaeOng from '../../components/AjudaeOng';
import DefaultButton from '../../components/DefaultButton';
import { AjudaeOngTouchButton, Container, OngList, Scroller } from './styles';

const ListOngs = ({ navigation }) => {
  const [canFetchMore, setCanFetchMore] = useState(false);

  const { isFetching, data, fetchMore } = useInfiniteQuery(
    ['organization'],
    async (key, organizationId, causeKey, currentPage) => {
      const data = await Api.getOngs(currentPage || 1);

      setCanFetchMore(data?.next_page_url != null);

      return data.data;
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
      <Scroller>
        <OngList>
          {Array.isArray(listOngs) &&
            listOngs.map((ong, index) => {
              return (
                <AjudaeOngTouchButton
                  key={index}
                  onPress={() => navigation.navigate('OngDetail', ong)}>
                  <AjudaeOng ong={ong} style={index % 3} />
                </AjudaeOngTouchButton>
              );
            })}
        </OngList>
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

export default ListOngs;
