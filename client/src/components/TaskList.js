import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Modal } from 'react-bootstrap'; // Install react-bootstrap if not installed


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paginate, setPaginate] = useState({
    limit: 10,
    skip: 0
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchTasks();
  }, [paginate]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleEdit = (task) => {
    setEditingTask(task);
    handleShow();
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        // Remove the deleted task from the tasks state
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks?skip=${paginate.skip}&limit=${paginate.limit}`, {
        method: 'GET',
        headers: {
          "x-auth-token": localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handlePrevPaginate = () => {
    if (currentPage === 1 ) return null
    setPaginate({
      skip: paginate.skip - paginate.limit,
      limit: paginate.limit
    })
    setCurrentPage((oldCount) => oldCount - 1)
  }

  const handleNextPaginate = () => {
    if (tasks.length < paginate.limit ) return null
    setPaginate({
      skip: paginate.skip + paginate.limit,
      limit: paginate.limit
    })
    setCurrentPage((oldCount) => oldCount + 1)
  }


  return (
    <div className="container">
      <h2>Task List</h2>
      <div className="row row-cols-2">
        <table class="table table-hover" data-show-pagination-switch="true">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? <>
              {tasks.map((task, index) => (
              <tr key={task._id}>
                <th scope="row">{index+paginate.skip}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button></td>
              </tr>
            ))}
            </>: <span>No Data</span> }

          </tbody>
          <nav className="position-absolute end-50" aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><button class="page-link" onClick={handlePrevPaginate}>Previous</button></li>
              <li class="page-item"><button class="page-link" onClick={handleNextPaginate}>Next</button></li>
            </ul>
          </nav>
        </table>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm task={editingTask} isEditing={true} onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default TaskList;
