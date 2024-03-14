import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"
import Container from "./components/layouts/Container"

import PokemonHome from "./components/pages/PokemonHome"
import PokemonDetails from "./components/pages/PokemonDetails"




function App() {
  return (
    <Router>
      <Header />
      <Container customClass='minHeight'  >
        <Routes>
          <Route exact path="/" element={<PokemonHome />} />
          <Route path="/pokemon_details/:id" element={<PokemonDetails />} />
        </Routes>
      </Container>
      <Footer />
    </Router >
  )
}

export default App;
