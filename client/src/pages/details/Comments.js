import './Comments.scss';
import { formatDate } from '../../Modules/StringFormats';

function Comments(props) {

    const sortedComments = props.comments.sort((a,b) => {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return d-c;
    });

    return (
        <div className="commentItems">
            {sortedComments.map((w, index) => {
                return (
                    <div key={index} className="commentItems-item">
                        <p className="commentItems-author">{w.author}<span className="comment-date">{formatDate(w.date)}</span></p>
                        <p className="commentItems-content">{w.comment}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments;