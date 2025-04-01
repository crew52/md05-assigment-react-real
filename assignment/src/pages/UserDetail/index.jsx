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
import UserService from "../../services/user.service.js";
import { toast } from "react-toastify";

function UserDetail() {
    const { uid } = useParams();  // Get user ID from the URL
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    const navigate = useNavigate();

    // Fetch roles and user details when component mounts
    useEffect(() => {
        RoleService.getAllRoles().then(res => {
            setRoles(res.data);
        });

        UserService.getUserById(uid).then(res => {
            setUser(res.data);
            setCurrentRole(res.data.roleId);
        }).catch(error => {
            toast.error("Failed to fetch user details");
        });
    }, [uid]);

    if (!user) {
        return <div>Loading...</div>;  // Show loading if user data is not fetched yet
    }

    return (
        <Card>
            <CardHeader title="User Details" />
            <CardContent>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            label="Name"
                            name="name"
                            type="text"
                            value={user.name}
                            InputProps={{
                                readOnly: true,  // Make this field readonly
                            }}
                        />
                    </div>

                    <div>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={user.email}
                            InputProps={{
                                readOnly: true,  // Make this field readonly
                            }}
                        />
                    </div>

                    <div>
                        <TextField
                            label="Phone"
                            type="text"
                            name="phone"
                            value={user.phone}
                            InputProps={{
                                readOnly: true,  // Make this field readonly
                            }}
                        />
                    </div>

                    <div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={currentRole}
                                name="roleId"
                                readOnly
                            >
                                {roles.map(role => (
                                    <FormControlLabel
                                        key={role.id}
                                        value={role.id}
                                        control={<Radio />}
                                        label={role.name}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div>
                        <Button variant="contained" onClick={() => navigate("/users")}>
                            Back to Users List
                        </Button>
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
}

export default UserDetail;
