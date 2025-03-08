export default function Loader({loading}) {
    return (
        <div className={`loader ${loading ? 'active' : ''}`}>
            <div className="spinner"></div>
        </div>
    )
}