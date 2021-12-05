import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import './App.css';
import {ShownPokemonsProvider, useShownPokemonsContext} from "./contexts/shownPokemonsContext";
import {Container, Row} from "react-bootstrap";
import {PokemonList} from "./Components/PokemonList";



function ProvidedApp() {
  const {addGen1Pokemon} = useShownPokemonsContext();

  return <>
    <div>
      <button onClick={() => addGen1Pokemon}>Open Gen 1</button>
    </div>
    <div className="pt-5">
      <Container fluid className="mt-3 mb-3">
        <Row><h1 className="mt-2">My Pokemons</h1></Row>
        <Row><PokemonList/></Row>
      </Container>
    </div>
  </>;
}

function App() {
  return <ShownPokemonsProvider>
    <ProvidedApp/>
  </ShownPokemonsProvider>;
}

export default App;
