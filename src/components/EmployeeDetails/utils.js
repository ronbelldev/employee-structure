export const onToggleIsEditing = (setIsEditing, isEditing) => () => setIsEditing(!isEditing)

export const getButtonsProps = (isEditing, callbacks = []) =>
    isEditing
        ? [
            {
                text: 'Cancel',
                onClick: callbacks[0]
            },
            {
                text: 'Save',
                onClick: callbacks[1]
            }
        ]
        : [
            {
                text: 'Delete',
                onClick: callbacks[0]
            },
            {
                text: 'Edit',
                onClick: callbacks[1]
            }]
