/** @jsx jsx */
import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import NewComplaintTypeForm from './new_complaint_type_form'
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import styled from '@emotion/styled'
import { jsx } from '@emotion/core'
import RadioButtons from './radio_buttons'



const options = [
    {key: 1, text: 1, value: 1 },
    {key: 2, text: 2, value: 2 },
    {key: 3, text: 3, value: 3 },
    {key: 4, text: 4, value: 4 },
    {key: 5, text: 5, value: 5 }
]

const MyContainer = styled.div`
  display: grid;
  width: 80%;
  justify-content: stretch;
  justify-items: stretch;
  align-items: stretch;
  grid-template-columns: [col-1-start] 1fr [col-2-start] 1fr [col-2-end];
  grid-column-gap: 10%;
  grid-row-gap: 10px;
  margin-right: 15%;
  margin-left: 15%;
`

const SubmitRow = styled.div`
  grid-column-start: col-1-start;
  grid-column-end: col-2-end;
`

const AdditionalStylingChild = styled.div`
    margin-bottom: 10px;
      border-radius: 10px;
`

const AdditionalStyling = styled.div`
  ${AdditionalStylingChild} {
      margin-bottom: 10px;
      border-radius: 10px;
  }
`




class NewComplaintForm extends Component {
    
    state = {
        userId: this.props.id,
        complaintTypeId: null,
        complaintText: "",
        complaintSeverity: ""
    }
    
    handleRadio = (value) => this.setState({ complaintTypeId: value })

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
        .then(response => {this.props.addComplaint(response)})
        .then(response => this.setState({ complaintText: "", complaintSeverity: ""}))
    }
        
    render() {
        return(
            
            <MyContainer >

                <h2 style={{marginTop: "2%"}} >What's Bugging You?</h2>
                <h2 style={{marginTop: "2%"}} >Your Bug Species</h2>

                        
                <textarea style={{height: "100%"}} onChange={this.handleChange} placeholder="Tell us what's bugging you here" value={this.state.complaintText}/>
                
                {/* <div>
                    <RadioGroup vertical="true" onChange={this.handleRadio}>
                        {this.props.complaint_types.map(function(complaintType) {
                            return <ReversedRadioButton
                            css={{marginBottom: '10px'}}
                            value={complaintType.id.toString()} 
                            key={complaintType.id}
                            padding={1}
                            iconSize={1}
                            iconInnerSize={1}
                            rootColor={complaintType.color}
                            pointColor={"black"}
                            >
                                {complaintType.name}
                            </ReversedRadioButton>
                        }, this)}
                    </RadioGroup>
                </div> */}
                <RadioButtons species={this.props.complaint_types} handleRadio={this.handleRadio}/>

                <div>
                <h2>Severity</h2>
                <Form.Select 
                    options={options} 
                    placeholder='Select Severity'
                    selection
                    value={this.state.complaintSeverity}
                    onChange={this.handleSeverity}
                    style={{width: "100%"}}
                />
                </div>
                <NewComplaintTypeForm />

                <SubmitRow>
                <Button 
                    type='submit' 
                    onClick={this.handleSubmit}
                    disabled={!this.state.complaintTypeId || !this.state.complaintSeverity || !this.state.complaintText}
                    >
                    Submit
                </Button>
                </SubmitRow>

        </MyContainer>
       
        )
    }
}

function mapStateToProps(state) {
    return state.currentUser
}
  
function mapDispatchToProps(dispatch){
    return {
        addComplaint: (complaint) => {
            dispatch({type: "ADD_COMPLAINT", payload: complaint})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComplaintForm);