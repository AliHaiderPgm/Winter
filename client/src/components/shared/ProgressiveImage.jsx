import { useEffect, useState } from "react"
import placeholderSrc from "../../assets/placeholder.png";

const ProgressiveImage = ({ src, ...props }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc)

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
            className="img-fluid rounded"
        />
    )
}

export default ProgressiveImage