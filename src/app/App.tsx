import {GanttPage} from "@src/pages/gantt/ui/GanttPage";
import {StrictMode} from "react";
import {RootProvider} from "@src/app/providers/rootProvider";

export const App = () => {
    return (
        <>
            <StrictMode>
                <RootProvider>
                    <GanttPage/>
                </RootProvider>
            </StrictMode>
        </>
    );
};