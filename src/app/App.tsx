import {GanttPage} from "@src/pages/gantt/ui/GanttPage";
import {StrictMode} from "react";
import {RootProvider} from "@src/app/providers/rootProvider";
import {NotifyBlock} from "@src/entities/notify/ui/notify-block";

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