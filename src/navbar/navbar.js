import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const NavBar = styled.ul`
  display: flex;
  min-heigh: 100vh;
  min-width: 100vh;
  flex-direction: row;
`

const MyLogo = styled.div`
  order: 1
  align-self: flex-start;
  flex-grow: 6;
  align-content: left;
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  padding: 2%;
`

const NavItem = styled.li`
  align-self: flex-end;
  flex-grow: 1;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  padding: 2%;
`


class Navbar extends Component {

  handleLogout = () => {
    localStorage.removeItem("token")
    this.props.logUserOut()
  }

  render() {
    // console.log(this.props.userComplaints)

    return (

      <NavBar widths={5}>
        
          <MyLogo as={Link} to='/main'>
            What's Bugging You?
          </MyLogo>

          <NavItem position="right" as={Link} to='/your_bugs' >Your Bugs </NavItem>

          <NavItem position="right" as={Link} to='/bug_breakdown' >Bug Breakdown </NavItem>

          <NavItem position="right" as={Link} to='/user' >User Settings</NavItem>

          <NavItem position="right" as={Link} to='/login' onClick={() => this.handleLogout()} >Logout</NavItem>
         
        
      </NavBar>
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
  