import React, { useCallback, useMemo, useRef, useState } from "react";
import "./styles.css";

const useFetch = (url) => {
  // TODO : add more options
  // add abort controller
  const cacheStore = useCache();
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    error: null
  });
  useMemo(async () => {
    const hasCache = cacheStore.get(url);

    if (hasCache == null) {
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
      setState(hasCache);
    }
  }, [url]);

  return {
    ...state
  };
};

const useCache = () => {
  const cache = useRef({});
  const set = useCallback((key, data) => {
    console.log(key, data);
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

const usePokemon = () => {
  const [active, setActive] = useState(null);
  const data = useFetch("https://pokeapi.co/api/v2/pokemon/" + active);

  const changePokemon = useCallback((name) => setActive(name), [active]);
  return {
    active,
    changePokemon,
    data
  };
};

export default function App() {
  const currentPokemon = usePokemon();
  const { isLoading, data, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  if (!isLoading && !!!error) {
    return (
      <>
        <div>
          <p>
            {currentPokemon.active &&
              `Active Pokemon : ${currentPokemon.active}`}
          </p>
          {currentPokemon.active && (
            <img
              alt="original pokemon"
              width="100"
              src={currentPokemon.data?.data?.sprites?.front_default}
            />
          )}
          {currentPokemon.active && (
            <img
              width="100"
              alt="original artwork"
              src={
                currentPokemon.data?.data?.sprites?.other["official-artwork"]
                  ?.front_default
              }
            />
          )}
        </div>
        {React.Children.toArray(
          data.results.map((pokemon) => {
            return (
              <div
                onClick={currentPokemon.changePokemon.bind(this, pokemon.name)}
              >
                {pokemon.name}
              </div>
            );
          })
        )}
      </>
    );
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
