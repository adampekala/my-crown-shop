import { createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../shop-data.js';
import { addColectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    categoriesMap: [],
    // setProducts: () => null
})

export const CategoriesContextProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(
        () => {
            const getCategoriesMap = async() => {
                const categoryMap = await getCategoriesAndDocuments();
                console.log(categoryMap);
                setCategoriesMap(categoryMap)
            }
            getCategoriesMap();
        }, []
    )
    
    // funkcja robocza do wpuszczenia danych do firebase
    // useEffect(()=>{
    //         addColectionAndDocuments("categories", SHOP_DATA);
    // }, [])
    
    const value = {categoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}