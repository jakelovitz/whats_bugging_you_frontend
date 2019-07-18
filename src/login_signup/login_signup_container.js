import React, { Component } from 'react';
import Login from './login_form'
import Signup from './sign_up_form'
import { Grid, Container, Divider, Segment } from 'semantic-ui-react'

class LogInSignUp extends Component {
    
    render() {
        return (
            <Segment>
                <Container>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Signup />
                            </Grid.Column>

                            <Grid.Column>
                                <Login />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Container>
            </Segment>
        )
    }
}

export default LogInSignUp