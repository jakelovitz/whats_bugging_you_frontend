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
        complaintSeverity: null
    }
    
    handleRadio = (e, { value }) => this.setState({ complaintTypeId: value })

    handleSeverity = (_e, { value }) => this.setState({ complaintSeverity: value })

    handleChange = (event) => {
        this.setState({
            complaintText: event.target.value
        })
    }

    handleSubmit = () => {
        // debugger
        fetch("http://localhost:3000/complaints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
            console.log("reminder to dispatch this to the store")
         })
    }
        

    render() {
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
                            <Form.TextArea onChange={this.handleChange} placeholder="Tell us what's bugging you here" />
                            <Form.Select 
                                fluid label='Severity' 
                                options={options} 
                                placeholder='Select Severity'
                                selection
                                value={options.value}
                                onChange={this.handleSeverity}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        {console.log(this.props)}
                        {this.props.complaint_types.map(function(complaintType) { //sometimes needs to be this.props.user.complaints, this is probably because of some confusion with REDUX v. React states and who current user is. Check this thoroughly tomorrow morning
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
            <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
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