import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import LoginPage from './views/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component = {LandingPage}/>
          <Route path="/login" component = {LoginPage} />
          <Route path="/register" component = {RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
