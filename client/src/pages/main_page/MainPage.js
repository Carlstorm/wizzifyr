import { useState } from 'react';

import './MainPage.scss';
import MainPageItems from './MainPageItems';

function MainPage(props) {

    const [searchString, setsearchString] = useState("")
    const [sortFilter, setsortFilter] = useState('{"_id": -1}')

    function search(e) {
        setsearchString(e.target.value.toLowerCase())
    }

    function sort(e) {
        setsortFilter(e.target.value)
    }

    return (
        <div className='mainpage'>
            <div className="mainpage-searchbar">
            <input id="mainpage-search" type="text" onChange={e => search(e)}></input>
                <div className="mainpage-searchbar-sort">
                    <label htmlFor="sort">Sort By: </label>
                    <select id="sort" name="sort" onChange={(e) => sort(e)}>
                        <option value='Date Desc'>Date Desc</option>
                        <option value='Date Asc'>Date Asc</option>
                        <option value='Likes Desc'>Likes Desc</option>
                        <option value='Likes Asc'>Likes Asc</option>
                    </select>
                </div>
            </div>
            <div className='mainpage-content'>
                <MainPageItems wishes={props.wishes} setwishes={props.setwishes} currentUser={props.currentUser} searchString={searchString} sortFilter={sortFilter} />
            </div>
        </div>
    )
}


export default MainPage;
