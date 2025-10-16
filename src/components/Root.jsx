import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Root = () => {
    return (
        <div className='' >
            <header className=''>
               <NavigationBar/>
            </header>
            <main className='max-w-7xl mx-auto px-4 mx-auto mt-14 md:mt-17  min-h-[calc(100vh-314px)]'>
                <Outlet/>
            </main>
            <footer>
               <Footer/>
            </footer>
        </div>
    );
};

export default Root;