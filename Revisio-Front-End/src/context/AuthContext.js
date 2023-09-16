import { createContext,useLayoutEffect, useContext,useState, useEffect, useReducer } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('useAuthContext must be used inside an Provider');
    }
    return context;
}

// export const authReducer = (state,action) => {
//     switch(action.type) {
//         case 'LOGIN':
//             return { user: action.payload }
//         case 'LOGOUT':
//             return { user: null }
//         default:
//             return state;
//     }
// }

export const AuthContextProvider = (props) => {
    // const [state,dispatch] = useReducer(authReducer,{
    //     user:null
    // });
    // console.log('AuthContext State: ',state);

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));

    function login(userData) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
    }

    useLayoutEffect(()=>{ 
        const user = JSON.parse(localStorage.getItem('user'));
        if( user ) {
            login(user);
        }
    },[])

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}