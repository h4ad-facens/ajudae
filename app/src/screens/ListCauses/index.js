import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import Api from '../../Api';
import PlusIcon from '../../assets/plus.svg';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeLoading from '../../components/AjudaeLoading';
import AjudaeSpacing from '../../components/AjudaeSpacing';
import DefaultButton from '../../components/DefaultButton';
import { Container, RedirectButton, Scroller } from './styles';

const ListCauses = ({ navigation }) => {
  const [canFetchMore, setCanFetchMore] = useState(false);

  const { isFetching, data, fetchMore } = useInfiniteQuery(
    ['causes'],
    async (key, currentPage) => {
      const data = await Api.getCauses(key, currentPage || 1);

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

  return (
    <Container>
      <Scroller>
        <AjudaeSpacing marginTop="24px" />
        {Array.isArray(listCauses) &&
          listCauses.map((cause, index) => (
            <RedirectButton
              key={index}
              onPress={() => navigation.navigate('CauseDetail', cause)}>
              <AjudaeCause key={index} cause={cause} isEditMode={false} />
            </RedirectButton>
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

export default ListCauses;
