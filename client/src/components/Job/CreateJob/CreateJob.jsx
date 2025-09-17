import { useForm } from '../../../hooks/useForm';
import styles from './createJob.module.css';
import { useTranslation } from 'react-i18next';
import { Form } from '../../shared/Form/Form';
import { FormInput } from '../../shared/FormInput/FormInput';
import { FormTextArea } from '../../shared/FormTextArea/FormTextArea';
import { createJob } from '../../../services/jobService';
import { useNavigate } from "react-router";
import { ToggleSwitchForm } from '../../shared/ToggleSwitchForm/ToggleSwitchForm';
import { SelectModal } from '../../shared/SelectModal/SelectModal';
import { useState } from 'react';

export const CreateJob = () => {
    const initialValues = {
        title: '',
        description: '',
        salary: '',
        location: '',
        experience: '',
        vacation: '',
        fullyRemote: false,
        homeWork: false,
        allTimeWork: false,
        fullTime: false,
        flexibleTime: false,
        remoteInterview: false,
        suitsNoExperience: false,
    }

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [languages, setLanguages] = useState([
        "arabic",
        "bulgarian",
        "chinese",
        "english",
        "french",
        "german",
        "italian",
        "japanese",
        "russian",
        "spanish"
    ]);
    const [selectedTech, setSelectedTech] = useState([]);
    const [tech, setTech] = useState([
        "angular",
        "aws",
        "azure",
        "csharp",
        "c++",
        "django",
        "docker",
        "flask",
        "flutter",
        "gcp",
        "go",
        "graphql",
        "java",
        "javascript",
        "kotlin",
        "kubernetes",
        "laravel",
        "mongodb",
        "mysql",
        "nextjs",
        "nodejs",
        "nuxtjs",
        "php",
        "postgresql",
        "python",
        "reactjs",
        "redis",
        "rubyonrails",
        "rust",
        "spring",
        "sql",
        "swift",
        "symfony",
        "typescript",
        "vuejs"]);

    const [selectedLevel, setSelectedLevel] = useState([]);
    const [level, setLevel] = useState(['entry-level', "junior-level", "mid-level", "senior-level", "management"]);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { values, setValues, onInputChange, onCheckboxChange, onSubmitHandler, isLoading, setIsLoading, errorMsg, setErrorMsg } = useForm(initialValues);

    function selectItem(e, setItems, SetSelectedItems) {
        SetSelectedItems(prev => [...prev, e.target.id].sort((a, b) => a.localeCompare(b)));
        setItems(prev => prev.filter(item => item !== e.target.id));
    }

    function removeItem(e, setItems, SetSelectedItems) {
        setItems(prev => [...prev, e.target.id].sort((a, b) => a.localeCompare(b)));
        SetSelectedItems(prev => prev.filter(item => item !== e.target.id));
    }
    
    function onSubmit(e) {
        onSubmitHandler(e);
        setIsLoading(true);
        createJob(values.title,
            values.description,
            values.salary,
            values.location,
            values.experience,
            values.vacation,
            values.fullyRemote,
            values.homeWork,
            values.allTimeWork,
            values.fullTime,
            values.flexibleTime,
            values.remoteInterview,
            values.suitsNoExperience,
            selectedLanguages,
            selectedTech,
            selectedLevel
        )
            .then((data) => {
                setIsLoading(false);
                navigate(`/jobs/${data._id}`);
            }).catch((err) => {
                setIsLoading(false);
            })
    }
    return (
        <div className={styles['apply-main-div']}>
            <h2>{t('create-job')}</h2>
            <span>{t('business-apply-description')}</span>
            <Form onSubmit={onSubmit}
                errorMsg={errorMsg}
                buttons={
                    <input type='submit' disabled={isLoading || values.title.length < 5 || values.description.length < 50} value={t('create')} />
                }
            >
                <FormInput
                    formName={'title'}
                    value={values.title}
                    onInputChange={onInputChange}
                    type={'text'}
                    minLength={'5'}
                    maxLength={'150'}
                    validate={values.title.length > 0 && values.title.length < 5}
                    isLoading={isLoading}
                />
                <FormTextArea
                    name={'description'}
                    value={values.description}
                    onInputChange={onInputChange}
                    minLength={'50'}
                    maxLength={'1500'}
                    validate={values.description.length > 0 && values.description.length < 50}
                    isLoading={isLoading}
                />
                <div className={styles['smaller-div']}>
                    <FormInput
                        formName={'salary'}
                        value={values.salary}
                        onInputChange={onInputChange}
                        type={'text'}
                        required={false}
                        isLoading={isLoading}
                    />
                    <FormInput
                        formName={'location'}
                        value={values.location}
                        onInputChange={onInputChange}
                        type={'text'}
                        validate={null}
                        required={false}
                        isLoading={isLoading}
                    />
                    <FormInput
                        formName={'experience'}
                        value={values.experience}
                        onInputChange={onInputChange}
                        required={false}
                        type={'text'}
                        isLoading={isLoading}
                    />
                </div>
                <FormInput
                    formName={'vacation'}
                    value={values.vacation}
                    onInputChange={onInputChange}
                    required={false}
                    type={'text'}
                    isLoading={isLoading}
                />
                <SelectModal title={'languages'} selectItem={selectItem} removeItem={removeItem} items={languages} setItems={setLanguages} selectedItems={selectedLanguages} setSelectedItems={setSelectedLanguages} />
                <SelectModal title={'tech'} selectItem={selectItem} removeItem={removeItem} items={tech} setItems={setTech} selectedItems={selectedTech} setSelectedItems={setSelectedTech} />
                <SelectModal title={'level'} selectItem={selectItem} removeItem={removeItem} items={level} setItems={setLevel} selectedItems={selectedLevel} setSelectedItems={setSelectedLevel} />
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="fullyRemote" check={values.fullyRemote} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">public</i><label htmlFor="fullyRemote">{t("fullyRemote")}</label>
                </div>
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="homeWork" check={values.homeWork} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">chair</i><label htmlFor="homeWork">{t("homeWork")}</label>
                </div>
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="allTimeWork" check={values.allTimeWork} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">work</i><label htmlFor="allTimeWork">{t("allTimeWork")}</label>
                </div>
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="fullTime" check={values.fullTime} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">schedule</i><label htmlFor="fullTime">{t("fullTime")}</label>
                </div>
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="flexibleTime" check={values.flexibleTime} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">history_toggle_off</i><label htmlFor="flexibleTime">{t("flexibleTime")}</label>
                </div>
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="remoteInterview" check={values.remoteInterview} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">3p</i><label htmlFor="remoteInterview">{t("remoteInterview")}</label>
                </div>
                <div className={styles['checkbox-div']}>
                    <ToggleSwitchForm name="suitsNoExperience" check={values.suitsNoExperience} action={onCheckboxChange} />
                    <i className="material-icons secondary-text">moving</i><label htmlFor="suitsNoExperience">{t("suitsNoExperience")}</label>
                </div>
            </Form>
        </div>
    )
}