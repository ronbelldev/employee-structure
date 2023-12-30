import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import EmployeeSummary from '../EmployeeSummary';
import './index.scss';
import { getButtonsProps, onToggleIsEditing } from './utils';
import EditableField from '../EditableField'

const EmployeeDetails = ({ employee = {}, onDeleteEmployee, onEdit, onSave, onEditField }) => {
    const [isEditing, setIsEditing] = useState(false);
    // const [editedEmployee, setEditedEmployee] = useState({ ...employee });
    const [editedValues, setEditedValues] = useState()

    const onClickSave = () => {
        onSave(editedValues);
        setIsEditing(false);
    };
    console.log("editedValues: ", editedValues)
    // const onInputChange = (field, value) => {
    //     setEditedEmployee((prev) => ({ ...prev, [field]: value }));
    // };

    const callbacks = isEditing
        ? [onToggleIsEditing(setIsEditing, true), onClickSave]
        : [onDeleteEmployee, onToggleIsEditing(setIsEditing)];

    const [buttonProps, setButtonProps] = useState(getButtonsProps(isEditing, callbacks));

    useEffect(() => {
        setButtonProps(getButtonsProps(isEditing, callbacks));
    }, [employee, isEditing, editedValues]);
    // console.log("editedValues: ", editedValues)
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
