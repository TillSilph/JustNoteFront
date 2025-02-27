import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_NOTIFICATION_URL??'http://localhost:5090');

const NotificationComponent = () => {
    useEffect(() => {
        if (Notification.permission !== 'granted') return Notification.requestPermission();

        socket.on('notification', (data) => {
            try{
                const audio = new Audio('/sound.wav'); 
                audio.play();
                toast(`Уведомление! ${data.title}`, {
                    duration: 9000,
                    position: 'top-center',
                });
            }catch(err){
                toast.error("Пришло неизвестное уведомление...")
                console.error(err);
            }
           
        });

        return () => {
            socket.off('notification');
        };
    }, []);

    return <div style={{ display: 'none' }}>Notification</div>;
};

export default NotificationComponent;
