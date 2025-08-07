
import { formatDate } from '../../../utils/dateFormat';
import { handleKeyPress } from '../../../utils/handleKeyPress';
import styles from './file.module.css';

export const File = ({ file, showAction = true }) => {
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
        if(!file.url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div onKeyDown={(e)=>handleKeyPress(e,openInNewTab)} tabIndex={showAction ? 0 : null} className={styles['file']}>
            <div className={styles['image-div']}>
                <img src={getIconByType(file.type)} alt="file icon" />
            </div>
            <div onClick={openInNewTab} className={styles['information-div']}>
                <span className={styles['date']}>{formatDate(file.uploadedAt)}</span>
                <span className={styles['name']}>{file.originalName}</span>
            </div>
            {showAction && <div className={styles['actions-div']}>
                <i className="material-icons secondary-text" role="button">more_vert</i>
            </div>}
        </div>
    )
}