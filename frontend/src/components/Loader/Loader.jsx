import css from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.loader}>
        <RotatingLines
          strokeColor='#ffd700'
          strokeWidth="5"
          animationDuration="1.5"
          maxwidth="96"
          visible={true}
        />
    </div>
  );
};
export default Loader;
