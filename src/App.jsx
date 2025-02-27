import { useState } from 'react';
import './App.css';
import NavBar from './Components/navButton/NavBar';
import Task from './Components/Tasks/Task';
import TaskContainer from './Components/Tasks/TaskContainer';
import { ModalProvider } from './hooks/ModalProviders';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import NotificationComponent from './Components/notification';
import { Toaster } from 'react-hot-toast';

function App() {
    dayjs.extend(customParseFormat);
    const [activeNav, setActiveNav] = useState("current");

    return (
        <ModalProvider>
            <div className="mainContainer">
                <NavBar activeNav={activeNav} setActiveNav={setActiveNav}/>
                <TaskContainer activeNav={activeNav}/>
            </div>
            <NotificationComponent/>
            <Toaster />
        </ModalProvider>
    );
}

export default App;
