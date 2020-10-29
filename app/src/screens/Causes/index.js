import React, { Fragment, useState } from 'react';
import { Text } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import Api from '../../Api';
import PlusIcon from '../../assets/plus.svg';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeSpacing from '../../components/AjudaeSpacing';
import DefaultButton from '../../components/DefaultButton';
import { Container, Scroller } from './styles';

const Causes = () => {
  const [canFetchMore, setCanFetchMore] = useState(true);

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

  return (
    <Container>
      <Scroller>
        <AjudaeSpacing marginTop="24px" />
        {Array.isArray(data) &&
          data.map((causePage, i) => {
            return (
              <Fragment key={'Fragment' + i.toString()}>
                {Array.isArray(causePage) &&
                  causePage.map((cause, index) => (
                    <AjudaeCause
                      key={'Cause' + index.toString()}
                      cause={cause}
                      isEditMode={false}
                    />
                  ))}
              </Fragment>
            );
          })}
        {isFetching && <Text>Carregando causas...</Text>}
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

export default Causes;
