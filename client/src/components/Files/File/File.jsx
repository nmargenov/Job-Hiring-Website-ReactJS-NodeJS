import { use, useState } from 'react';
import { formatDate } from '../../../utils/dateFormat';
import { handleKeyPress } from '../../../utils/handleKeyPress';
import styles from './file.module.css';
import { deleteFile } from '../../../services/userService';
import { Loader } from '../../shared/Loader/Loader';

export const File = ({ file, showAction = true, setFiles }) => {
    const [showDelete, setShowDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getIconByType = (type) => {
        switch (type) {
            case 'application/pdf':
                return 'images/pdf.png';
            case 'application/msword':
                return 'images/msword.png';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'images/msword.png';
            default:
                return '';
        }
    };
    const openInNewTab = () => {
        const url = file.url;
        if (!file.url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    function onDeleteClick(e) {
        e.stopPropagation();
        setShowDelete(true);
    }

    function onDeleteCancel(e) {
        if (isLoading) return;
        e.stopPropagation();
        setShowDelete(false);
    }

    function onDeleteAccept(e) {
        if (isLoading) return;
        e.stopPropagation();
        setIsLoading(true);
        deleteFile(file._id)
            .then((data) => {
                setFiles(data);
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
            })
    }

    return (
        <div onKeyDown={(e) => handleKeyPress(e, openInNewTab)} tabIndex={showAction ? 0 : null} className={styles['file']}>
            <div className={styles['image-div']}>
                <img src={getIconByType(file.type)} alt="file icon" />
            </div>
            <div onClick={openInNewTab} className={styles['information-div']}>
                <span className={styles['date']}>{formatDate(file.uploadedAt)}</span>
                <span className={styles['name']}>{file.originalName}</span>
            </div>
            {showAction &&
                <div className={styles['actions-div']}>
                    {!showDelete && <i onKeyDown={(e) => { handleKeyPress(e, onDeleteClick) }} tabIndex={0} onClick={onDeleteClick} className="material-icons secondary-text" role="button">delete</i>}
                    {showDelete && !isLoading &&
                        <>
                            <i onKeyDown={(e) => { handleKeyPress(e, onDeleteCancel) }} tabIndex={0} onClick={onDeleteCancel} className="material-icons secondary-text" role="button">cancel</i>
                            <i onKeyDown={(e) => { handleKeyPress(e, onDeleteAccept) }} tabIndex={0} onClick={onDeleteAccept} className="material-icons secondary-text" role="button">check</i>
                        </>}
                    {isLoading && <Loader smaller={true} />}
                </div>}
        </div>
    )
}