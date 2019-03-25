import React from 'react';
import {Link} from 'react-router-dom';

const Project=props=><div className='card'><Link to={`/projects/${props.data.id}`}><p>{props.data.name}</p></Link></div>

export default Project;
