import React, { Component } from 'react';
import Chart from 'chart.js'
// import classes from "./LineGraph.module.css";
import { connect } from 'react-redux'

class BarChart extends Component {

    state = {
        complaintTypes: [],
        complaintNumbers: []
    }

    chartRef = React.createRef()

    getComplaintTypeNames = () => { //get array of names to map to this.state.complaintTypes
       let array = this.props.currentUser.complaint_types.map((complaintType) => {
            return complaintType.name
        })
        return array
    }

    getComplaintTypeId = () => { //get array of complaintType IDs to map over to get number of complaints per complaint type
        let array = this.props.currentUser.complaint_types.map((complaintType) => {
             return complaintType.id
         })
         return array
     }

    mapComplaintTypes = (complaintTypesArray) => { //map over the IDs you got from the above function getComplaintTypeId
        let array = complaintTypesArray.map((complaintType) => {
            return this.getComplaintNumbers(complaintType)
        })
        return array
    }

    getComplaintNumbers = (complaintTypeId) => { //map over array of complaints and filter by complaintTypeId to recieve the number of complaints per complaint type
        let array = this.props.userComplaints.filter(complaint => 
            complaint.complaint_type_id === parseInt(complaintTypeId)
        )
        return array.length
    }

    componentWillMount = () => { //was componentWillMount
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
                        // backgroundColor: ["#008000", "#FF0000", "#D2B48C", "#A9A9A9"] write function to map over complaintTypes and return color
                    }
                ]
            },
            options: {
                // scales: {
                //     xAxes: [{
                //         barPercentage: 1,
                //         categoryPercentage: 1,
                //         // barThickness: 'flex',
                //         maxBarThickness: 8,
                //         minBarLength: 2,
                //         gridLines: {
                //             offsetGridLines: true
                //         }
                //     }]
                // }
            }
        })
    }

    render() {

        return(

            <div>
                {this.props.userComplaints &&
                <canvas //having a stylings sheet for the div here to style, per Brockhoff
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