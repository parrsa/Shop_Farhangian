import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid
} from '@mui/material';
import axios from "axios";
import SettingLayout from "@/Components/SettingLayout";

const initialUsers = [
    { id: 1, name: 'John Doe', phone: '1234567890', password: 'password123' },
    { id: 2, name: 'Jane Doe', phone: '0987654321', password: 'pass456' },
    // Add more user data as needed
];

const UserTable = () => {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [Value,setValue]=React.useState()
    const handleEdit = (id, field, value) => {
        setEditingUser(id);
        const updatedUsers = users.map((user) => (user.id === id ? { ...user, [field]: value } : user));
        setUsers(updatedUsers);
    };

    const handleSave = (id, field, value) => {
        setEditingUser(null);
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setEditingUser(null);
    };

    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} >
                <Grid item container lg={11}>
                    <TableContainer sx={{marginTop:2}}  component={Paper}>
                        <Table>
                            <TableHead >
                                <TableRow sx={{fontFamily:'Shabname'}} >
                                    <TableCell>ID</TableCell>
                                    <TableCell>نام</TableCell>
                                    <TableCell>نام خانوادگی</TableCell>
                                    <TableCell>شماره تماس</TableCell>
                                    <TableCell>کدملی</TableCell>
                                    <TableCell>نام پدر</TableCell>
                                    <TableCell>تاریخ تولد</TableCell>
                                    <TableCell>رمز عبور</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>
                                            {editingUser === user.id ? (
                                                <TextField
                                                    value={user.name}
                                                    onChange={(e) => handleEdit(user.id, 'name', e.target.value)}
                                                />
                                            ) : (
                                                user.name
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingUser === user.id ? (
                                                <TextField
                                                    value={user.phone}
                                                    onChange={(e) => handleEdit(user.id, 'phone', e.target.value)}
                                                />
                                            ) : (
                                                user.phone
                                            )}
                                        </TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>
                                            {editingUser === user.id ? (
                                                <Button variant="contained" color="primary" onClick={() => handleSave(user.id)}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user.id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>

        </SettingLayout>
    );
};

export default UserTable;
