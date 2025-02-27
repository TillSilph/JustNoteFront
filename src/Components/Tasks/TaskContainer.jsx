import { useQuery } from 'react-query';
import Task from './Task';
import './Task.css';
import { getNotes } from '../../API/queries';
import Loading from '../Loading/Loading';
import PlusSVG from '../SVG/plus';
import { useModal } from '../../hooks/ModalProviders';

const TaskContainer = ({activeNav}) => {
    const { data, isError, isLoading } = useQuery('notes', getNotes, {refetchOnWindowFocus:false});
    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal();
    };
    return (
        <div className="taskContainer" style={{ height: isLoading ? '100vh' : 'fit-content' }}>
            {isLoading ? <Loading /> : data?.[activeNav == "complete"?"completed":"inWork"].map((el) => <Task data={el} key={el.id} />)}
            <button id="addNote" onClick={handleOpenModal}>
                <PlusSVG width={'50px'} height={'50px'} />
            </button>
        </div>
    );
};

export default TaskContainer;
