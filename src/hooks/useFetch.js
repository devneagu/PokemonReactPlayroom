import { useMemo, useState } from "react";
import { useCache } from "./useCache";

export const useFetch = (url) => {
  // TODO : add more options
  // add abort controller
  const cacheStore = useCache();
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    error: null
  });
  useMemo(async () => {
    const hasCachedData = cacheStore.get(url);
    if (hasCachedData == null) {
      let data = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return {
            ...state,
            isLoading: false,
            data: data
          };
        })
        .catch((e) => {
          return {
            ...state,
            isLoading: false,
            error: e
          };
        });
      setState(data);
      cacheStore.set(url, data);
    } else {
      setState({
        ...hasCachedData,
        cached: true
      });
    }
  }, [url]);

  console.log(state);
  return {
    ...state
  };
};
