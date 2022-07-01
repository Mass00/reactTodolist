import React from 'react';
import {MyInput} from "../../UI/Input/MyInput";
import {MyButton} from "../../UI/Button/MyButton";
interface IPostCreate{
    title: string,
    desc: string,
    handlerOnClickAddPost(e: React.MouseEvent<HTMLButtonElement>): void,
    handlerOnChangeTitle(e: React.ChangeEvent<HTMLInputElement>):void,
    handlerOnChangeDesc(e: React.ChangeEvent<HTMLInputElement>): void,
    handlerOnPressAddPost(e: React.KeyboardEvent<HTMLInputElement>): void
}

export const PostCreate:React.FC<IPostCreate> = (props) => {
    return (
        <form>
            <div className="input">

                <MyInput
                    type="text"
                    placeholder='...'
                    value={props.title}
                    onChange={props.handlerOnChangeTitle}
                    onKeyDown={props.handlerOnPressAddPost}
                />
                <MyInput
                    type="text"
                    placeholder='...'
                    value={props.desc}
                    onChange={props.handlerOnChangeDesc}
                    onKeyDown={props.handlerOnPressAddPost}
                />
                <MyButton onClick={props.handlerOnClickAddPost}>Отправить</MyButton>
            </div>
        </form>
    );
};
