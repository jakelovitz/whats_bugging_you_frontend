import React from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Dimmer, Segment, Loader } from 'semantic-ui-react'

function withAuth(MyComponent){
  class AuthComponent extends React.Component{
    render(){

      // check if there is a user in state
      if (this.props.currentUser){
        // if there is a user, render the target component
        return(
          <MyComponent {...this.props}/>
        )
      } else {
        // if there isn't, check for a token. its presence indicates that the user is in fact logged in and the fetch from your componentDidMount is still running, so display a loader, otherwise redirect to login page
        if (localStorage.getItem("token")){
          return <Segment>
            <Dimmer active>
              <Loader />
            </Dimmer>
          </Segment>
        } else {
          return (
            <Redirect to="/login"/>
          )
        }
      }
      
    }
  }


  function mapStateToProps(state){
    return {
      currentUser: state.currentUser
    }
  }

  return connect(mapStateToProps)(AuthComponent)
}

export default withAuth
