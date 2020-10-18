import React, { useEffect, useState } from 'react';
import AjudaePersonImage from '../AjudaePersonImage';

import { Container } from './styles';

const AjudaePersonSelect = ({ defaultPersonImage, onSelectPersonImage }) => {
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(-1);

  const selectableImages = [
    'personIcon1',
    'personIcon2',
    'personIcon3',
    'personIcon4',
  ];

  useEffect(() => {
    setSelectedPersonIndex(
      selectableImages.findIndex((image) => image === defaultPersonImage),
    );

    console.log(defaultPersonImage);
  }, [defaultPersonImage]);

  const onPressPerson = (index, color, image) => {
    setSelectedPersonIndex(index);

    onSelectPersonImage && onSelectPersonImage({ color, image });
  };

  return (
    <Container>
      {selectableImages.map((personImage, index) => (
        <AjudaePersonImage
          key={personImage}
          personImage={personImage}
          selected={index === selectedPersonIndex}
          onPress={(image) => onPressPerson(index, image.color, image.value)}
        />
      ))}
    </Container>
  );
};

export default AjudaePersonSelect;
