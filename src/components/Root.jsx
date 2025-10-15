import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Root = () => {
    return (
        <div>
            <header>
               <NavigationBar/>
            </header>
            <main className='min-h-[calc(100vh-314px)]'>
                <Outlet/>
            </main>
            <footer>
               <Footer/>
            </footer>
        </div>
    );
};

export default Root;