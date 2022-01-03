import Games from './components/Games'
import Backlog from './components/Backlog'
import GameInfo from './components/GameInfo'
import Navbar from './components/Navbar'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div className="App">
      <HashRouter>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={Games}/>
          <Route path="/backlog" component={Backlog}/>
          <Route path="/details/:id" component={GameInfo}/>
          {/* <Route path="/update/:id" component={VideoForm}/> */}
        </Switch>
        <ToastContainer />
      </div>
    </HashRouter>
    </div>
  );
}

export default App;
