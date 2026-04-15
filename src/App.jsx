import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import PopravakPregled from './pages/popravci/PopravakPregled'
import PopravakNovi from './pages/popravci/PopravakNovi'
import PopravakPromjena from './pages/popravci/PopravakPromjena'

function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.POPRAVCI} element={<PopravakPregled />} />
        <Route path={RouteNames.POPRAVCI_NOVI} element={<PopravakNovi />} />
        <Route path={RouteNames.POPRAVCI_PROMJENA} element={<PopravakPromjena />} />
      </Routes>
      <hr />
      &copy; Josip
    </Container>
  )
}

export default App
