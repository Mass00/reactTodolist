import React from 'react';
import {MyInput} from "./UI/Input/MyInput";
import {MyButton} from "./UI/Button/MyButton";
import st from './NewPost.module.css'

interface INewPost {
    isPosting: boolean,
    onClick(): void
}

export const NewPost: React.FC<INewPost> = ({isPosting, onClick}) => {

    if (!isPosting) {
        return (
            <MyInput type={'text'} placeholder={''} onClick={onClick}/>
        )
    }else {
        return (
            <div className={st.isPosting}>
            <MyInput type={'text'} placeholder={'............'} />
            <MyButton>dasdasd</MyButton>
            </div>
        );
    }
};
