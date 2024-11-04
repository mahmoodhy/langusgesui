import React, { useState } from 'react';
import ContextMenu from './ContextMenu';

const RightClickArea = ({ children, onSearch }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedText, setSelectedText] = useState('');


    const menuItems = [
        { label: 'جستجوی معنی لغت : ', action: () => handleClickme() },
        {  },
    ];

    const handleContextMenu = (event) => {
       event.preventDefault();
        const selection = window.getSelection().toString();
        const hasOnlyEnglishCharacters = /^[A-Za-z0-9 ]+$/.test(selection);

        if (selection.trim() !== '' && hasOnlyEnglishCharacters) {

            setSelectedText(selection);
            if (window.innerWidth - event.pageX  < 200)
                setMenuPosition({ x: event.pageX -  200, y: event.pageY });
            else
                setMenuPosition({ x: event.pageX, y: event.pageY });
            setMenuVisible(true);
        }
        else
            return;

    };

    const handleClick = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };
    const handleClickme = () => {
        onSearch(selectedText);
        window.scrollTo(0, 0)
    };
    

    return (
        <div onContextMenu={handleContextMenu} onClick={handleClick}>
            {children}
            {menuVisible && <ContextMenu items={menuItems} position={menuPosition} selectedText={selectedText} />}
        </div>
    );

   
};

export default RightClickArea;