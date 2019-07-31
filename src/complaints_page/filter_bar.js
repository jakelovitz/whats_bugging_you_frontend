import React, { Component } from 'react';
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
  flex-flow: row;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 20%;
  margin-left: 20%;
`

// const MyBox = styled.div`
//   flex-basis: auto;
//   margin: auto;
//   align-items: center;
//   align-content: center;
// `

class FilterBar extends Component {

    render() {

        return(
            <MyContainer>

                <Button color="black" onClick={() => this.props.setSelectedComplaintType("showAll")}>Show all bugs</Button>

                {this.props.currentUser.complaint_types.map(function(complaintType) {
                    return <Button key={complaintType.id} color={complaintType.color} onClick={() => this.props.setSelectedComplaintType(complaintType.name)}>{complaintType.name}</Button>   
                }, this)}

            </MyContainer>
        )
    }
}

export default (FilterBar)