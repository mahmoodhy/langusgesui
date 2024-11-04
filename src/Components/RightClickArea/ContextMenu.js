import React from 'react';
import CopyComponent from '../CopyComponent';

const ContextMenu = ({ items, position , selectedText}) => {
    return (
        <div className="contextmenu" style={{position: 'absolute', top: position.y+15, left: position.x,zIndex:9999 }}>
            <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={item.action}>
                        {item.label}
                        {selectedText && index===0 && <span>{selectedText}</span>}
                        {selectedText && index===1 && <h1><CopyComponent text={selectedText} ></CopyComponent></h1>}
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;