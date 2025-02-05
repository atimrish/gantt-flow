import {observer} from "mobx-react";
import {useRootContext} from "@src/app/providers/rootProvider";
import {Notify} from "@src/entities/notify/ui/notify";
import * as s from './NotifyBlock.css'

export const NotifyBlock = observer(() => {
    const {notify} = useRootContext()
    return (
        <div className={s.container}>
            {
                notify.notifies.map(i => (
                    <Notify
                        id={i.id}
                        type={i.type}
                        title={i.title}
                        description={i.description}
                        key={i.id}
                    />
                ))
            }
        </div>
    );
})