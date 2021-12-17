import './Details.scss';
import { useState, useEffect } from 'react';
import Comments from './Comments';
import { loginCheck } from '../../Modules/Users';
import { formatDate, urlToName } from '../../Modules/StringFormats';
import { commentHandle, getWish, getWishes } from '../../Modules/Wish';

function Details(props) {

    const [wish, setwish] = useState({name:"", img:"", comments:[], id_:"",links:[]})
    const [disableComment, setdisableComment] = useState(true)
    const [commentTextError, setcommentTextError] = useState(false)

    useEffect(() => {
        if ('name' in props.location.state) {
            setwish(props.location.state)
        } else {
            getWish(props.id).then(function(response) {
                setwish(response)
            })
        }
      }, []);

    useEffect(() => {
        if (props.currentUser) {
            setdisableComment(false)
        }
      }, [props.currentUser]);
      

    function comment(e) {
        e.preventDefault()
        if (!props.currentUser) {return}
        
        if (!isNaN(document.getElementById("commentTextarea").value)) {
            setcommentTextError(true)
            return
        } else {
            setcommentTextError(false)
        }

        setdisableComment(true)
        commentHandle(e, wish._id, props.currentUser.username).then(function(response) {
            if (response.error) {
                console.log(response.error)
            } else {
                getWish(wish._id).then(function(updatedWish) {
                    setwish(updatedWish)
                    setdisableComment(false)
                })

                getWishes().then(function(updatedWishes) {
                    props.setwishes(updatedWishes)
                })
            }
        })
    }


    return (
        <div className="details">
            <section className="details_content">
                <div className="details_content-main">
                    <div className="details_content-image" style={wish.img.length > 0 ? {backgroundImage: `url(${wish.img})`} : null}></div>
                    <div className="details_content-info">
                        <h1>{wish.name}</h1>
                        <p>{formatDate(wish.date)}</p>
                        <div className="details_content-links">
                            {wish.links.map((l, i) => {
                                return (
                                    <a target="_blank" rel="noreferrer" key={i} href={l} className='details_content-links-link'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mainpageitem-links-linkicon' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        <p>{urlToName(l)}</p>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="details_content-details">
                    <p>{wish.details}</p>
                </div>
            </section>
            <section className="details_comments">
                {props.currentUser ? null : 
                <div className="details_comments-loginmessage">
                    <p>Login to comment</p>
                    <div onClick={(e) => loginCheck(`/details/${wish._id}`)}>
                        <p>Login</p>
                    </div>
                </div>
                }
                {commentTextError ? <p className="details_comments--error">No empty Comments please...</p> : null}
                <form onSubmit={(e) => comment(e)} className={`details_comments-makecomment${!disableComment ? "" : " details_comments-makecomment-disabled"}`}>
                    <textarea type="text" id="commentTextarea" name="comment"></textarea>
                    <input className="details_comments-button" type="submit" value="Comment"></input>
                </form>
                <Comments comments={wish.comments} />
            </section>
        </div>
    )
}


export default Details;