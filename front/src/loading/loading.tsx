import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    let code: string | null = new URL(window.location.href).searchParams.get(
      'code'
    );
    const accessToken = axios.post('http://localhost:5000/auth/oauth', {
      code: code,
    });
    console.log(accessToken);
  }, []);
  return <h1>Loading...</h1>;
};

export default Loading;
