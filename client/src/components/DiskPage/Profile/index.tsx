import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { userActions, userSelectors } from 'store/user';
import { fileThunks } from 'store/file';
import { User } from 'store/user/types';

import { SERVER_URL } from 'config';

import { FlexBox } from 'utils/components/FlexBox';

export const Profile: React.FC = React.memo((): JSX.Element | null => {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.user);
  if (!user) return null;

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const file = event.target.files[0];
      dispatch(fileThunks.uploadAvatar(file)).then(({ type, payload }) => {
        if (type === 'file/avatar/fulfilled') {
          dispatch(userActions.setUser(payload as User));
        } else {
          console.log(payload);
        }
      });
    }
  };
  const onDelete = () => {
    if (user.avatar) {
      dispatch(fileThunks.deleteAvatar()).then(({ type, payload }) => {
        if (type === 'file/avatar/fulfilled') {
          dispatch(userActions.setUser(payload as User));
        } else {
          console.log(payload);
        }
      });
    }
  };

  return (
    <div className="profile">
      <FlexBox alignItems="stretch" className="avatar">
        <FlexBox alignItems="center" justify="center" className="avatar__img">
          {user.avatar ? (
            <img src={SERVER_URL + 'avatars/' + user.avatar} alt="" />
          ) : (
            <div className="user-info__avatar-letters">
              <span>{user.firstname[0]}</span>
              <span>{user.lastname[0]}</span>
            </div>
          )}
        </FlexBox>
        <FlexBox
          direction="column"
          justify="space-between"
          className="avatar__btns"
        >
          <div className="button">
            <label htmlFor="uploadAvatar">Загрузить аватар</label>
            <input
              type="file"
              id="uploadAvatar"
              onChange={onUpload}
              accept="image/jpeg, image/jpg, image/png"
            />
          </div>
          <button onClick={onDelete} className="button">
            Удалить аватар
          </button>
        </FlexBox>
      </FlexBox>
    </div>
  );
});
