import {createRoot} from 'react-dom/client'
import {App} from "@src/app/App";
import './index.css'

const rootContainer = document.querySelector('#root')
const root = createRoot(rootContainer!)
root.render(<App/>)