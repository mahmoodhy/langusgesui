import React from 'react';

const ContextMenu = ({ items, position , selectedText}) => {
    return (
        <div className="contextmenu" style={{position: 'absolute', top: position.y+15, left: position.x,zIndex:9999 }}>
            <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={item.action}>
                        {item.label}
                        {selectedText && index===0 && <span>{selectedText}</span>}
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;