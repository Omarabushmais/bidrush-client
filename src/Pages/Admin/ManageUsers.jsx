import React, { useEffect, useState } from 'react'
import UsersTable from '../../Components/Admin/UsersTable'
import styles from "./Manage.module.css"

import { getAllUsers, deleteUser, suspendUser } from '../../Api/auth';


function ManageUsers() {
    
    const [allUsers, setAllUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsers();
                setAllUsers(data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchData();
    }, []);

    const handleSuspend = async (id) => {
        const confirmSuspend = window.confirm("Are you sure you want to suspend this user?");
        if (confirmSuspend) {
            try {
                const response = await suspendUser(id);
                setAllUsers(prev => prev.map(user => 
                    user.id === id ? { ...user, status: 'suspended' } : user
                ));
                alert("User suspended successfully");
            } catch (err) {
                console.error("Error suspending user:", err);
                alert("Failed to suspend user");
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user? This cannot be undone.");
        if (confirmDelete) {
            try {
                await deleteUser(id);
                setAllUsers(prev => prev.filter(user => user.id !== id));
            } catch (err) {
                console.error("Error deleting user:", err);
                alert("Failed to delete user");
            }
        }
    };
    const uniqueStatuses = ["all", ...new Set(allUsers.map(u => u.status).filter(Boolean))];

    const filteredUsers = allUsers.filter((user)=> {
        const matchSearch = user.username.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status === "all" || user.status === status;

        return matchSearch && matchStatus;
    });

  return (
    <div>
        <div className={styles.header}>
            <div>
                <h1>Manage Users    </h1>
                <p>View and manage registered users</p>
            </div>
        </div>
        <div className={styles.filterBar}>
            <input className={styles.searchInput} type="text" placeholder='Search Users...' value={search} onChange={(e)=> setSearch(e.target.value)}/>
            <div>
                <select className={styles.categorySelect} value={status} onChange={(e) => setStatus(e.target.value)}>
                    {uniqueStatuses.map((stat, idx) => (
                        <option key={idx} value={stat}>
                            {stat === "all" ? "All Status" : stat}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        {filteredUsers.length > 0 ? (
            <div className={styles.Active}>
                <UsersTable Users={filteredUsers} onSuspend={handleSuspend} onDelete={handleDelete} />
            </div>
        ) : (
            <div className={styles.noFound}>
                No Users found
            </div>
        )}
    </div>

  )
}

export default ManageUsers