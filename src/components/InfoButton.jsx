export const InfoButton = (props) => {
    function handleClick() {
        props.setShowInfo(prev => !prev);
    }
    return (
        <button onClick={handleClick}>info</button>
    )
}