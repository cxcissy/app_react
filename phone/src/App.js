import {Router} from 'react-router-dom'
import './App.css';
import Main from './router'
const history =require('history').createBrowserHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Main/>
      </Router>
    </div>
  );
}

export default App;
