import {Modal} from "@src/shared/ui/modal";
import {Typography} from "@src/shared/ui/typography";

type Props = {
    open: boolean,
    close: () => void
};
export const IDBNotSupportModal = (p: Props) => {
    return (
        <Modal
            open={p.open}
            close={p.close}
        >
            <Typography.Text>
                Извините, но ваш браузер должен поддерживать IndexedDB, чтобы приложение работало корректно.
            </Typography.Text>
        </Modal>
    );
};
