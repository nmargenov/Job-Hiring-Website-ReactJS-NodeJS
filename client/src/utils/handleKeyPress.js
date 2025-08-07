export const handleKeyPress = (e, onClick) => {
        if (e.key === "Enter" || e.key===" ") {
            onClick();
        }
    };