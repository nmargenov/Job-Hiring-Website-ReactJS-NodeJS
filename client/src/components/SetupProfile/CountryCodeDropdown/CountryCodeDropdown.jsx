import { useState } from "react";
import styles from "./countryCodeDropdown.module.css";

export const CountryCodeDropdown = ({ selected, setSelected, countries }) => {


    const [open, setOpen] = useState(false);

    const handleSelect = (country) => {
        setSelected(country);
        setOpen(false);
    };
    return (
        <div className={styles["dropdown-container"]}>
            <span onSubmit={(e)=>{e.preventDefault()}}
                className={styles["dropdown-btn"]}
                onClick={() => setOpen(!open)}
            >
                <span className={styles["dropdown-selected"]}>
                    <img
                        src={`https://flagcdn.com/w20/${selected.flag}.png`}
                        alt={selected.name}
                        className={styles["flag-icon"]}
                    />
                    <span className={styles['code']}>
                        ({selected.code})
                    </span>
                </span>
                <span className={styles["arrow"]}>▼</span>
            </span>

            {open && (
                <div className={styles["dropdown-menu"]}>
                    {countries.map((country) => (
                        <div
                            key={country.code}
                            onClick={() => handleSelect(country)}
                            className={styles["dropdown-item"]}
                        >
                            <img
                                src={`https://flagcdn.com/w20/${country.flag}.png`}
                                alt={country.name}
                                className={styles["flag-icon"]}
                            />
                            {country.name} ({country.code})
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}