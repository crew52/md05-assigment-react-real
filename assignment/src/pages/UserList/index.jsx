import * as React from 'react';
import {useEffect, useState} from "react";
import UserService from "../../services/user.service.js";
import { Link} from "react-router";
import {Button, Rating,Pagination} from "@mui/material";
import FormSearch from "./FormSearch.jsx";
import RoleService from "../../services/role.service.js";
import {toast} from "react-toastify";

function UserList() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [reloadData, setReloadData] = useState(false);

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Số lượng user hiển thị trên mỗi trang

    useEffect(() => {
        RoleService.getAllRoles().then(res => {
            setRoles(res.data);
        });
    }, []);

    useEffect(() => {
        if (selectedRole) {
            UserService.getUsersByRole(selectedRole).then(res => {
                setUsers(res.data);
                setCurrentPage(1); // Reset về trang đầu khi filter
            });
        } else {
            UserService.getAllUser().then(res => {
                setUsers(res.data);
                setCurrentPage(1);
            });
        }
    }, [reloadData, selectedRole]);

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            UserService.deleteUserById(id).then(() => {
                alert("User deleted successfully");
                setReloadData(!reloadData);
            });
        }
    };

    const handleSearchUser = (e) => {
        const keyword = e.target.value;
        UserService.searchUserByName(keyword).then(res => {
            setUsers(res.data);
            setCurrentPage(1);
        });
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleRatingUser = (newRating, id) => {
        UserService.updateRatingUser(newRating, id).then(() => {
            alert("User rating updated successfully");
            setReloadData(!reloadData);
        });
    };

    // Tính toán user hiển thị dựa trên trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
                    <div className="d-flex justify-content-between mb-3">
                        <div className="w-25">
                            <select className="form-select" value={selectedRole} onChange={handleRoleChange}>
                                <option value="">All Roles</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-50">
                            <FormSearch handleActionSearch={handleSearchUser}/>
                        </div>
                    </div>

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
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{indexOfFirstUser + index + 1}</td>
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
                                        <Link to={`/users/${user.id}/edit`}>
                                            <button className="btn btn-primary me-2">Edit</button>
                                        </Link>
                                        <Link to={`/users/${user.id}/detail`}>
                                            <button className="btn btn-danger me-2">Detail</button>
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

                    {/* Phân trang */}
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination
                            count={Math.ceil(users.length / usersPerPage)}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;