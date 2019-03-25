import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ProjectPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            actions:[],
            completed:'',
            description:'',
            id:'',
            name:'',
            loading:false
        }
    }
    componentDidMount(){

        this.setState({loading:true},()=>this.state.loading===true?
        axios.get(`http://localhost:4000/api/projects/${this.props.match.params.id}`)
        .then(res=>this.setState(res.data,this.setState({loading:false}))).catch(err=>console.log(err)):null);

    }
    render() {
        if (this.state.loading===false){
            return(
                <div className='card'>
                    <p>{`Project id #${this.state.id}`}</p>
                    <p>{this.state.name}</p>
                    <p>{this.state.description}</p>
                    <p>Actions:</p>
                    {this.state.actions.map((e,i)=><div className='card' key={i}>
                    <p>{e.description}</p>
                    <p>{e.notes}</p>
                    <p>Completed: {e.completed.toString()}</p>
                    </div>)}
                    <p>Completed: {this.state.completed.toString()}</p>
                    <button className='btn waves-effect waves-light' onClick={()=>this.props.history.push('/projects/')}>
                    Back to home page</button>
                </div>
            )
        } else {
        return(
            <div></div>
        )
    }
}
}
export default withRouter(ProjectPage);
