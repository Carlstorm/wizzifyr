import { navigate } from "@reach/router"
import { useEffect, useState } from 'react';

import './MainPageItems.scss';
import { formatDate, urlToName } from "../../Modules/StringFormats";
import { likeHandle, receivedHandle, deleteHandle, getWishes} from "../../Modules/Wish";

function MainPageItems(props) {

    const [itemobj, setitemobj] = useState([...props.wishes])

    useEffect(() => {
        let sortedarray = [...props.wishes]
        sortedarray.sort((a,b) => {
            return new Date(b.date)-new Date(a.date);
        });
        setitemobj(sortedarray);
    }, [props.wishes]);

    useEffect(() => {
        const sortedarray = props.wishes.filter(q => q.name.toLowerCase().includes(props.searchString))
        setitemobj(sortedarray)
    }, [props.searchString]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let sortedarray = [...props.wishes]
        sortedarray.sort((a,b) => {
            switch(props.sortFilter) {
                case "Likes Desc": return b.liked-a.liked;
                case "Likes Asc": return a.liked-b.liked;
                case "Date Desc": return new Date(b.date)-new Date(a.date);
                case "Date Asc": return new Date(a.date)-new Date(b.date);
                default: return props.sortFilter;
            }
        });
        setitemobj(sortedarray);
    }, [props.sortFilter]) // eslint-disable-line react-hooks/exhaustive-deps


    function updateWishes() {
        getWishes().then(function(updatedWishes) {
            props.setwishes(updatedWishes)
        })
    }

    function wishClickEvent(e, wish) {
        const button = e.target.dataset.button;
        const bonusfunctions = {};

        bonusfunctions.like = (target) => {
            if (!target.classList.contains("mainpageitem-bonus-disable")) {target.classList.add("mainpageitem-bonus-disable")} else {return}
            likeHandle(wish._id).then((response) => {
                if (!response.error) {
                    updateWishes()
                    target.classList.remove("mainpageitem-bonus-disable")
                }
            })
        }

        bonusfunctions.recieved = (target) => {
            if (!target.classList.contains("mainpageitem-bonus-disable")) {target.classList.add("mainpageitem-bonus-disable")} else {return}
            receivedHandle(wish._id).then((response) => {
                if (!response.error) {
                    updateWishes()
                    target.classList.remove("mainpageitem-bonus-disable")
                }
            })
        }

        bonusfunctions.edit = () => {
            navigate("/editwish", {state: {wish: wish}})
        }

        bonusfunctions.delete = () => {
            deleteHandle(wish._id).then((response) => {
                if (!response.error) {
                    updateWishes()
                }
            })
        }

        bonusfunctions.link = () => {return}


        function defaultEvent() {
            navigate("/details/"+wish._id+"", { state: wish });   
        }
        
        switch(button) {
            case "like": return bonusfunctions.like(e.target);
            case "recieved": return bonusfunctions.recieved(e.target);
            case "edit": return bonusfunctions.edit();
            case "delete": return bonusfunctions.delete();
            case "link": return bonusfunctions.link();
            default: return defaultEvent();
        }
    }
    

    if (!props.wishes) {
        return <div>Loading... probably</div>
    }

    const wishes = itemobj.map((w, index) => {
        let bonusOptions = null;

        if (props.currentUser) {
            if (props.currentUser.chosenone) {
                bonusOptions = (
                    <div className="mainpageitem-bonus">
                        <div>
                            <p data-button="like" className={`mainpageitem-bonus-like${w.liked ? " mainpageitem-bonus-like--active" : ""}`}>Like</p>
                            <p data-button="recieved" className={`mainpageitem-bonus-received${w.received ? " mainpageitem-bonus-received--active" : ""}`}>Recieved</p>
                        </div>
                        <div>
                            <p data-button="edit" className="mainpageitem-bonus-edit">Edit</p>
                            <p data-button="delete" className="mainpageitem-bonus-delete">Delete</p>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div key={index} className="mainpageitem" onClick={(e) => wishClickEvent(e, w)}>
                <div className='mainpageitem-container'>
                    <div className='mainpageitem-image'>
                        <div className="mainpageitem-image-bannerWrap">
                            {w.liked ? <p className="mainpageitem-image-likedBanner">Liked</p> : null}
                            {w.received ? <p className="mainpageitem-image-receivedBanner">Received</p> : null}
                        </div>
                        <div className='mainpageitem-image-display' style={w.img.length > 0 ? {backgroundImage: `url(${w.img})`} : null}></div>
                    </div>
                        <div className='mainpageitem-info'>
                            <div>
                                <p>{w.name}</p>
                                <p>{formatDate(w.date)}</p>
                                <p>{w.details}</p>
                            </div>
                        </div>
                    <div className='mainpageitem-props'>
                        <div className='mainpageitem-comments'>
                            <p>{w.comments.length} Comments</p>
                        </div>
                        <div className='mainpageitem-links'>
                            {w.links.map((l, i) => {
                                return (
                                    <a data-button="link" key={i} target="_blank" rel="noreferrer" href={l} className='mainpageitem-links-link'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mainpageitem-links-linkicon' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        <p>{urlToName(l)}</p>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {bonusOptions}
            </div>
        )
    })
    return wishes
}


export default MainPageItems;