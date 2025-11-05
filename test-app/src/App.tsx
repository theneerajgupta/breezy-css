import './App.css'
import { TestComponent } from './TestComponent'

function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Breezy CSS Test</h1>
      
      {/* Test basic responsive props */}
      <div 
        className="bg-blue-500 p-4 text-white"
        md="bg-pink-500 p-8"
        lg="bg-amber-500 p-12"
      >
        <p>Resize window to see color changes:</p>
        <p>Mobile: Blue background, p-4</p>
        <p>Medium (768px+): Red background, p-8</p>  
        <p>Large (1024px+): Green background, p-12</p>
      </div>
      
      {/* Manual test to verify Tailwind works */}
      <TestComponent />
      
      {/* Test multiple classes per breakpoint */}
      <div 
        className="mt-8 flex flex-col gap-2"
        md="flex-row gap-4"
        lg="gap-8 bg-green-500"
      >
        <div className="bg-gray-200 p-4">Item 1</div>
        <div className="bg-gray-300 p-4">Item 2</div>
        <div className="bg-gray-400 p-4">Item 3</div>
      </div>
      
      {/* Test xxl -> 2xl mapping */}
      <div 
        className="mt-8 text-sm"
        sm="text-base"
        md="text-lg"
        lg="text-xl"
        xl="text-2xl"
        xxl="text-4xl"
      >
        Text size increases with screen size
      </div>
    </div>
  )
}

export default App
