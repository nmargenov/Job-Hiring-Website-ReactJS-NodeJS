import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./profilePictureUpload.module.css";
import { useRef, useState } from "react";
import { PreviewPicture } from "./PreviewPicture/PreviewPicture"
import { useTranslation } from "react-i18next";
import { deleteProfilePicture } from "../../../../services/userService";
import { useAuth } from '../../../../contexts/AuthContext'

export const ProfilePictureUpload = ({ user }) => {

    const { t } = useTranslation();

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [action, setAction] = useState(false);
    const [showAcceptDelete, setShowAcceptDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef();
    const { loginAuthContext } = useAuth();

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
        if (isLoading) return;

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
        if (isLoading) return;
        setShowAcceptDelete(false);
    }

    function onModalClick() {
        if (isLoading) return;
        setShowAcceptDelete(false);
        setAction(false);
    }

    function onDeleteAccept() {
        if (isLoading) return;
        setIsLoading(true);
        deleteProfilePicture()
            .then((data) => {
                loginAuthContext(data);
            }).catch((err) => {

            })
    }

    const handleKeyPress = (e, onClick) => {
        if (e.key === "Enter") {
            onClick();
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
                    <div className={styles[`${isLoading ? 'disabled' : ''}`]} tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onDeleteDecline) }} onClick={onDeleteDecline}>
                        <i className="material-icons">close</i>
                        <span>{t('no')}</span>
                    </div>
                    <div className={styles[`${isLoading ? 'disabled' : ''}`]} tabIndex={0} onKeyDown={(e) => { handleKeyPress(e, onDeleteAccept) }} onClick={onDeleteAccept}>
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
            <input className={styles['file-input']} onChange={onFileInputChange} ref={fileInputRef} type='file' accept='image/*'></input>
            {preview && <PreviewPicture setIsLoading={setIsLoading} isLoading={isLoading} file={selectedFile} onClose={onClose} preview={preview} />}
        </>
    )
}