import { useNavigate, useParams } from "react-router";
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import RoleService from "../../services/role.service.js";
import { useFormik } from "formik";
import UserService from "../../services/user.service.js";
import { toast } from "react-toastify";
import * as Yup from 'yup';

function UserEdit() {
    const { uid } = useParams();
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        RoleService.getAllRoles().then(res => {
            setRoles(res.data)
        });

        UserService.getUserById(uid).then(res => {
            updateUserForm.setValues({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                roleId: res.data.roleId,
                rating: res.data.rating,
            });
            setCurrentRole(res.data.roleId);
        })
    }, [uid]);

    const updateUserForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            roleId: "",
            rating: 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
            phone: Yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
            roleId: Yup.string().required("Role is required")
        }),
        onSubmit: values => {
            console.log(values);
            UserService.updateUser(values, uid).then(() => {
                toast.success("Update user successfully");
                navigate("/users");
            }).catch(error => {
                toast.error("Failed to update user");
            })
        }
    });

    const handleChangeRole = (e) => {
        setCurrentRole(e.target.value);
        updateUserForm.setFieldValue("roleId", +e.target.value);
    };

    return (
        <Card>
            <CardHeader title="Update user" />
            <CardContent>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={updateUserForm.handleSubmit}
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            name="name"
                            type="text"
                            value={updateUserForm.values.name}
                            error={Boolean(updateUserForm.errors.name && updateUserForm.touched.name)}
                            helperText={updateUserForm.errors.name && updateUserForm.touched.name && updateUserForm.errors.name}
                            onChange={updateUserForm.handleChange}
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            type="email"
                            name="email"
                            value={updateUserForm.values.email}
                            error={Boolean(updateUserForm.errors.email && updateUserForm.touched.email)}
                            helperText={updateUserForm.errors.email && updateUserForm.touched.email && updateUserForm.errors.email}
                            onChange={updateUserForm.handleChange}
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Phone"
                            type="text"
                            name="phone"
                            value={updateUserForm.values.phone}
                            error={Boolean(updateUserForm.errors.phone && updateUserForm.touched.phone)}
                            helperText={updateUserForm.errors.phone && updateUserForm.touched.phone && updateUserForm.errors.phone}
                            onChange={updateUserForm.handleChange}
                        />
                    </div>

                    <div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={currentRole}
                                name="roleId"
                                onChange={handleChangeRole}
                            >
                                {roles.map(role => (
                                    <FormControlLabel key={role.id} value={role.id} control={<Radio />} label={role.name} />
                                ))}
                            </RadioGroup>
                            {updateUserForm.errors.roleId && updateUserForm.touched.roleId && (
                                <div style={{ color: 'red' }}>{updateUserForm.errors.roleId}</div>
                            )}
                        </FormControl>
                    </div>

                    <Button type="submit" variant="contained">Update</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default UserEdit;
