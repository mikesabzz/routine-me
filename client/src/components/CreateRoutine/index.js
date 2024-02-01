import React from 'react';
import './CreateRoutine.css';
import { Redirect } from 'react-router-dom';
import { createRoutine } from '../../services/apiService'
import './CreateRoutine.css'

class CreateRoutine extends React.Component {
    constructor(props) {
        super(props)

        this.props = props
        this.state = {
          created: false,
          name: '',
          userId: props.user.id,
          startTime: '',
          endTime: '',
          description: '',
        }
    }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { userId, name, startTime, endTime, description } = this.state
    const routine = { userId, name, startTime, endTime, description};

    await createRoutine(routine);

    this.setState({created: true})
  }



    render() {
        if (this.state.created){return <Redirect to="/dashboard"></Redirect>}
        return (
            <div className="routines">
                    <h1>Create Your Routine:</h1>
                    <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <label for="startTime">Start Time (am/pm):</label>
                        <input name="startTime" type="time" />
                        <label for="endTime">End Time (am/pm):</label>
                        <input name="endTime" type="time" />
                        <label for="description">Activity:</label>
                        <input name="description" type="text" />
                        <div className="submit"><input type = "submit" /></div> 
                    </form>
            </div>
        );
    };
}

export default CreateRoutine