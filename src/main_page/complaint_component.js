import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Button, Container, Grid } from 'semantic-ui-react'
import NewReaction from './reaction_form'
import EditForm from './edit_form'
import styled from '@emotion/styled'
import { FaPencilAlt } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

const MyCard = styled.div`
    display: grid;
    width: 80%;
    grid-template-rows: auto auto auto;
    justify-self: center;
    border: 5px solid ${props => props.color};
    border-radius: 20px;
    height: 100%;
`

const MyHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-gap: 2%;
    border-bottom: 2px dotted ${props => props.color};
    height: min-content;
    padding: 10px;
`
const BugType = styled.div`
    grid-column-start: 2;
    grid-column-end: 3
`
const Icons = styled.div`
    grid-column-start: 3;
    grid-column-end: 4;
    padding-right: 5%;
`

const MyBug = styled.div`
    border-bottom: 2px dotted ${props => props.color};
    height: min-content;
    padding: 1px;
    padding: 10px;
`

const MyReaction = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-gap: 2%;
`

// const MyContent = styled.p`
//   border-bottom: 2px dotted ${props => props.color};
//   padding: 1px;
//   align-self: stretch;
//   height: 100px;
//   overflow-y: auto;
//   color: black;
//   & > a {
//     color: green;
//   }
//   & > bold {
//     font-weight: bold
//   }
// `

class Complaint extends Component {

    state = {
        complaintType: null,
        reactionToggle: false,
        editToggle: false
    }

   //Locates the actual complaint_type object for this bug. Returns an array with 1 element 
    setComplaintType = () => {
        return this.props.currentUser.complaint_types.filter(ct => ct.id === this.props.complaint.complaint_type_id)
    }

    //actually sets state.ComplaintType to the complaint_type object located by setComplaintType()
    componentDidMount() {
        let type = this.setComplaintType()
        this.setState({ complaintType: type[0]})
    }

    setTypeAfterEdit = () => {
        let type = this.setComplaintType()
        this.setState({ complaintType: type[0]})
    }

    toggleReactionForm = () => {
        this.setState({ reactionToggle: !this.state.reactionToggle})
    }

    toggleEditForm = () => {
        this.setState({ editToggle: !this.state.editToggle})
    }

    handleDelete = (id) => {
        fetch(`http://localhost:3000/complaints/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.complaint)
        })
        .then(res => res.json())
        .then(response => this.props.removeUnreactedComplaint(this.locateIndex()))
    }

    locateIndex = () => {
        return (this.props.unreactedUserComplaints.indexOf(this.props.complaint))
    }

    render() {
        const reactionToggle = this.state.reactionToggle
        let reactionForm;

        if (reactionToggle) {
            reactionForm = < NewReaction complaint={this.props.complaint}/>
        }

        if (this.state.complaintType === undefined || this.state.complaintType === null) {
            return (
                "loading"
            )
        } else if (this.state.editToggle) {
            return (
                //was wrapped in a MyCard right here
                < EditForm fluid complaint={this.props.complaint} complaintType={this.state.complaintType} complaintText={this.props.complaint.complaint_text} complaintSeverity={this.props.complaint.severity} toggleEditForm={this.toggleEditForm} setTypeAfterEdit={this.setTypeAfterEdit}/>
                
            )
        } else {

            return( 
                
                // <Grid.Row>
                //     <Card fluid color={this.state.complaintType.color}>
                //         <Card.Content header={this.state.complaintType.name + ", Severity: " + this.props.complaint.severity} />
                //         <Card.Content description={this.props.complaint.complaint_text} />
                //         <Card.Content >
                //             <Button onClick={this.toggleReactionForm} color={this.state.complaintType.color}>React</Button>
                //             <Button onClick={this.toggleEditForm} color={this.state.complaintType.color}>Edit</Button>
                //             <Button onClick={() => this.handleDelete(this.props.complaint.id)}color={this.state.complaintType.color}>Delete</Button>
                //         </Card.Content>
                //     </Card>
                //     {reactionForm}
                // </Grid.Row>

                <MyCard color={this.state.complaintType.color}>
                    <MyHeader>

                        <BugType>{this.state.complaintType.name + ", Severity: " + this.props.complaint.severity}</BugType>

                        <Icons style={{justifySelf: 'end'}}>
                            <FaPencilAlt onClick={this.toggleEditForm}/>
                            <FaRegTimesCircle onClick={() => this.handleDelete(this.props.complaint.id)
                            }/>
                        </Icons>
                      
                       
                    </MyHeader>

                    <MyBug>{this.props.complaint.complaint_text}</MyBug>

                    < NewReaction complaint={this.props.complaint}/>
                </MyCard>
               
            )

        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        unreactedUserComplaints: state.unreactedUserComplaints
    }
}
  
function mapDispatchToProps(dispatch){
    return {
        removeUnreactedComplaint: (complaint_id) => {
            dispatch({type: "REMOVE_UNREACTED_COMPLAINT", payload: complaint_id})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Complaint)