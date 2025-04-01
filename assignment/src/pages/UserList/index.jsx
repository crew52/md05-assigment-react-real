import * as React from 'react';
import {useEffect, useState} from "react";
import UserService from "../../services/user.service.js";
import { Link} from "react-router";
import {Button, Rating} from "@mui/material";
import FormSearch from "./FormSearch.jsx";

export default function UserList() {
    const  [users, setUsers] = useState([])


    useEffect(() => {
        UserService.getAllUser().then(res => {
            setUsers(res.data)
        })

    }, []);

    const handleSearchUser = (e) => {
        const keyword = e.target.value;
        UserService.searchUserByName(keyword).then(res => {
            setUsers(res.data)
        })
    }

    return (
        <>
            <div className="card mt-2">
                <div className="row">
                    <div className="col-12 col-md-12">
                        <h5 className="card-header">
                            <div className="row">
                                <div className="col-md-4">
                                    <span className={"me-2"}>User List</span>
                                    <Link to={"/admin/users/create"}>
                                        <Button variant={"contained"}>Create</Button>
                                    </Link>
                                </div>
                                <div className="col-md-8">
                                    <FormSearch handleActionSearch={handleSearchUser}/>
                                </div>
                            </div>
                        </h5>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Handle</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Rating
                                                name="simple-controlled"
                                                value={user.rating}
                                                onChange={(event, newValue) => {
                                                    handleRatingUser(newValue, user.id)
                                                }}/>
                                        </td>
                                        <td>
                                            <Link to={`/admin/users/${user.id}/edit`}>
                                                <button type="button" className="btn btn-primary">Edit</button>
                                            </Link>

                                            <button type="button" className="btn btn-danger"
                                                    onClick={() => handleDeleteUser(user.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
