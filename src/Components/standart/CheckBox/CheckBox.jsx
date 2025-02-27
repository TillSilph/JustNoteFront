import './CheckBox.css';

const CheckBox = ({ checked, onChange }) => {
    return (
        <label className="custom-checkbox">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <span className="checkmark"></span>
        </label>
    );
};

export default CheckBox;
