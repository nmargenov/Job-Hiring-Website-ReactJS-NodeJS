import { useEffect, useState } from 'react';
import { File } from './File/File';
import styles from './files.module.css';
import { getAllFiles } from '../../services/userService';
import { Loader } from '../shared/Loader/Loader';
import { UploadFile } from './UploadFile/UploadFile';
import { useTranslation } from 'react-i18next';

export const Files = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        getAllFiles()
            .then((data) => {
                setFiles(data);
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
            })
    }, [])
    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && <div className={styles["files-main-div"]}>
                <h1>{t('my-files')}</h1>
                <div className={styles['actions-div']}>
                    <span>{t('my-files-description')}</span>
                    <div className={styles['button-div']}>
                        <UploadFile setFiles={setFiles} />
                    </div>
                </div>
                {!files || files.length === 0 &&
                    <div className={styles['no-files-div']}>
                        <h2>You do not have any files uploaded</h2>
                    </div>
                }
                {files?.length > 0 && 
                <div className={styles['files-div']}>
                    {files.map((file) => (
                        <File key={file._id} file={file} />
                    ))}
                </div>}
            </div>}
        </>
    )
}