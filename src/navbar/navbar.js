import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class Navbar extends Component {

  render() {
    return (

      <Menu>
          
          <Menu.Item as="a" header>
            What's Bugging You?
          </Menu.Item>

          <Menu.Item position="right">
            <Menu.Item as="a" name="login">
              Login
            </Menu.Item>

            <Menu.Item as="a" name="register">
              Register
            </Menu.Item>
          </Menu.Item>
        
      </Menu>
    )
  }
}
export default Navbar
  