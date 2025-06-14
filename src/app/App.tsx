import {GanttPage} from "@src/pages/gantt/ui/GanttPage";
import {StrictMode} from "react";
import {RootProvider} from "@src/app/providers/rootProvider";
import {NotifyBlock} from "@src/entities/notify/ui/notify-block";
import '@src/app/i18n/i18n'

export const App = () => {
    return (
        <>
            <StrictMode>
                <RootProvider>
                    <GanttPage/>
                    <NotifyBlock/>
                </RootProvider>
            </StrictMode>
        </>
    );
};