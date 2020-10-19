import React from 'react';
import { Text } from 'react-native';
import { useMutation, useQueryCache } from 'react-query';

import Api from '../../Api';
import TrashIconSvg from '../../assets/trash.svg';
import { extractPersonImagemFromOng } from '../../screens/EditOng';
import AjudaePersonImage from '../AjudaePersonImage';

import {
  Body,
  Container,
  DeleteButton,
  Description,
  ExpiresAt,
  Footer,
  Hashtag,
  Header,
  Info,
  Title,
} from './styles';

const AjudaeCause = ({ cause, isEditMode = true }) => {
  const queryCache = useQueryCache();

  const [deleteCause, { isLoading }] = useMutation(Api.deleteCause);

  if (!cause || !cause.ong) {
    return (
      <Text>
        É necessário setar o parametro "cause" para renderizar esse componente!
      </Text>
    );
  }

  async function onClickRemove() {
    await deleteCause(cause.id);
    await queryCache.invalidateQueries([
      'organization',
      cause.ong.id,
      'causes/unexpired',
    ]);
    await queryCache.invalidateQueries([
      'organization',
      cause.ong.id,
      'causes/expired',
    ]);
  }

  const expiresAt = new Date(+cause.expiresAt);
  const expiresAtString = `${expiresAt.getDate()}/${expiresAt.getMonth()}/${expiresAt.getFullYear()}`;

  return (
    <Container>
      {isEditMode && (
        <DeleteButton onPress={onClickRemove}>
          <TrashIconSvg width="26px" height="26px" />
        </DeleteButton>
      )}
      <Header>
        <AjudaePersonImage
          personImage={extractPersonImagemFromOng(cause.ong)}
          borderRadius="120"
        />
        <Info isEditMode={isEditMode}>
          <Title>{cause.ong.name}</Title>
          <ExpiresAt>Expira em {expiresAtString}</ExpiresAt>
        </Info>
      </Header>
      <Body isEditMode={isEditMode}>
        {!isLoading && <Description>{cause.description}</Description>}
        {isLoading && <Description>Removendo essa causa...</Description>}
      </Body>
      <Footer>
        {cause.categories.split(',').map((category) => {
          return <Hashtag>#{category}</Hashtag>;
        })}
      </Footer>
    </Container>
  );
};

export default AjudaeCause;
