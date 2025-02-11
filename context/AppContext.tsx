import { AppContextType, Trackers,  } from '@/assets/types';
import React, { createContext, useContext, useState } from 'react';


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [Trackers, setTrackers] = useState<Wallet[]>([]);
   

    return (
        <AppContext.Provider value={{ Trackers, setTrackers }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
