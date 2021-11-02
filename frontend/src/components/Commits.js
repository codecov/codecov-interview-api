
const Commits = ({ commits, ...props }) => {
    return (
        <div>
            {commits.length > 0 ? (
                <ul>
                    {commits.map(element => (
                        <li>
                            {`#${element.hash.substring(0, 8)} - ${element.description.split('\n')[0]}`}
                        </li>
                    ))}
                </ul>
                )
                :
                (
                    "There are no synched commits for this repository"
                )
            }
        </div>
    )
}


export default Commits