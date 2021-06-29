import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import { AppDispatch, useDispatch } from 'store';
import { userSelectors } from 'store/user';

type UseFormReturn<State, ErrorType> = {
  dispatch: AppDispatch;
  data: State;
  error: ErrorType | null;
  setError: Dispatch<SetStateAction<ErrorType | null>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

export const useForm = <State, ErrorType>(
  initialState: State
): UseFormReturn<State, ErrorType> => {
  const dispatch = useDispatch();
  const loading = useSelector(userSelectors.isLoading);

  const [data, setData] = useState<State>(initialState);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isError, setIsError] = useState(false);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value.trim()
    }));
  }, []);

  return {
    dispatch,
    data,
    error,
    setError,
    isError,
    setIsError,
    onChange,
    loading
  };
};
