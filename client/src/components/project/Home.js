import React, {useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from 'axios'


export default function Home() {
    const [projects, setProjects] = useState([])
    const [token, setToken] = useState('');
    
    const getProjects = async (token) => {
         const res = await axios.get("/api/projects/", {
           headers: {
             Authorization:
               token,
           },
         });
       
        setProjects(res.data)
    }
    useEffect(() => {
        const token = localStorage.getItem("tokenStore");
        setToken(token)
        
        if (token) {
            
            getProjects(token)            
        }
    }, [])
    const deleteProject = async (id) => {
        try {
            if (token) {
                await axios.delete(`api/projects/${id}`, {
                    headers: {Authorization:token}
                })
                getProjects(token)
            }
        } catch (error) {
            window.location.href="/"
        }
        
    }

    return (
      <div className="note-wrapper">
        {projects.map((project) => (
            <div className="card" key={ project._id}>
                <h4 title={project.title}>{ project.title}</h4>
            <div className="text-wrapper">
              <p style={{paddingBottom:"100px"}}>
                        { project.content}
              </p>
            </div>
                <p className="date" >{ format(project.date)}</p>
            <div className="card-footer">
                    { project.name}
                    <Link to={ `edit/${project._id}`}>edit</Link>
            </div>
                <button className="close" onClick={()=> deleteProject(project._id)}>x</button>
          </div>
        ))}
      </div>
    );
}
