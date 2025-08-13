import { useEffect, useState } from 'react';
import { File } from './File/File';
import styles from './files.module.css';
import { getAllFiles } from '../../services/userService';
import { Loader } from '../shared/Loader/Loader';
import { UploadFile } from './UploadFile/UploadFile';
import { useTranslation } from 'react-i18next';
import { Page404 } from '../Page404/Page404';

export const Files = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();
    const [error, setError] = useEffect(false);

    useEffect(() => {
        setIsLoading(true);
        getAllFiles()
            .then((data) => {
                setFiles(data);
                setIsLoading(false);
                setError(false);
            }).catch((err) => {
                setIsLoading(false);
                setError(true);
            })
    }, [])
    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && !error && <div className={styles["files-main-div"]}>
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
                            <File setFiles={setFiles} key={file._id} file={file} />
                        ))}
                    </div>}
            </div>}
            {!isLoading && error && <Page404 errorLoading={true}/>}
        </>
    )
}