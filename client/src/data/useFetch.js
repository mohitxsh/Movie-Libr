import { useCallback, useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    const data = await response.json();
    setData(data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return { loading, data };
};
