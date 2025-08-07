import { useRef, useState } from "react";
import { saveFile } from "../../../services/userService";
import styles from './uploadFile.module.css';
import { File } from "../File/File";
import { Form } from "../../shared/Form/Form";
import { useTranslation } from "react-i18next";

export const UploadFile = ({ setFiles }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { t } = useTranslation();

    function onFileChange(e) {
        const file = e.target.files[0];
        file.uploadedAt = new Date();
        file.originalName = file.name;
        setSelectedFile(file);
        e.target.value = '';
    }
    function onClick() {
        const formData = new FormData();
        formData.append('file', selectedFile);
        setIsLoading(true);
        saveFile(formData)
            .then((data) => {
                setFiles(data);
                setSelectedFile(null);
                setErrorMsg('');
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.message);
            })
    }

    function onCancel() {
        setSelectedFile(null);
        setErrorMsg('');
    }
    return (
        <>
            <>
                <input disabled={isLoading} type="file" ref={fileInputRef} accept=".pdf, .doc, .docx" onChange={onFileChange} />
                <input disabled={isLoading} onClick={() => fileInputRef.current.click()} type="submit" value={selectedFile ? t('cv-change') : t('cv-upload')} />
            </>
            {selectedFile &&
                <div className={styles['upload-div']}>
                    <File setFiles={setFiles} showAction={false} file={selectedFile} />
                    <Form
                        errorMsg={errorMsg}
                        buttons={
                            <>
                                <button disabled={isLoading} className={styles['design-button']} onClick={onCancel}>{t('cancel')}</button>
                                <input disabled={isLoading} onClick={onClick} type="submit" value={t('save')} />
                            </>
                        }
                    >
                    </Form>
                </div>
            }
        </>
    )
}