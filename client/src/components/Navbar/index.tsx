import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { userActions, userSelectors, userThunks } from 'store/user';

import { FlexBox } from 'utils/components/FlexBox';

import Logo from 'assets/img/navbar-logo.svg';
import './styles.scss';

export const Navbar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const isAuth = useSelector(userSelectors.isAuth);

  const logout = () => {
    dispatch(userThunks.logout()).then(() => {
      dispatch(userActions.logout());
    });
  };

  return (
    <FlexBox justify="center" className="header">
      <FlexBox alignItems="center" className="navbar">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">MKCloud</div>
        {isAuth ? (
          <div className="navbar__logout" onClick={logout}>
            Выйти
          </div>
        ) : (
          <>
            <div className="navbar__login">
              <NavLink to="/login">Войти</NavLink>
            </div>
            <div className="navbar__registration">
              <NavLink to="/registration">Регистрация</NavLink>
            </div>
          </>
        )}
      </FlexBox>
    </FlexBox>
  );
};
