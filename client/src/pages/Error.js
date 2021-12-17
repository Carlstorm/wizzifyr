import './Error.scss';


function Error(props) {

    const type = props.location.state.type;

    if (type === "denied") {
        return (
        <div className='error'>
            <p>Access Denied :(</p>
        </div>
        )
    }

    return (
    <div className='error'>
        <p>Some Error :(</p>
    </div>
    )

}

export default Error