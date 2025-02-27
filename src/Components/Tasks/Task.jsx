import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { useModal } from '../../hooks/ModalProviders';
import CheckSvg from '../SVG/Check';
import DeleteSVG from '../SVG/delete';
import EditSVG from '../SVG/edit';
import { deleteNote, editNote } from '../../API/queries';
import { useState } from 'react';
import Loading from '../Loading/Loading';
import dayjs from 'dayjs';
import CrossSVG from '../SVG/Cross';

const Task = ({ data }) => {
    const { openModal } = useModal();
    const [load, setLoad] = useState(false);
    const queryClient = useQueryClient();

    const deleteNoteMutation = useMutation(deleteNote, {
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        },
    });
    const editNoteMutation = useMutation(editNote, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('notes');
        },
    });
    const handleEdit = () => {
        openModal(data);
    };
    const handleDelete = () => {
        setLoad(true);
        deleteNoteMutation.mutate({
            id: data.id,
        });
    };
    const handleComplete = () => {
        editNoteMutation.mutate({ ...data, completed: !data.completed });
    };
    return (
        <div className="task">
            {load ? <Loading width="50px" height="50px" /> : data.title}
            {load ? null : (
                <div className="taskControlsContainer">
                    <button className="taskControl" onClick={handleComplete}>
                        {data.completed ? <CrossSVG width="20px" height="20px" /> : <CheckSvg width="20px" height="20px" />}
                    </button>
                    <button className="taskControl" onClick={handleEdit}>
                        <EditSVG width="20px" height="20px" />
                    </button>
                    <button className="taskControl" onClick={handleDelete}>
                        <DeleteSVG width="20px" height="20px" />
                    </button>
                </div>
            )}
            <div className="dateStamp">{dayjs(data.date).format('DD.MM.YY HH:mm')}</div>
        </div>
    );
};

export default Task;
