import { navigate } from "@reach/router"
import { useState, useEffect } from "react";

import './MakeWish.scss';
import uploadicon from "../../Assets/Icons/UploadIcon.svg"

import { loginCheck } from "../../Modules/Users"
import { submitWish, getWishes } from "../../Modules/Wish";

function MakeWish(props) {

    const [wishImg, setwishImg] = useState(null);
    const [editmode, seteditmode] = useState(false);
    const [formNameError, setformNameError] = useState(false);

    useEffect(() => {
        if (props.location.state.wish) {
            seteditmode(true);

            if (props.location.state.wish.img !== "") {
                document.getElementById("makewishimgstring").value = props.location.state.wish.img;
                setwishImg(`url(${props.location.state.wish.img})`);
            }
            document.getElementById("makeFormName").value = props.location.state.wish.name;
            document.getElementById("makeFormDetails").value = props.location.state.wish.details;

            const links = document.getElementsByClassName("makeFormLink")
            
            props.location.state.wish.links.forEach((l, i) => {
                links[i].value = l;
            });
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    function setImgString(e) {
        let img = e.target.files[0];
        if (typeof img == "undefined") {
            return
        }
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = async function () {
            document.getElementById("makewishimgstring").value = reader.result
            setwishImg(`url(${reader.result})`)
        };
        reader.onerror = function (error) {
            console.log('Local Image Error probably format or size: ', error);
        };
    }

    function submit(e) {
        e.preventDefault()
        if (!isNaN(document.getElementById("makeFormName").value)) {
            return setformNameError(true)
        }
        let mode = "makewish";
        let id = null;
        if (editmode) {
            mode = "editwish";
            id = props.location.state.wish._id
        }
        submitWish(e, mode, id).then(function(response) {
            if (!response.error) {
                getWishes().then(function(wish) {
                    props.setwishes(wish)
                })
                navigate("/")
            } else {
                console.log(response.error)
            }
        })
    }


    if (loginCheck("makeWish", 1)) {
        return null;
    } else {
        return (
            <form className="makeWish" onSubmit={(e) => submit(e)}>
                <input type="text" id="makewishimgstring" name="imgstring" className="makeWish-imgstring"></input>
                <div className="makeWish_mainProps">
                    <div className="makeWish_mainProps-image" style={{backgroundImage: wishImg}}>
                        <img src={uploadicon} alt="Upload icon"></img>
                        <input type="file" name="img" accept="image/*" onChange={(e) => setImgString(e)}></input>
                    </div>
                    <div className="makeWish_mainProps-input">
                        <div>
                            {formNameError ? <p className="makeWish_mainProps-input--error">Name is required!</p> : null}
                            <p>Wish name*</p>
                            <input type="text" id="makeFormName" name="name"></input>
                        </div>
                    </div>
                </div>
                <div className="makeWish_details">
                    <p className="prop-heading">Details</p>
                    <textarea id="makeFormDetails" type="text" name="details">
                    </textarea>
                </div>
                <div className="makeWish_links">
                    <p className="prop-heading">Links</p>
                    <input className="makeFormLink" type="text" name="link"></input>
                    <input className="makeFormLink" type="text" name="link"></input>
                    <input className="makeFormLink" type="text" name="link"></input>
                    <input className="makeFormLink" type="text" name="link"></input>
                </div>
                <div className="makeWish_submit">
                    <input className={"makeWish_submit-button"} type="submit" value={editmode ? "Edit" : "Submit"}></input>
                </div>
            </form>
        )
    }
}



export default MakeWish