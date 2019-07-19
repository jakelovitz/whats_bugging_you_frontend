import React from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Dimmer, Segment, Loader } from 'semantic-ui-react'

function withAuth(MyComponent){
  class AuthComponent extends React.Component{
    render(){

      // check if there is a user in state
      if (this.props.currentUser){
        
        return(
          <MyComponent {...this.props}/>
        )
      } else {
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
