import {
    Card, CardContent, CardHeader, FormControl,
    Box, TextField, FormControlLabel,
    FormLabel, RadioGroup, Radio, Button
} from "@mui/material";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import RoleService from "../../services/role.service.js";
import UserService from "../../services/user.service.js";
import * as Yup from 'yup';

function UserCreate() {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        RoleService.getAllRoles().then(res => {
            setRoles(res.data)
        })
    }, [])

    const creatUserForm = useFormik({
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
            UserService.createUser(values).then(res => {
                toast.success("Create user successfully");
                navigate("/users")
            })
        }
    })

    return (
        <Card>
            <CardHeader title="Create user" />
            <CardContent>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={creatUserForm.handleSubmit}
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            name="name"
                            type="text"
                            onChange={creatUserForm.handleChange}
                            value={creatUserForm.values.name}
                            error={Boolean(creatUserForm.errors.name && creatUserForm.touched.name)}
                            helperText={creatUserForm.errors.name && creatUserForm.touched.name && creatUserForm.errors.name}
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            type="email"
                            name="email"
                            onChange={creatUserForm.handleChange}
                            value={creatUserForm.values.email}
                            error={Boolean(creatUserForm.errors.email && creatUserForm.touched.email)}
                            helperText={creatUserForm.errors.email && creatUserForm.touched.email && creatUserForm.errors.email}
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Phone"
                            type="text"
                            name="phone"
                            onChange={creatUserForm.handleChange}
                            value={creatUserForm.values.phone}
                            error={Boolean(creatUserForm.errors.phone && creatUserForm.touched.phone)}
                            helperText={creatUserForm.errors.phone && creatUserForm.touched.phone && creatUserForm.errors.phone}
                        />
                    </div>

                    <div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="roleId"
                                onChange={e => creatUserForm.setFieldValue("roleId", parseInt(e.target.value))}
                            >
                                {roles.map(role => (
                                    <FormControlLabel key={role.id} value={role.id} control={<Radio />} label={role.name} />
                                ))}
                            </RadioGroup>
                            {creatUserForm.errors.roleId && creatUserForm.touched.roleId && (
                                <div style={{ color: 'red' }}>{creatUserForm.errors.roleId}</div>
                            )}
                        </FormControl>
                    </div>

                    <Button type="submit" variant="contained">Create</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default UserCreate