import { FC } from 'react';

import './Form.modul.scss';

export const Form: FC = () => {
  return (
    <div className="form-container">
      <div className="blurred-box">
        <div className="user-login-box">
          <span className="user-icon"></span>
          <div className="user-name">Gilfoyle</div>
          <input className="user-password" type="text" />
        </div>
      </div>
    </div>
  );
};
