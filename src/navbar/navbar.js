import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react';


class Navbar extends Component {

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.logUserOut()
  }

  render() {
    // console.log(this.props.userComplaints)

    return (

      <Menu widths={5}>
        <Container>
          <Menu.Item header as={Link} to='/main'>
            What's Bugging You?
          </Menu.Item>

          <Menu.Item position="right" name="Your Bugs" as={Link} to='/your_bugs' />

          <Menu.Item position="right" name="Bug Breakdown" as={Link} to='/bug_breakdown' />

          <Menu.Item position="right" name="User Settings" as={Link} to='/user'  />

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
  