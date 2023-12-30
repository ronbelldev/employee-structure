import React, { useState } from 'react'
import './index.scss'

const EmployeeBio = ({ bio, onBioChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState(bio);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onBioChange(editedBio);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedBio(bio);
        setIsEditing(false);
    };

    return (
        <div className='employee-details-bio'>
            {isEditing ? (
                <>
          <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
          />
                    <div>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div>{bio}</div>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default EmployeeBio
