import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext({
    hasMore: true,
    setBusinesses: () => { },
    setHasMore: () => { },
    businesses: 0
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {

    const [hasMore, setHasMore] = useState(true);
    const [businesses, setBusinesses] = useState(0);


    const context = {

        hasMore,
        setBusinesses,
        setHasMore,
        businesses
    }

    return (
        <AdminContext.Provider value={context}>
            {children}
        </AdminContext.Provider>)
}