import React from "react";
import "./SingleRoutine.css";
import { deleteRoutine } from "../../services/apiService";
// import { Redirect } from 'react-router-dom';

const SingleRoutine = (props) => {
  const handleDelete = async (id) => {
    await deleteRoutine(id);
    await props.history.push(`/dashboard`);
  };
  const formatTime = (time) => {
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    return formattedTime;
  };

  const renderRoutines = () => {
    if (props.location.state) {
      const sortedRoutines = props.location.state.routines.sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );
      return sortedRoutines.map((routine) => {
        return (
          <div className="single-routine" key={routine.id}>
            <div>
              {formatTime(routine.startTime)} - {formatTime(routine.endTime)} :{" "}
              {routine.description}
            </div>
            {localStorage.getItem("userId") == routine.userId ? (
              <><div className="buttons-container">
                <button
                  className="update-button"
                  onClick={() => props.history.push("/dashboard/routine/:routine_id/update", {
                    routineId: routine.id, userId: routine.userId,
                  })}
                >
                  Update
                </button>
              
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(routine.id)}
                  >
                    Delete
                  </button>
                </div></>
            ) : (
              ""
            )}
            
          </div>
        );
      });
    }
  };
  return <div>{renderRoutines()}</div>;
};

export default SingleRoutine;
