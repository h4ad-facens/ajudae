import React, { Fragment, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import Api from '../../Api';
import PlusIcon from '../../assets/plus.svg';
import AjudaeBackButton from '../../components/AjudaeBackButton';
import AjudaeCause from '../../components/AjudaeCause';
import AjudaeHeader from '../../components/AjudaeHeader';
import AjudaeLoading from '../../components/AjudaeLoading';
import DefaultButton from '../../components/DefaultButton';
import { Container, Scroller } from './styles';

const CausesExpired = ({ navigation, route: { params: oldOng } }) => {
  const [canFetchMore, setCanFetchMore] = useState(false);

  const { isFetching, data, fetchMore } = useInfiniteQuery(
    ['organization', oldOng.id, 'causes/expired'],
    async (key, organizationId, causeKey, currentPage) => {
      const data = await Api.getExpiredCausesByOng(oldOng.id, currentPage || 1);

      setCanFetchMore(data?.next_page_url != null);

      return data.data;
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
        <AjudaeBackButton navigation={navigation} url="OngInfo" />
        <AjudaeHeader title="Causas Expiradas" showDetail={false} />
        {Array.isArray(data) &&
          data.map((causePage, i) => {
            return (
              <Fragment key={i.toString()}>
                {Array.isArray(causePage) &&
                  causePage.map((cause, index) => (
                    <AjudaeCause key={index} cause={cause} />
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

export default CausesExpired;
