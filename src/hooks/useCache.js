import { useCallback, useRef } from "react";

export const useCache = () => {
  const cache = useRef({});
  const set = useCallback((key, data) => {
    cache.current[key] = data;
  }, []);
  const get = useCallback((key) => {
    return cache.current[key] || null;
  }, []);
  return {
    set,
    get
  };
};
