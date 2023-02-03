import * as fallback from "../../img/default.jpg";

interface Props {
  src?: string;
  alt?: string;
}

const ImageWithFallback: React.FC<Props> = ({ src, alt }) => {
  return <img src={src ?? fallback.default} alt={alt} />;
};

export default ImageWithFallback;
