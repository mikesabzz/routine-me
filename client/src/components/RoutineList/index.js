import React from 'react';
import { Link } from 'react-router-dom';
import { getFamousPerson } from '../../services/apiService';
import { getNormalPerson } from '../../services/apiService';
import './RoutineList.css';


class RoutineList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataFamous: [], 
            dataNormal: [] 
        }
    }

    async componentDidMount () {
        // Also get the logged in user and display below the famous people
        await this.getFamous() 
        await this.getNormal()

    }

    getFamous = async () => {
        const dataFamous = await getFamousPerson()
        this.setState({dataFamous})
    }

    getNormal = async () => {
        const dataNormal = await getNormalPerson()
        this.setState({dataNormal})   
    }

    renderPerson = () => {
        if(this.state.dataFamous){
            return this.state.dataFamous.map(user =>{
                return (
                    <h2 key={user.id}><Link className ="peoples-list" to={{
                        pathname:`/dashboard/routine/${user.id}`,
                        state:{routines:user.routines}
                }}>{user.name}</Link></h2>
                )
            })
        }
    }

    renderNormalPerson = () => {
        if(this.state.dataNormal){
            return this.state.dataNormal.map(user =>{
                return (
                    <li key={user.id}><Link to={{
                        pathname:`/dashboard/routine/${user.id}`,
                        state:{routines:user.routines}
                }}>{user.name}</Link></li>
                )
            })
        }
    }

    render() {
        return( 
        <div>
            <h1>Welcome to your RoutineMe Dashboard</h1>
                <div className="people-list">
                    
                        {this.renderPerson()}
                    
                </div>
                <div className= 'button-div'>
                    <Link className= "create-routine-button" to='/dashboard/create'>Create New Routine</Link>
                </div>
            
        </div>
        )
    }
}

export default RoutineList

