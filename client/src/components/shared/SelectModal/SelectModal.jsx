import { useState } from "react"
import styles from "./selectModal.module.css";
import { Modal } from "./Modal/Modal";
import { handleKeyPress } from "../../../utils/handleKeyPress";
import { useTranslation } from "react-i18next";

export const SelectModal = ({ title, selectItem, removeItem, selectedItems, setSelectedItems, items, setItems, disabled }) => {
    const [selectOpen, setSelectOpen] = useState(false);

    const { t } = useTranslation();

    function toggleOpen() {
        setSelectOpen(prev => !prev);
    }

    function onClick(e) {
        e.stopPropagation();
        removeItem(e, setItems, setSelectedItems);
    }

    function onKey(e) {
        if (e.key === "Enter" || e.key === " ") {
            removeItem(e, setItems, setSelectedItems);
        }
    }

    return (
        <>
            <div id={disabled === true ? styles["disabled"] : ""} onKeyDown={(e) => { handleKeyPress(e, toggleOpen) }}
                {...(!disabled && { tabIndex: 0 })}
                {...(!disabled && { onClick: toggleOpen })}
                className={styles['main-div']}>
                {selectedItems.length === 0 && <span>{t(title)}</span>}
                {selectedItems.length > 0 &&
                    selectedItems.map(item => {
                        return (<p id={item} key={item}
                            {...(!disabled && { onClick: (e) => onClick(e) })}
                            className={`${styles['item']} ${disabled ? styles['disabled'] : ''}`}
                        >{t(item)} <i id={item} {...(!disabled && { tabIndex: 0 })} onKeyDown={(e) => { onKey(e) }} className="material-icons">close</i></p>)
                    })
                }
            </div>
            {selectOpen && <Modal title={title} selectItem={selectItem} removeItem={removeItem} items={items} setItems={setItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} toggleOpen={toggleOpen} />}
        </>
    )
}