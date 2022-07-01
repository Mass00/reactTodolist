import React, {useMemo, useState} from 'react';
import './App.css';
import {PostList} from "./Component/Post/PostList";
import {PostFilter} from "./Component/Post/PostFilter/PostFilter";
import {PostCreate} from "./Component/Post/PostCreate/PostCreate";
import {Modal} from "./Component/UI/Modal/Modal";
import {MyButton} from "./Component/UI/Button/MyButton";

export type postTypes = {
    id: number,
    title: string,
    desc: string,
    isDone: boolean,
    raiting: number
}
type postValueTypes = {
    title: string,
    desc: string
}
type filterTypesProps = {
    filter: string,
    searchQuery: string
}

function App() {
    const [inputPost, setInputPost] = useState<postValueTypes>({title: '', desc: ''})
    const [posts, setPost] = useState<postTypes[]>([
        {id: 1, title: 'JAVA SCRIPT', desc: 'Учите дети JS', isDone: true, raiting: 3},
        {id: 2, title: 'HTML&CSS', desc: 'Учите дети HTML&CSS', isDone: false, raiting: 0},
        {id: 3, title: 'React TS', desc: 'Учите дети React TS', isDone: false, raiting: 2}
    ])
    const [filters, setFilters] = useState<filterTypesProps>({filter: '', searchQuery: ''});
    const [visible, setVisible] = useState<boolean>(false)

    const handlerOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({...filters, filter: e.target.value})
    }
    const handlerOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPost(prev => ({...prev, title: e.target.value}))
    }
    const handlerOnChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPost(prev => ({...prev, desc: e.target.value}))
    }
    const handlerOnClickAddPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); //оставить sumbit
        if (inputPost.desc !== '' && inputPost.title !== '') {
            setPost(prev => [...prev, {...inputPost, isDone: false, raiting: 0, id: Date.now()}])
        }
        setInputPost(prev => ({...prev, title: '', desc: ''}))
        setVisible(!visible)
    }
    const handlerOnPressAddPost = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputPost.desc !== '' && inputPost.title !== '') {
                setPost(prev => [...prev, {...inputPost, isDone: false, raiting: 0, id: Date.now()}])
            }
            setInputPost(prev => ({...prev, title: '', desc: ''}))
            setVisible(!visible)
        }
    }
    const handlerOnChangeCheckbox = (id: number) => {
        setPost(prev => prev.map(item => {
            if (item.id === id) return {...item, isDone: !item.isDone}
            return item
        }))
    }
    const handlerOnClickVisibleStatus = () => {
        setVisible(!visible)
    }
    const handlerOnClickChangeRaiting = (id: number, value: number) => {
        setPost(prev => prev.map(item => {
            if (item.id === id) return {...item, raiting: value}
            return item
        }))

    }
    const handlerOnChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({...filters, searchQuery: e.target.value})
    }
    const removePost = (id: number) => {
        setPost(prev => prev.filter(item => item.id !== id))
    }

    const filtredPosts = useMemo(() => {
        console.log('Отработала сортировка')
        if (filters.filter === 'Active') return posts.filter(i => !i.isDone)
        if (filters.filter === 'Completed') return posts.filter(i => i.isDone)
        return posts
    }, [filters.filter, posts])
    const filtredAndSearchPosts = useMemo(() => {
        return filtredPosts.filter(item => item.title.toLowerCase().includes(filters.searchQuery))
    }, [filters.searchQuery, filtredPosts])

    return (
        <div className="App">
            <MyButton onClick={handlerOnClickVisibleStatus}>
                Создать
            </MyButton>
            <Modal visible={visible} handlerOnClickVisibleStatus={handlerOnClickVisibleStatus}>
                <PostCreate
                    title={inputPost.title}
                    desc={inputPost.desc}
                    handlerOnClickAddPost={handlerOnClickAddPost}
                    handlerOnChangeTitle={handlerOnChangeTitle}
                    handlerOnChangeDesc={handlerOnChangeDesc}
                    handlerOnPressAddPost={handlerOnPressAddPost}
                />
            </Modal>

            <PostFilter
                searchQuery={filters.searchQuery}
                handlerOnChangeFilter={handlerOnChangeFilter}
                handlerOnChangeSearchQuery={handlerOnChangeSearchQuery}
            />
            <PostList
                posts={filtredAndSearchPosts}
                onClick={removePost}
                handlerOnChangeCheckbox={handlerOnChangeCheckbox}
                handlerOnClickChangeRaiting={handlerOnClickChangeRaiting}
            />
        </div>
    );
}

export default App;
