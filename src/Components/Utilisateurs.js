import React, { useState, useEffect } from "react";
import axios from "axios";

const Utilisateurs = () => {
  // Déclaration des états pour gérer les utilisateurs, l'édition et l'utilisateur actuel
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    password: "",
    role: "",
  });

  // Utilisation de useEffect pour charger les utilisateurs au chargement initial
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour ajouter un utilisateur
  const addUser = async (user) => {
    try {
      await axios.post("http://localhost:5000/api/users", user);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (id, user) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, user);
      setEditing(false);
      setCurrentUser({ id: "", username: "", password: "", role: "" });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour éditer un utilisateur
  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user._id,
      username: user.username,
      password: user.password,
      role: user.role,
    });
  };

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      updateUser(currentUser.id, currentUser);
    } else {
      addUser(currentUser);
    }
  };
  // Structure HTML du tableau et des modales
  return (
    <>
      <div
        className="container"
        style={{ position: "relative", bottom: "50px", left: "60px" }}
      >
        <div className="table-wrapper">
          <div
            className="table-title"
            style={{ position: "relative", bottom: "20px" }}
          >
            <div className="row">
              <div className="col-sm-6">
                <h3 style={{ position: "relative", left: "130px" }}>Users</h3>
              </div>

              <div className="col-sm-4">
                <a
                  href="#addEmployeeModal"
                  className="btn btn-success"
                  data-toggle="modal"
                >
                  <i className="material-icons">&#xE147;</i> <span>Add</span>
                </a>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <a
                      href="#editEmployeeModal"
                      className="edit"
                      data-toggle="modal"
                      onClick={() => editUser(user)}
                    >
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Edit"
                      >
                        &#xE254;
                      </i>
                    </a>
                    <a
                      href="#deleteEmployeeModal"
                      className="delete"
                      data-toggle="modal"
                      onClick={() => deleteUser(user._id)}
                    >
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Delete"
                      >
                        &#xE872;
                      </i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Add</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={currentUser.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={currentUser.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>role</label>
                  <textarea
                    className="form-control"
                    name="role"
                    value={currentUser.role}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Edit</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={currentUser.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={currentUser.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>role</label>
                  <textarea
                    className="form-control"
                    name="role"
                    value={currentUser.role}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-info">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={() => deleteUser(currentUser.id)}>
              <div className="modal-header">
                <h4 className="modal-title">Delete</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete these Records?</p>
                <p className="text-warning">
                  <small>This action cannot be undone.</small>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={() => deleteUser(currentUser.id)}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Utilisateurs;
