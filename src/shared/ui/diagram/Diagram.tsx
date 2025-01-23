import * as s from './Diagram.css'

type Props = {
    value: number
};

export const Diagram = (p: Props) => {
    return (
        <svg
            className={s.svg}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx={20}
                cy={20}
                r={15}
                className={s.circle}
                strokeDasharray={`${p.value * 47 / 50}, 100`}
                strokeDashoffset={0}
            />
        </svg>
    );
};