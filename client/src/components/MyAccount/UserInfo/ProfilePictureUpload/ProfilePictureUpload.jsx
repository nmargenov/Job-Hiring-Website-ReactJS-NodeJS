import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./profilePictureUpload.module.css";
import { useRef, useState } from "react";
import { PreviewPicture } from "./PreviewPicture/PreviewPicture";
import { useTranslation } from "react-i18next";

export const ProfilePictureUpload = ({ user }) => {

    const { t } = useTranslation();

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [action, setAction] = useState(false);
    const [showAcceptDelete, setShowAcceptDelete] = useState(false);

    const fileInputRef = useRef();

    function onFileInputChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        setSelectedFile(file);
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onload = () => {
            setPreview(reader.result)
        };
        e.target.value = '';
    }

    function onClose() {
        setPreview(null);
        setSelectedFile(null);
    }

    function onCameraClick() {
        if (!user.profilePicture) {
            fileInputRef.current.click()
        } else {
            setAction(true);
        }
    }

    function onPhotoDecline() {
        setAction(false);
    }

    function onUploadClick() {
        fileInputRef.current.click()
        setAction(false);
    }

    function onDeleteClick() {
        setShowAcceptDelete(true);
        setAction(false);
    }

    function onDeleteDecline() {
        setShowAcceptDelete(false);
    }

    function onModalClick() {
        setShowAcceptDelete(false);
        setAction(false);
    }

    const handleKeyPress = (e, onClick) => {
        if (e.key === "Enter") {
            onClick(event);
        }
    };

    return (
        <>
            <FontAwesomeIcon onClick={onCameraClick} onKeyDown={(e) => { handleKeyPress(e, onCameraClick) }} tabIndex={0} className={styles['camera']} icon={faCamera} />
            {(showAcceptDelete || action) && <div onClick={onModalClick} className={styles['modal']}></div>}
            {showAcceptDelete && <div className={styles['actions']}>
                <div className={styles['close-div']}><i onKeyDown={(e) => { handleKeyPress(e, onDeleteDecline) }} tabIndex={0} onClick={onDeleteDecline} className="material-icons">close</i></div>
                <span className={styles['text']}>{t('accept-delete-text')}</span>
                <div className={styles['buttons']}>
                    <div tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onDeleteDecline) }} onClick={onDeleteDecline}>
                        <i className="material-icons">close</i>
                        <span>{t('no')}</span>
                    </div>
                    <div tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onDeleteDecline) }} onClick={onDeleteDecline}>
                        <i className="material-icons">delete</i>
                        <span>{t('yes')}</span>
                    </div>
                </div>
            </div>}
            {action && <div className={styles['actions']}>
                <div className={styles['close-div']}><i onKeyDown={(e) => { handleKeyPress(e, onPhotoDecline) }} tabIndex={0} onClick={onPhotoDecline} className="material-icons">close</i></div>
                <span className={styles['text']}>{t('photo-text')}</span>
                <div className={styles['buttons']}>
                    <div tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onDeleteClick) }} onClick={onDeleteClick}>
                        <i className="material-icons">delete</i>
                        <span>{t('delete-photo')}</span>
                    </div>
                    <div tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onUploadClick) }} onClick={onUploadClick}>
                        <i className="material-icons">photo_camera</i>
                        <span>{t('change-photo')}</span>
                    </div>
                </div>
            </div>}
            <input onChange={onFileInputChange} ref={fileInputRef} type='file' accept='image/*'></input>
            {preview && <PreviewPicture file={selectedFile} onClose={onClose} preview={preview} />}
        </>
    )
}