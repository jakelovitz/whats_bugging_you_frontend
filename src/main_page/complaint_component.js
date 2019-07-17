import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'

class Complaint extends Component {

    render() {
        return( 
            <Card>
                <Card.Content header="Your most recent complain" />
                <Card.Content description="This is a test description that will later be filled with an actual complaint" />
                <Card.Content extra>
                    <Button>React</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Card.Content>
            </Card>
        )
    }

}

export default Complaint