import { FC } from 'react';
import './Loader.scss';

export const Loader: FC = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};
