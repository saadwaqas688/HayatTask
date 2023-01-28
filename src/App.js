import AllTest from './AllTest';
import Home from './Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const App = () => {
 
    return (      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="viewAll" element={<AllTest/>} />
      </Routes>
    </BrowserRouter>

    )
}
export default App