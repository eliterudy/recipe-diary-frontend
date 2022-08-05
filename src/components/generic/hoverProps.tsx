/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-anonymous-default-export */
import {useState, CSSProperties} from 'react';
import {useMediaQuery} from 'react-responsive';

export const cssHover = (
  styleOnHover: CSSProperties,
  styleOnNotHover: CSSProperties = {},
  styleDefault: CSSProperties = {},
) => {
  const [style, setStyle] = useState({...styleDefault, ...styleOnNotHover});
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const onMouseEnter = () =>
    !isTabletOrMobile && setStyle({...styleDefault, ...styleOnHover});
  const onMouseLeave = () =>
    !isTabletOrMobile && setStyle({...styleDefault, ...styleOnNotHover});
  return {style, onMouseEnter, onMouseLeave};
};

export const isHovered = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});

  const onMouseEnter = () => !isTabletOrMobile && setIsHovered(true);
  const onMouseLeave = () => !isTabletOrMobile && setIsHovered(false);
  return isHovered;
};
