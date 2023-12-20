import React from 'react';
import { Redirect } from 'react-router-dom';
import { updateRoutine } from '../../services/apiService'
// import Axios from 'axios';
import './UpdateRoutine.css'


class UpdateRoutine extends React.Component {
    constructor(props) {
        super(props)

        this.props = props
        this.state = {
            updated: false
        }
    }


  handleChange = (e) => {
    const currentElement = e.target
    const { name, value } = currentElement
    const newState = {};
    newState[name] = value
    this.setState(newState)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { userId, name, startTime, endTime, description } = this.state
    const routine = { userId, name, startTime, endTime, description};
    const id = this.props.location.state.routineId
    await updateRoutine(id, routine);

    this.setState({updated: true})
  }


    render() {
        if (this.state.updated){return <Redirect to="/dashboard"></Redirect>}
        return (
            <div className="update-routines">
                <h1>Update Your Routine:</h1>
                    <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <label for="startTime">Start Time (am/pm):</label>
                        <input name="startTime" type="text" />
                        <label for="endTime">End Time (am/pm):</label>
                        <input name="endTime" type="text" />
                        <label for="description">Activity:</label>
                        <input name="description" type="text" />
                        <div className="submit"><input type = "submit" /></div> 
                    </form>
                 
            </div>
        );
    };
}

export default UpdateRoutine