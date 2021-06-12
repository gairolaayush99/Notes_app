import React, { useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateProject() {
    const [project, setProject] = useState({
        title: '',
        content: '',
        date: ''
    })
const history= useHistory()

    
    const onChangeInput =async e => {
        const { name, value } = e.target;
        setProject({...project,[name]:value})
    }
  const createProject =async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const { title, content, date } = project
        const newProject = {
          title,content,date
        }

        await axios.post('/api/projects', newProject, {
          headers: {Authorization:token}
        })
        return history.push('/')
      }
    } catch (error) {
      
    }
  }

    return (
      <div className="create-note">
        <h2>Add Note</h2>
        <form onSubmit={createProject} autoComplete="off" >
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={project.title}
              id="title"
              name="title"
              required
              onChange={onChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              value={project.content}
              id="content"
              name="content"
              required
              rows="10"
              onChange={onChangeInput}
            />
          </div>
          <label htmlFor="date">Date:{project.date}</label>
          <div className="row">
            <input
              type="date"
              id="date"
              name="date"
              required
              onChange={onChangeInput}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
}
