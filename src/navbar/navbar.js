import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react';


class Navbar extends Component {

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.logUserOut(null, [], [])
    return <Redirect to="/login" push/>
  }

  render() {
    // console.log(this.props.userComplaints)

    return (

      <Menu>
        <Container>
          <Menu.Item header>
            What's Bugging You?
          </Menu.Item>

          <Menu.Item as="a" position="right" name="Bug Breakdown">
            Bug Breakdown
          </Menu.Item>

          <Menu.Item as="a" position="right" name="User Settings">
            User Settings
          </Menu.Item>

          <Menu.Item as="a" position="right" name="Logout" onClick={() => this.handleLogout()}>
            Logout
          </Menu.Item>
         
        </Container>
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    userComplaints: state.userComplaints
}
}

function mapDispatchToProps(dispatch){
  return {
    logUserOut: (currentUser, userComplaints, unreactedUserComplaints) => {
      dispatch({type: "LOG_USER_OUT", payload: {
        one: currentUser,
        two: userComplaints,
        three: unreactedUserComplaints
      }})
    }
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Navbar))
  