import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import ProductDescription from './components/productDescripion';
import ProductCategory from './components/productCategories';
import Cart from './components/cart'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route path='/cart'  component={Cart}  />
        <Route path='/:id' component={ProductDescription} />
        <Route path='/' component={ProductCategory} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
