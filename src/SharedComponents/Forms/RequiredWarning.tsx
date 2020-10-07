import { h } from 'preact';

interface IRequiredWarningProps {
    message: string;
}

const RequiredWarning = ({ message }: IRequiredWarningProps) => {
    return (
        <div className="FormField-RequredWarning">
            <span className="">*</span>
            <span> - </span>
            <span>{message}</span>
        </div>
    )
}

export default RequiredWarning;