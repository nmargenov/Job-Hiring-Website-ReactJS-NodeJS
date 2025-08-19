import { useState } from "react"
import { AdminList } from "./AdminList/AdminList";

export const ReviewAdmins = () => {

    const [state, setState] = useState('admins');

    return (
        <>
            <h1>Review admins</h1>
            <AdminList />
        </>
    )
}