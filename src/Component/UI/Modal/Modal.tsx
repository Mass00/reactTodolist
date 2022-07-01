import React from 'react';
import st from './Modal.module.css'
interface IModal{
    children: React.ReactNode,
    visible: boolean,
    handlerOnClickVisibleStatus(): void
}

export const Modal:React.FC<IModal> = ({children, visible, handlerOnClickVisibleStatus}) => {
    const rootStyle = [st.modal]
    if(visible) rootStyle.push(st.active)

    return (
        <div className={rootStyle.join(' ')} onClick={handlerOnClickVisibleStatus}>
            <div className={st.modal__content} onClick={(e:React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};