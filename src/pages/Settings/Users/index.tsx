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
import Edite from "@/Assets/images/nimbus_edit.svg";
import Image from "next/image";
import Trash from "@/Assets/images/circum_trash.svg";

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
                    <TableContainer sx={{ marginTop: 2 }} component={Paper} style={{ overflow: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">ID</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">نام</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">نام خانوادگی</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">شماره تماس</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">کدملی</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">نام پدر</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">تاریخ تولد</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center">رمز عبور</TableCell>
                                    <TableCell sx={{ fontFamily: 'Shabname' }} align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.id}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.name}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.phone}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.phone}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.phone}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.phone}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">{user.phone}</TableCell>
                                        <TableCell sx={{ fontFamily: 'Shabname' }} align="center">
                                            {editingUser === user.id ? (
                                                <TextField
                                                    value={user.name}
                                                    onChange={(e) => handleEdit(user.id, 'name', e.target.value)}
                                                />
                                            ) : (
                                                user.name
                                            )}
                                        </TableCell>
                                        {/* Repeat the same pattern for other TableCell components */}
                                        {/* ... */}
                                        <TableCell align="center">
                                            {editingUser === user.id ? (
                                                <Button variant="contained" color="primary" onClick={() => handleSave(user.id)}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button onClick={() => handleEdit(user.id)}>
                                                        <Image src={Edite} alt={'icons'} />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(user.id)}>
                                                        <Image src={Trash} alt={'icons'} />
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
