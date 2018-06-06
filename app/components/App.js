const React = require('react');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Switch = ReactRouter.Switch;
const Result = require('./Result')

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/popular" component={Popular} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Result} />
              <Route render={function(){
                return <p> Not found </p>
                }} 
              />
            </Switch>
          </div>    
      </Router>
      
    )
  }
}

module.exports = App;