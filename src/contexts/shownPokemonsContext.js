import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {fetchGen1Pokemon, fetchOnePokemon} from "../Utilities/fetch";
import {fromLocalStorage, toLocalStorage} from "../Utilities/localStorage";


const ShownPokemonsContext = createContext();

export function ShownPokemonsProvider(props) {
    const [shownPokemon, setShownPokemon] = useState([]);

    console.log({shownPokemon});

    useEffect(() => {
        async function hydrate() {
            const ids = fromLocalStorage()
            const pokemon = await Promise.all(ids.map(id => fetchOnePokemon(id)))
            setShownPokemon(pokemon)
        }

        hydrate()
    }, [setShownPokemon])

    useEffect(() => {
        toLocalStorage(shownPokemon.map(pokemon => pokemon.id));
    }, [shownPokemon]);

    const addGen1Pokemon = useCallback(async id => {
        const pokemon = await fetchGen1Pokemon()
        setShownPokemon(shownPokemon => [...shownPokemon, pokemon])
    }, [shownPokemon, setShownPokemon()])

    const api = useMemo(
        () => ({
            addGen1Pokemon
        }),
        [
            addGen1Pokemon
        ]
    );

    return <ShownPokemonsContext.Provider value={api}>
        {props.children}
    </ShownPokemonsContext.Provider>
}


export const useShownPokemonsContext = () => useContext(ShownPokemonsContext);