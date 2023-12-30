import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import EmployeeSummary from '../EmployeeSummary';
import { getButtonsProps, onToggleIsEditing } from './utils';
import EditableField from '../EditableField'
import './index.scss';

const EmployeeDetails = ({ selectedEmployee,  employee = {}, onDeleteEmployee, onEdit, onSave, onEditField }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValues, setEditedValues] = useState()

    const onClickSave = () => {
        onSave(editedValues);
        setIsEditing(false);
    };

    const callbacks = isEditing
        ? [onToggleIsEditing(setIsEditing, true), onClickSave]
        : [onDeleteEmployee, onToggleIsEditing(setIsEditing)];

    const [buttonProps, setButtonProps] = useState(getButtonsProps(isEditing, callbacks));

    useEffect(() => {
        setButtonProps(getButtonsProps(isEditing, callbacks));
    }, [selectedEmployee, employee, isEditing, editedValues]);

    return (
        <div className='employee-details'>
            <div className='employee-details-data'>
                <EmployeeSummary
                    {...employee}
                    isBig
                    setEditedValues={setEditedValues}
                    editedValues={editedValues}
                    isEditing={isEditing}
                />
                    <EditableField
                        value={editedValues?.bio || employee.bio}
                        isEditing={isEditing}
                        onInputChange={newBio => setEditedValues({ ...(editedValues || {}), bio: newBio })}
                        placeholder='Bio'
                    >
                        <div className='employee-details-bio'>
                            {employee.bio}
                        </div>
                    </EditableField>
            </div>
            <Footer buttons={buttonProps} />
        </div>
    );
};

export default EmployeeDetails;
