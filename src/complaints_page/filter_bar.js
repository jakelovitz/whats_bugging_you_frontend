import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import styled from '@emotion/styled'

const Button = styled.button`
  padding: 20px;
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
  margin-left: auto;
  margin-right: auto;
  flex-flow: row;
  flex-direction: row;
  flex-wrap: wrap;
`

const MyBox = styled.div`
  flex-basis: auto;
  margin: auto;
  align-items: center;
  align-content: center;
`

class FilterBar extends Component {

    render() {

        return(
            <MyContainer>

                    <MyBox><Button color="black" onClick={() => this.props.setSelectedComplaintType("showAll")}>Show all bugs</Button></MyBox>

                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <MyBox key={complaintType.id}>
                        <Button key={complaintType.id} color={complaintType.color} onClick={() => this.props.setSelectedComplaintType(complaintType.name)}>{complaintType.name}</Button>
                    </MyBox>
                }, this)}

            </MyContainer>
        )
    }
}

export default (FilterBar)