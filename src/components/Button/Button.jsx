export default function Button({children, type = 'button', disabled = false}) {
    return <button type={type} className="btn" disabled={disabled}>{children}</button>
}