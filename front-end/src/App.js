import {BrowserRouter as Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import Routes from './routes'

function App() {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <Routes/>
    </Router>
  );
}

export default App;
