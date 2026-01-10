import React, { useState } from 'react'
import UsersTable from '../../Components/Admin/UsersTable'
import theusers from "../mock Data/usersMockData"
import styles from "./Manage.module.css"

function ManageUsers() {
    
    
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const filteredUsers = theusers.filter((user)=> {
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
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">In Active</option>
                </select>
            </div>
        </div>
        {filteredUsers.length > 0 ? (
            <div className={styles.Active}>
                <UsersTable Users={filteredUsers} />
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