import * as React from 'react';
import {useEffect, useState} from "react";
import UserService from "../../services/user.service.js";
import { Link} from "react-router";
import {Button, Rating} from "@mui/material";
import FormSearch from "./FormSearch.jsx";
import RoleService from "../../services/role.service.js";
import {toast} from "react-toastify";

function UserList() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        // Fetch all roles
        RoleService.getAllRoles().then(res => {
            setRoles(res.data);
        });
    }, []);

    useEffect(() => {
        // Fetch users based on selectedRole
        if (selectedRole) {
            UserService.getUsersByRole(selectedRole).then(res => {
                setUsers(res.data);
            });
        } else {
            UserService.getAllUser().then(res => {
                setUsers(res.data);
            });
        }
    }, [reloadData, selectedRole]);

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            UserService.deleteUserById(id).then(() => {
                alert("User deleted successfully");
                // toast.success("User deleted successfully")
                setReloadData(!reloadData);
            });
        }
    };

    const handleSearchUser = (e) => {
        const keyword = e.target.value;
        UserService.searchUserByName(keyword).then(res => {
            setUsers(res.data);
        });
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleRatingUser = (newRating, id) => {
        UserService.updateRatingUser(newRating, id).then(() => {
            alert("User rating updated successfully");
            // toast.success("User rating updated successfully")
            setReloadData(!reloadData);
        });
    };

    return (
        <div className="d-flex flex-column align-items-center vh-100">
            {/* Nút Create bên ngoài Card */}
            <div className="w-75 mb-3 text-end">
                <Link to="/users/create">
                    <Button variant="contained">Create</Button>
                </Link>
            </div>

            {/* Card danh sách Users */}
            <div className="card shadow p-4 w-75">
                <h5 className="card-header">User List</h5>
                <div className="card-body">
                    {/* Hàng chứa dropdown role + ô tìm kiếm */}
                    <div className="d-flex justify-content-between mb-3">
                        {/* Dropdown Filter by Role */}
                        <div className="w-25">
                            <select className="form-select" value={selectedRole} onChange={handleRoleChange}>
                                <option value="">All Roles</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Ô tìm kiếm */}
                        <div className="w-50">
                            <FormSearch handleActionSearch={handleSearchUser}/>
                        </div>
                    </div>

                    {/* Bảng danh sách Users */}
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{roles.find(r => r.id === user.roleId)?.name || "Unknown"}</td>
                                    <td>
                                        <Rating
                                            name="user-rating"
                                            value={user.rating}
                                            onChange={(event, newValue) => handleRatingUser(newValue, user.id)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/admin/users/${user.id}/edit`}>
                                            <button className="btn btn-primary me-2">Edit</button>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No users found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;
