import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppSelector } from "../redux/stores/store";

// interface Props {
//     roles?: string[];
// }

export default function RequireAuth() {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();
    if (!user) {
        toast.error('You need to be logged in to do that!');
        return <Navigate to='/login' state={{from: location}} />
    }
    return <Outlet/>
}