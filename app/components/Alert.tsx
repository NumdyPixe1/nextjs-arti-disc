interface Props {
    message: string;
    messageType: 'success' | 'error' | 'nothing' | 'info'
};
export const Alert = ({ message, messageType }: Props) => {
    const styles = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
        nothing: '',
        info: "bg-blue-100 border border-blue-400 text-blue-700",
    };
    const labels = {
        success: "Success ",
        error: "Error ",
        nothing: ''
        , info: "Info ",
    };
    return (
        <div className={`mb-5 px-4 py-3 rounded relative ${styles[messageType]}`} role="alert">
            <strong className="font-bold">{labels[messageType]}</strong>{message}
        </div>)

}