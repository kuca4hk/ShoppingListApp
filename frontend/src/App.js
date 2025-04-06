import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SharedLayout from "./components/layout/SharedLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
