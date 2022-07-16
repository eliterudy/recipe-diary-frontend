import  { useState, CSSProperties } from "react";
import { useMediaQuery } from 'react-responsive'

export default function useHover(styleOnHover: CSSProperties, styleOnNotHover: CSSProperties = {})
{
    const [style, setStyle] = useState(styleOnNotHover);
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});

    const onMouseEnter = () => !isTabletOrMobile && setStyle(styleOnHover)
    const onMouseLeave = () => !isTabletOrMobile && setStyle(styleOnNotHover)

    return {style, onMouseEnter, onMouseLeave}
}