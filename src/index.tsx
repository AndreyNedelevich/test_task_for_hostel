import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'root not found',
    );
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <App />
                </LocalizationProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);

