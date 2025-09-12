import styles from './jobBusinessInfo.module.css';

export const JobBusinessInfo = () => {
    return (
        <div className={styles['main-div']}>
            <span className={styles['date']}>11.09.2025</span>
            <div className={styles['info-div']}>
                <div className={styles['title']}>Junior Full Stack Developer (GovTech Sphere), Coherent Solutions EOOD</div>
                <div className={styles['location']}><i className="material-icons secondary-text">location_on</i> Plovdiv</div>
                              <div className={styles['salary']}><i className="material-icons secondary-text">chair</i>Възможност за работа от вкъщи</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">public</i>Изцяло дистанционна работа</div>
                <div className={styles['experience']}><i className="material-icons secondary-text">psychology</i>Години опит <strong>от 1 до 2</strong></div>
                <div className={styles['salary']}><i className="material-icons secondary-text">paid</i>Заплата <strong>1500-2500лв.</strong></div>
                <div className={styles['salary']}><i className="material-icons secondary-text">stairs</i>Ниво <strong>Mid-level, Senior-level</strong></div>
                <div className={styles['salary']}><i className="material-icons secondary-text">work</i>Постоянна работа</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">schedule</i>Пълно работно време</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">history_toggle_off</i>Гъвкаво работно време</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">beach_access</i>Отпуск от 20 до 25 дни</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">language</i>Английски,Български</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">3p</i>Дистанционно интервю</div>
                <div className={styles['salary']}><i className="material-icons secondary-text">moving</i>Подходяща и за кандидати с малък или без опит</div>

            </div>
        </div>
    )
}