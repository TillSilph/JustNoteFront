import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { useMutation, useQueryClient } from 'react-query';
import { editNote, makeNote } from '../../API/queries';
import dayjs from 'dayjs';
import Loading from '../Loading/Loading';
import DateTimePicker from './date';
import CheckBox from '../standart/CheckBox/CheckBox';
import toast from 'react-hot-toast';

const Modal = ({ isOpen, onClose, data }) => {
    const queryClient = useQueryClient();
    const titleRef = useRef();
    const descRef = useRef();
    const [saveState, setSaveState] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        if (isOpen) {
            if(data?.notificationTime){
                setSelectedDate(new Date(+data.notificationTime))
                setIsChecked(!!data.notificationTime)
            }
            setTitle(data?.title || '');
            setDescription(data?.description || '');
        }
    }, [isOpen, data]);

    const closeModal = () => {
        if (saveState) return;
        onClose();
    };
    const createNoteMutation = useMutation(makeNote, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('notes');
            setSaveState(false);
            onClose();
        },
        onError: (error) => {
            console.error('Ошибка при создании элемента:', error);
            toast.error("Произошла ошибка")
            setSaveState(false);
            onClose();
        },
    });
    const editNoteMutation = useMutation(editNote, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('notes');
            setSaveState(false);
            onClose();
        },
        onError: (error) => {
            console.error('Ошибка при создании элемента:', error);
            toast.error("Произошла ошибка")
            setSaveState(false);
            onClose();
        },
    });
    function handleSubmit() {
        if (!titleRef.current.value.trim()) return;
        if (!descRef.current.value.trim()) return;
        if (saveState) return;
        setSaveState(true);
        if (data?.id) {
            return editNoteMutation.mutate({
                id: data.id,
                title: titleRef.current.value,
                description: descRef.current.value,
                notificationTime: isChecked?""+selectedDate.getTime():null,
                completed: false,
            });
        }
        createNoteMutation.mutate({
            title: titleRef.current.value,
            description: descRef.current.value,
            date: dayjs(Date.now()).toISOString(),
            notificationTime: isChecked?""+selectedDate.getTime():null,
            completed: false,
        });
    }
    return ReactDOM.createPortal(
        isOpen ? (
            <div className="modalContainer">
                <div className="modalContent">
                    <span>Заголовок</span>
                    <input
                        ref={titleRef}
                        type="text"
                        className="modalInput"
                        placeholder="Введите название..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <span>Описание</span>
                    <textarea
                        ref={descRef}
                        type="text"
                        className="modalInput"
                        style={{ flexGrow: 1 }}
                        placeholder="Введите описание..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <span style={{ gap: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Дата и Время <CheckBox checked={isChecked} onChange={setIsChecked} />
                    </span>
                    {isChecked ? <DateTimePicker handler={handleDateChange} selectedDate={selectedDate} /> : ''}
                    <button onClick={handleSubmit} className="modalBtn">
                        {saveState ? <Loading /> : 'Сохранить'}
                    </button>
                </div>

                <div className="modalOverlay" onClick={closeModal} />
            </div>
        ) : null,
        document.body,
    );
};

export default Modal;
