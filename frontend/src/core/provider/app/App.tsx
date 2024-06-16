import { Routes } from '~/routes/Routes';
import { AppProvider } from './AppProvider';

const App = () => {
    return (
        <AppProvider>
            <Routes />
        </AppProvider>
    );
};

export default App;
