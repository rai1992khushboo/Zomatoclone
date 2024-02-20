import Home from './components/Home';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';
import Restaurant from './components/Restaurant';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const App=()=>{
  return(
    <main className="container-fluid">
    <><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/search/:id/:name" element={<Search/>}/>
    <Route path="/restaurant/:id" element={<Restaurant/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </>
    </main>
  );
};

export default App;
