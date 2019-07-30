import React, { Component } from 'react';
import styled from '@emotion/styled'


const MyCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid ${props => props.color};
  border-radius: 20px;
  height: 100%;
`

const MyContent = styled.p`
  border-bottom: 2px dotted ${props => props.color};
  padding: 1px;
  flex: 1 1 auto;
  align-self: stretch;
  height: 33%;
`

const MyReaction = styled.p`
  padding: 1px;
  flex: 1 1 auto;
  align-self: stretch;
  height: 33%;
`


class ActualComplaint extends Component {

    state={
        //ONLY FOR CARD INFORMATION
        complaintType: ""
    }

    reactions = () => {
        // console.log("the reactions function is being hit")
        let returnValue
        if (this.props.complaint.reactions.length !== 0) {
            this.props.complaint.reactions.map((reaction) => {
                returnValue = <MyReaction color={this.props.complaintType.color} >{reaction.cooldown_thoughts+ ", Post-Reflection Severity: " + reaction.updated_severity}</MyReaction>
            })
        } else {
            returnValue = <MyReaction color={this.props.complaintType.color} >You haven't reacted to this bug yet!</MyReaction>
        }
        return returnValue
    }

    render() {
        // console.log(this.props)
        return(
            <MyCard color={this.props.complaintType.color}>
                <MyContent color={this.props.complaintType.color} >{this.props.complaintType.name + ", Severity: " + this.props.complaint.severity}</MyContent>
                <MyContent color={this.props.complaintType.color} >{"Bug: " +  this.props.complaint.complaint_text}</MyContent>
                {this.reactions()}
            </MyCard>
        )
    }

}

export default ActualComplaint