import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react';


class Navbar extends Component {

  handleYourBugs = () => {
    console.log("You pressed the 'Your Bugs' Button")
  }

  handleBugBreakdown = () => {
    console.log("You pressed the 'Bug Breakdown' Button")
  }

  handleUserSettings = () => {
    console.log("You pressed the 'User Settings' Button")
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.logUserOut()
  }

  render() {
    // console.log(this.props.userComplaints)

    return (

      <Menu widths={5}>
        <Container>
          <Menu.Item header>
            What's Bugging You?
          </Menu.Item>

          <Menu.Item position="right" name="Your Bugs" onClick={() => this.handleYourBugs()} />

          <Menu.Item position="right" name="Bug Breakdown" onClick={() => this.handleBugBreakdown()} />

          <Menu.Item position="right" name="User Settings" onClick={() => this.handleUserSettings()} />

          <Menu.Item position="right" name="Logout" as={Link} to='/login' onClick={() => this.handleLogout()}  />
         
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
    logUserOut: () => {
      dispatch({type: "LOG_USER_OUT"})
    }
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Navbar))
  