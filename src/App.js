import Games from './components/Games'
import Backlog from './components/Backlog'
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={Games}/>
          <Route path="/backlog" component={Backlog}/>
          {/* <Route path="/update/:id" component={VideoForm}/> */}
        </Switch>
        <ToastContainer />
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
