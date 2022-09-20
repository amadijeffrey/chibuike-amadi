import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import ProductDescription from './components/productDescripion';
import ProductCategory from './components/productCategories';
import Cart from './components/cart'
import Header from './components/header';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/cart' component={Cart} />
        <Route path='/:category/:id' component={ProductDescription} />
        <Route path='/:category' component={ProductCategory} />
        <Redirect from='/' to='/all' /> 
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
