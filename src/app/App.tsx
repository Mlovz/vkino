import { Header } from '@/widgets';
import { AppRouter } from './providers/router/app-router';

function App() {
  return (
    <div>
      <Header />

      <main className='main container'>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
