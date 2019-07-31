import React, { Component } from 'react';
import Chart from 'chart.js'
// import classes from "./LineGraph.module.css";
import { connect } from 'react-redux'


function colorNameToHex(color) {
    let colors = {
        "red": "#B03060",
        "orange": "#FE9A76",
        "olive": "#32CD32",
        "green": "#016936",
        "teal": "#008080",
        "blue": "#0E6EB8",
        "violet": "#EE82EE",
        "purple": "#B413EC",
        "pink": "#FF1493",
        "brown": "#A52A2A"
    }

    if (typeof colors[color.toLowerCase()] != 'undefined')
        return colors[color.toLowerCase()];

    return false;
}
class BarChart extends Component {

    state = {
        complaintTypes: [],
        complaintNumbers: []
    }

    chartRef = React.createRef()

    //get array of names to map to this.state.complaintTypes
    getComplaintTypeNames = () => {
       let array = this.props.currentUser.complaint_types.map((complaintType) => {
            return complaintType.name
        })
        return array
    }

    //get array of complaintType IDs to map over to get number of complaints per complaint type
    getComplaintTypeId = () => {
        let array = this.props.currentUser.complaint_types.map((complaintType) => {
             return complaintType.id
         })
         return array
     }

    //map over the IDs you got from the above function getComplaintTypeId
    mapComplaintTypes = (complaintTypesArray) => {
        let array = complaintTypesArray.map((complaintType) => {
            return this.getComplaintNumbers(complaintType)
        })
        return array
    }

    //map over array of complaints and filter by complaintTypeId to recieve the number of complaints per complaint type
    getComplaintNumbers = (complaintTypeId) => { 
        let array = this.props.userComplaints.filter(complaint => 
            complaint.complaint_type_id === parseInt(complaintTypeId)
        )
        return array.length
    }

    componentWillMount = () => {
        this.setState({
            complaintTypes: this.getComplaintTypeNames(),
            complaintNumbers: this.mapComplaintTypes(this.getComplaintTypeId())
        })
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: this.state.complaintTypes,
                datasets: [
                    {
                        label: "Number of Bugs per Bug Type",
                        data: this.state.complaintNumbers,
                        backgroundColor: this.getColorHex()
                    }
                ]
            },
            options: {
                legend: {display: false},
                responsive: false,
                scales: {
                    xAxes: [{
                      display: true,
                      ticks: {
                        min: 1
                      }
                    }],
                    yAxes: [{
                      display: true,
                      ticks: {
                        min: 0
                      }
                    }]
                }
            }
        })
    }

    getColorHex = () => {

        
        let array = this.props.currentUser.complaint_types.map((complaintType) => {
            return colorNameToHex(complaintType.color)
        })
        return array
    }

    render() {
        // console.log(this.state)
        // console.log(this.props.userComplaints)
        return(

            <div style={{width: "100%"}}>
                {this.props.userComplaints &&
                <canvas style={{width: "100%"}}//having a stylings sheet for the div here to style, per Brockhoff
                    id="myChart"
                    ref={this.chartRef}
                />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      userComplaints: state.userComplaints
  }
}
    
export default connect(mapStateToProps)(BarChart)