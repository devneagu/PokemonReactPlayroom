import React from "react";
import { useFetch, usePokemon } from "./hooks";
import { URL } from "./hooks/constants";
import "./styles.css";

export default function App() {
  const currentPokemon = usePokemon();
  const { isLoading, data, error } = useFetch(URL.GET_POKEMON);

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
                className={`pokemon ${
                  currentPokemon.data?.data?.name == pokemon.name
                    ? "cached"
                    : ""
                }`}
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
