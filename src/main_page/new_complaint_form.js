import React, { Component } from 'react';
import { Button, Form, Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import NewComplaintTypeForm from './new_complaint_type_form'



const options = [
    {key: 1, text: 1, value: 1 },
    {key: 2, text: 2, value: 2 },
    {key: 3, text: 3, value: 3 },
    {key: 4, text: 4, value: 4 },
    {key: 5, text: 5, value: 5 }
]

class NewComplaintForm extends Component {
    
    state = {
        userId: this.props.id,
        complaintTypeId: 0,
        complaintText: null,
        complaintSeverity: null,
        rerender: false
    }
    
    handleRadio = (e, { value }) => this.setState({ complaintTypeId: value })

    checkForComplaintTypeAddition = () => {
        mapStateToProps()
    }

    rerender = () => {

    }

    render() {
        // console.log('do you rerender?')
        // console.log('UPDATED PROPS', this.props)
        // console.log(this.props)
        // console.log(this.state)
        return(
            <Container>
            <Grid columns={2} stackable >
                <Grid.Row>
                    <Grid.Column>
                        <h2>What's bugging you right now?</h2>
                    </Grid.Column>

                    <Grid.Column>
                        <h2>Your Complaint Types</h2>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.TextArea placeholder="Tell us what's bugging you here" />
                            <Form.Select fluid label='Severity' options={options} />
                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        {this.props.complaint_types.map(function(complaintType) {
                            return <Form.Radio 
                                label={complaintType.name} 
                                name='complaintTypeGroup'
                                value={complaintType.id}
                                checked={this.state.complaintTypeId === complaintType.id}
                                onChange={this.handleRadio}
                                key={complaintType.id}
                                style={{color: complaintType.color}}
                            />
                        }, this)}
                        <NewComplaintTypeForm />
                    </Grid.Column>

                </Grid.Row>
            </Grid>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return state.currentUser
}
  
function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComplaintForm);