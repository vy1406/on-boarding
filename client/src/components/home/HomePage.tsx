import React from 'react';
import './HomePage.css'
import ProjectsComponent from '../projects/ProjectsComponent';
import TasksComponent from '../tasks/TasksComponent';

class HomePage extends React.Component { 
  render(){
    return(
      <div className="page_container"> 
        <ProjectsComponent />
        <TasksComponent />
      </div>
    )
  }
}

export default HomePage;