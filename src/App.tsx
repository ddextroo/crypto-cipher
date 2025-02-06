import { CaesarCipher } from "./components/CaesarCipher";
import { MonoalphabeticCipher } from "./components/MonoalphabeticCipher";
import { PlayfairCipher } from "./components/PlayfairCipher";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Information Assurance & Security - Activity 1
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <CaesarCipher title="Caesar Cipher" />
          </div>
          <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <MonoalphabeticCipher title="Monoalphabetic Cipher" />
          </div>
          <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <PlayfairCipher title="Playfair Cipher" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
