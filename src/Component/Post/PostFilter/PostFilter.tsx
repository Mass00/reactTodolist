import React from 'react';
import {MyInput} from "../../UI/Input/MyInput";
import MySelect from "../../UI/Select/MySelect";

interface IPostFilter  {
    searchQuery: string,
    handlerOnChangeSearchQuery(e: React.ChangeEvent<HTMLInputElement>): void,
    handlerOnChangeFilter(e: React.ChangeEvent<HTMLSelectElement>): void
}

export const PostFilter:React.FC<IPostFilter> = ({searchQuery, handlerOnChangeSearchQuery, handlerOnChangeFilter}) => {
    return (
        <div>
            <MyInput type={'text'}
                     placeholder={'Поиск...'}
                     value={searchQuery}
                     onChange={handlerOnChangeSearchQuery}
            />
            <MySelect
                options={['All', 'Active', 'Completed']}
                default={'Сортировка'}
                onChange={handlerOnChangeFilter}

            />
        </div>
    );
};
