import { useState } from 'react';
import styles from './modal.module.css';
import { handleKeyPress } from '../../../../utils/handleKeyPress';
import { useTranslation } from 'react-i18next';

export const Modal = ({ toggleOpen, title,selectItem,removeItem, selectedItems, setSelectedItems, items, setItems }) => {
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(styles.opacity)) {
            toggleOpen();
        }
    };

    const {t} = useTranslation();

    const [preview, setPreview] = useState([]);

    function onSubmitClick(e) {
        e.preventDefault();
        toggleOpen();
    }

    function onKeyDownSelected(e){
        removeItem(e, setItems, setSelectedItems);
    }
    function onKeyDownSelect(e){
        selectItem(e, setItems, setSelectedItems);
    }
    function onArrowClick(e){
        toggleOpen();
    }

    return (
        <div className={styles["main"]}>
            <div
                onClick={handleOutsideClick}
                tabIndex={0} className={styles["opacity"]}>
            </div>
            <div className={styles['modal']}>
                <div className={styles['title-div']}>
                    <i tabIndex={0} onKeyDown={(e)=>{handleKeyPress(e,toggleOpen)}} onClick={toggleOpen} className='material-icons'>arrow_back</i>
                    <span>{t(title)}</span>
                </div>
                <div className={styles['selected-items']}>
                    {selectedItems.map(item => {
                        return (<span id={item} onClick={(e) => { removeItem(e,setItems,setSelectedItems) }} key={item} className={styles['item']}>{t(item)}<i tabIndex={0} onKeyDown={(e)=>{handleKeyPress(e,onKeyDownSelected)}} id={item} className="material-icons">close</i></span>)
                    })}
                </div>
                <div className={styles['items-div']}>
                    {items.map(item => {
                        return (<span tabIndex={0} onKeyDown={(e)=>{handleKeyPress(e,onKeyDownSelect)}} id={item} onClick={(e) => { selectItem(e,setItems,setSelectedItems) }} key={item} className={styles['item']}>{t(item)}</span>)
                    })}
                
                </div>
                <div className={styles['button']}>
                    <input disabled={selectedItems.length === 0} onClick={onSubmitClick} type="submit" value={t('save')} />
                </div>
            </div>
        </div>
    )
}