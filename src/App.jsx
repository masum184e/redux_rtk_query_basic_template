import Form from "./components/Form"
import List from "./components/List"


const App = () => {
  return (
    <>

      <div className="mx-8 max-w-screen-xl md:mx-auto">
        <h1 className="text-center text-[#764ABC] text-4xl mt-4 mb-8 font-bold">Redux RTK Query Basic Template</h1>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 w-full md:w-1/2 border border-[#764ABC]">
            <List />
          </div>
          <div className="flex-1 w-full md:w-1/2">
            <Form />
          </div>
        </div>
      </div >
    </>
  )
}

export default App