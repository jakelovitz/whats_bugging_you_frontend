import React, { Component } from 'react';
import styled from '@emotion/styled'

/// when this is gone you've gone back far enough!
const MyCard = styled.div`
  display: grid;
  
  border: 5px solid ${props => props.color};
  border-radius: 20px;
  height: 100%;
`

const MyHeader = styled.p`
  border-bottom: 2px dotted ${props => props.color};
  height: min-content;
  padding: 1px;
  flex: 1 1 auto;
  align-self: stretch;
`

const MyContent = styled.p`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr
  align-items: center;
  border-bottom: 2px dotted ${props => props.color};
  padding: 1px;
  flex: 1 1 auto;
  align-self: stretch;
  height: 100px;
  overflow-y: auto;
  color: black;
  & > a {
    color: green;
  }
  & > bold {
    font-weight: bold
  }
`

const MyReaction = styled(`span`)`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  padding: 1px;
  flex: 1 1 auto;
  align-self: stretch;
  overflow-y: auto;
  height: 100px;
  color: black;
  & > a {
    color: green;
  }
  & > Bold {
    font-weight: bold
  }
`

const LineBreak = styled.p`

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
        returnValue = <MyReaction color={this.props.complaintType.color} ><bold>Reaction: </bold>{reaction.cooldown_thoughts} <bold><a>{reaction.updated_severity}</a></bold></MyReaction>
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
                <MyHeader color={this.props.complaintType.color} style={{fontWeight: "bold"}} >{this.props.complaintType.name}</MyHeader>
                <MyContent color={this.props.complaintType.color} ><bold>Bug: </bold>{this.props.complaint.complaint_text} <bold><a>{this.props.complaint.severity}</a></bold></MyContent>
                {this.reactions()}
            </MyCard>
        )
    }

}

export default ActualComplaint