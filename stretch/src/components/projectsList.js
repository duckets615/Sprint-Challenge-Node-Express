import React from 'react';
import axios from 'axios';
import Project from './project.js';

class ProjectsList extends React.Component{
    constructor() {
        super();
        this.state={
            projects:[],
            loading:true
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/projects').then(res=>this.setState({projects:res.data,loading:false},()=>console.log(this.state.projects))).catch(err=>console.log(err));
    }
    render() {
        if (this.state.loading===false) {
        return(
            <div>
                <h1>Projects:</h1>
                {this.state.projects.map((e,i)=><Project key={i} data={e}></Project>)}
            </div>
        )
    } else {
        return <div></div>;
    }
    }
}
export default ProjectsList;
