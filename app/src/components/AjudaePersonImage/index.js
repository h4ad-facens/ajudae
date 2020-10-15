import React from 'react';

import personIcon1 from '../../assets/person_1.png';
import personIcon2 from '../../assets/person_2.png';
import personIcon3 from '../../assets/person_3.png';
import personIcon4 from '../../assets/person_4.png';

import { PersonImage, PersonItem } from './styles';

const items = [
  {
    color: '#FFC542',
    source: personIcon1,
    value: 'personIcon1',
  },
  {
    color: '#3DD598',
    source: personIcon2,
    value: 'personIcon2',
  },
  {
    color: '#FF575F',
    source: personIcon3,
    value: 'personIcon3',
  },
  {
    color: '#755FE2',
    source: personIcon4,
    value: 'personIcon4',
  },
];

const AjudaePersonImage = ({ selected, personImage, onPress }) => {
  const { color, source, value } =
    items.find((item) => item.value === personImage) || items[0];

  return (
    <PersonItem
      color={color}
      selected={selected}
      onPress={() => onPress({ color, source, value })}>
      <PersonImage source={source} />
    </PersonItem>
  );
};

export default AjudaePersonImage;
