import logo from './logo.svg';
import './App.css';
import ChatBot from 'react-simple-chatbot';

function App() {
  return (
    

<ChatBot
  steps={[
    {
      id: 'hello-world',
      message: 'Hello World!',
      end: true,
    },
  ]}
/>
  );
}

export default App;
