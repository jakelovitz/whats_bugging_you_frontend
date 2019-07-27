import React, { Component } from 'react';
import LogInSignUp from './login_signup/login_signup_container'
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
//only here for testing
import MainContainer from './main_page/main_container'
import { connect } from 'react-redux'
import UserSettingsContainer from './user_settings/user_settings_container'
import ComplaintsPageContainer from './complaints_page/complaints_page_container'
import ChartContainer from './chart/chart_container'


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
    return (
      <React.Fragment>
      <Grid>
        <Grid.Row centered>
            <Switch>

                <Route path="/main" component={MainContainer} />
                <Route path="/login" component={LogInSignUp} />
                <Route path="/user" component={UserSettingsContainer} />
                <Route path="/your_bugs" component={ComplaintsPageContainer} />
                <Route path="/bug_breakdown" component={ChartContainer} />

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
