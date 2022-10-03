import { useCallback, useState } from "react";
import { URL } from "./constants";
import { useFetch } from "./useFetch";

export const usePokemon = () => {
  const [active, setActive] = useState(null);
  const data = useFetch(URL.GET_POKEMON + active);
  console.log("URL.GET_POKEMON + active", data);
  const changePokemon = useCallback((name) => setActive(name), [active]);
  return {
    active,
    changePokemon,
    data
  };
};
