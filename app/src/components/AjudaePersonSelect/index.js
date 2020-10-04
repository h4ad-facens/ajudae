import React, { useState } from 'react';

import personIcon1 from '../../assets/person_1.png';
import personIcon2 from '../../assets/person_2.png';
import personIcon3 from '../../assets/person_3.png';
import personIcon4 from '../../assets/person_4.png';
import { Container, PersonItem, PersonImage } from './styles';

const AjudaePersonSelect = ({ defaultPersonImage, onSelectPersonImage }) => {
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
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(
    items.findIndex((item) => item.value === defaultPersonImage),
  );

  const onPressPerson = (index, color, image) => {
    setSelectedPersonIndex(index);

    onSelectPersonImage && onSelectPersonImage({ color, image });
  };

  return (
    <Container>
      {items.map(({ color, source, value }, index) => (
        <PersonItem
          key={index}
          color={color}
          selected={index === selectedPersonIndex}
          onPress={() => onPressPerson(index, color, value)}>
          <PersonImage source={source} />
        </PersonItem>
      ))}
    </Container>
  );
};

export default AjudaePersonSelect;
