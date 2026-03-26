import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import SmjerPregled from './pages/smjerovi/SmjerPregled'
import SmjerNovi from './pages/smjerovi/SmjerNovi'
import SmjerPromjena from './pages/smjerovi/SmjerPromjena'

function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.SMJEROVI} element={<SmjerPregled />} />
        <Route path={RouteNames.SMJEROVI_NOVI} element={<SmjerNovi />} />
        <Route path={RouteNames.SMJEROVI_PROMJENA} element={<SmjerPromjena />} />
      </Routes>
      <hr />
      &copy; Edunova
    </Container>
  )
}

export default App
