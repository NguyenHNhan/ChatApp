import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

const Responsive = () => {
  const isResponsive = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();

  const isSelect = isResponsive && location.hash;

  return { isResponsive, isSelect};
};

export default Responsive;
