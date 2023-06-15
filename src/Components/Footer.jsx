import React, { useState } from 'react'
import Modal from '../pages/rock_paper_scissors/Modal';

const Footer = () => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            <footer className="footer">
                <div class="attribution">
                    Challenge by Dũng Mentor . Coded by Nhóm anh em

                </div>
                <button className="rules" onClick={toggle}>
                    Rules
                </button>
            </footer>
            {modal ? <Modal toggle={toggle} /> : null}
        </>
    )
}

export default Footer