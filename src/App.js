import React, { Component } from 'react';
import LogInSignUp from './login_signup/login_signup_container'
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
//only here for testing
import MainContainer from './main_page/main_container'
import { connect } from 'react-redux'


class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(token) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          localStorage.removeItem("user_id")
          alert(response.errors)
        }else {
          this.props.autoLogInUser(response)
        }
      })
    }
  }


  render() {

    // if (this.props.currentUser) {
    //   return <Redirect to
    // }

    return (
    
      <React.Fragment>
      <Grid>
        <Grid.Row centered>
            <Switch>

                <Route path="/main" component={MainContainer} />
                <Route path="/login" component={LogInSignUp} />
{/* 
                {this.props.currentUser ?

                <Route path="/main" component={MainContainer} />

                :

                <Route path="/login" component={LogInSignUp} />

                } */}


            </Switch>
        </Grid.Row>
      </Grid>
      </React.Fragment>
          
    );

  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch){
  return {
      autoLogInUser: (user) => {
          dispatch({type: "AUTO_LOG_IN", payload: user})
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
