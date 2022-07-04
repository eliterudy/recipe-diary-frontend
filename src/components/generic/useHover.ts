import  { useState, CSSProperties } from "react";
import { deflate } from "zlib";

export default function useHover(styleOnHover: CSSProperties, styleOnNotHover: CSSProperties = {})
{
    const [style, setStyle] = useState(styleOnNotHover);

    const onMouseEnter = () => setStyle(styleOnHover)
    const onMouseLeave = () => setStyle(styleOnNotHover)

    return {style, onMouseEnter, onMouseLeave}
}