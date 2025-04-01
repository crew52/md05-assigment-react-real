function FormSearch(props) {
    return (
        <input type="text" onInput={(e) => props.handleActionSearch(e)} className="form-control" placeholder="Search"/>
    )
}

export default FormSearch