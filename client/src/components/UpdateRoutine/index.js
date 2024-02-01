import React from "react";
import { Redirect } from "react-router-dom";
import { updateRoutine, getRoutine } from "../../services/apiService";
// import Axios from 'axios';
import "./UpdateRoutine.css";

class UpdateRoutine extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      updated: false,
      startTime: "",
      endTime: "",
      description: "",
      cancelled: false,
    };
  }
  async componentDidMount() {
    console.log(this.props);
    const { routineId } = this.props.location.state;
    const existingRoutine = await getRoutine(routineId);

    if (existingRoutine) {
      this.setState({
        startTime: existingRoutine.startTime,
        endTime: existingRoutine.endTime,
        description: existingRoutine.description,
      });
    }
  }

  handleChange = (e) => {
    const currentElement = e.target;
    const { name, value } = currentElement;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { startTime, endTime, description } = this.state;
    const routine = { startTime, endTime, description };
    const id = this.props.location.state.routineId;
    await updateRoutine(id, routine);

    this.setState({ updated: true });
  };
  handleCancel = () => {
    this.setState({ cancelled: true });
  };

  render() {
    if (this.state.updated) {
      return <Redirect to="/dashboard"></Redirect>;
    }
    if (this.state.cancelled) {
        return <Redirect to="/dashboard"></Redirect>;
      }
    return (
      <div className="update-routines">
        <h1>Update Your Routine:</h1>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label for="startTime">Start Time (am/pm):</label>
          <input
            name="startTime"
            type="time"
            value={this.state.startTime}
            required
          />
          <label htmlFor="endTime">End Time (am/pm):</label>
          <input
            name="endTime"
            type="time"
            value={this.state.endTime}
            required
          />

          <label htmlFor="description">Activity:</label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            required
          />
          <div className="submit">
            <input type="submit" />
            <button type="button" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateRoutine;
