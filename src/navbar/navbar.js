import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

class Navbar extends Component {

  render() {
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

          <Menu.Item as="a" position="right" name="Logout">
            Logout
          </Menu.Item>
         
        </Container>
      </Menu>
    )
  }
}
export default Navbar
  