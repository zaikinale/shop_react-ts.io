import CloseImg from "../../assets/media/close.svg";

interface DeleteButtonProps {
    onClick: () => void;
    style: Record<string, string>;
}

export default function DeleteButton({ onClick, style }: DeleteButtonProps) {
    return (
        <button className={style.saveButton} onClick={onClick}>
            <img className={style.deleteBtn} src={CloseImg} alt="Удалить" />
        </button>
    );
}