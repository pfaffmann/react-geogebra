import { useEffect } from 'react';
import { loadScript } from './loadScript';

function useScript(url, thenFunction) {
  useEffect(() => {
    loadScript(url)
      .then((script) => {
        console.log(script);
        thenFunction();
      })
      .catch((err) => console.error(err));
  }, [url]);
}

export default useScript;
