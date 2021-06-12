import React, { useState,useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditProject({ match }) {
  const [project, setProject] = useState({
    title: "",
    content: "",
      date: "",
      id:""
  });
  const history = useHistory();

    useEffect(() => {
        const getProject = async () => {
            const token = localStorage.getItem('tokenStore')
            if (match.params.id) {
                const res = await axios.get(`/api/projects/${match.params.id}`, {
                    headers: {Authorization:token}
                })
                setProject({
                  title: res.data.title,
                  content: res.data.content,
                  date: new Date(res.data.date).toLocaleDateString,
                  id: res.data._id,
                });
            }
            
        }
        getProject()
    },[match.params.id])
    
  const onChangeInput = async (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const editProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date,id } = project;
        const newProject = {
          title,
          content,
          date,
        };

        await axios.put(`/api/projects/${id}`, newProject, {
          headers: { Authorization: token },
        });
        return history.push("/");
      }
    } catch (error) {}
  };

  return (
    <div className="create-note">
      <h2>Edit Note</h2>
      <form onSubmit={editProject} autoComplete="off">
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
            
            onChange={onChangeInput}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
