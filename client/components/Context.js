import React from "react";

const myContext = React.createContext();

const AppProvider = ({children})  => {
    const [isLogged, setIsLogged] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [services, setServices] = React.useState({});

    function exportServices(data) {
        setServices(data);
    }

    function exportIsLogged(data) {
        setIsLogged(data);
    }
    
    function exportUser(data) {
        setUser(data);
    }

    return (
        <myContext.Provider value={{
            isLogged,
            exportIsLogged,
            user,
            exportUser,
            services,
            exportServices,
          }}>
            {children}
        </myContext.Provider>
    );
}
export {AppProvider};
export const useCtx = () => React.useContext(myContext);