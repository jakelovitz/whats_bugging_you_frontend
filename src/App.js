import React from 'react';
import Login from './login/login_form'
import Signup from './signup/sign_up_form'
import Navbar from './navbar/navbar'
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
//only here for testing
import Complaint from './main_page/complaint_component'


function App() {
  return (
    
    <React.Fragment>
    <Navbar />
    <Grid>
      <Grid.Row centered>
          <Switch>
              {/* <Route exact path="/users/:id" component={} /> */}
              
              <Route exact path="/login" render={(routerProps) => {
                  return <Login {...routerProps}/>
              }} />
              
              <Route exact path="/signup" render={(routerProps) => {
                  return <Signup {...routerProps}/>
              }} />

              <Route exact path="/main" render={(routerProps) => {
                return <Complaint {...routerProps}/>
              }} />
          </Switch>
      </Grid.Row>
    </Grid>
    </React.Fragment>
        
  );
}

export default App;
