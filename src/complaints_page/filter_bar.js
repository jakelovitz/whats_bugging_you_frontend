import React, { Component } from 'react';
import styled from '@emotion/styled'
import { Checkbox } from 'semantic-ui-react'

const Button = styled.button`
  padding: 15px;
  background-color: ${props => props.color};
  background-image: url(...);
  font-size: 18px;
  border-radius: 40px;
  color: white;
  font-weight: bold;
  &:hover {
    color: invert(100%);
  }
`

const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 15%;
  margin-left: 15%;
`

const CheckboxControl = styled.div`
  padding-right: 100px
`

class FilterBar extends Component {

    render() {
        return(
          <React.Fragment>

          <MyContainer>
            <Button color="black" onClick={() => this.props.setSelectedComplaintType("showAll")}>Show all bugs</Button>
                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <Button key={complaintType.id} color={complaintType.color} onClick={() => this.props.setSelectedComplaintType(complaintType.name)}>{complaintType.name}</Button>   
                }, this)}
            </MyContainer>

            <MyContainer>
              <CheckboxControl>
                <Checkbox slider label="Bug Severity" onClick={this.props.toggleBugSeverity} checked={this.props.severityChecked}/>
              </CheckboxControl>


              <CheckboxControl>
                <Checkbox slider label="Bugs that got worse" onClick={this.props.toggleBugWorse} checked={this.props.worseChecked}/>
              </CheckboxControl>

              <CheckboxControl>
                <Checkbox slider label="Bugs that got better" onClick={this.props.toggleBugBetter} checked={this.props.betterChecked}/>
              </CheckboxControl>
            </MyContainer>

            </React.Fragment>
        )
    }
}

export default (FilterBar)