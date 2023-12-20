import React from 'react';
import { Link } from 'react-router-dom';
import { getFamousPerson } from '../../services/apiService';
import { getNormalPerson } from '../../services/apiService';
import './RoutineList.css';


class RoutineList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            routines:[]
        }
    }

    async componentDidMount () {
        // Also get the logged in user and display below the famous people
        await this.getFamous() 
        await this.getNormal ()
    }

    getFamous = async () => {
        const data = await getFamousPerson()
        //  console.log(data)
        this.setState({data})
        console.log('getfamous', data)
    }

    getNormal = async () => {
        const data = await getNormalPerson()
        this.setState({data})
        
    }

    renderPerson= () => {
        if(this.state.data){
            return this.state.data.map(user =>{
                
                return (
                    <h2 key={user.id}><Link className ="peoples-list" to={{
                        pathname:`/dashboard/routine/${user.id}`,
                        state:{routines:user.routines}
                }}>{user.name}</Link></h2>
                )
            })
        }
    }

    renderNormalPerson= () => {
       
        if(this.state.data){
            return this.state.data.map(user =>{
                console.log('rendernormalperson',user)
                // console.log(this.state)
                console.log('RNP props',this.props)
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

