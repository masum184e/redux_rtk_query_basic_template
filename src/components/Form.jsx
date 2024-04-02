const Form = () => {
    return (
        <>
            <div className="bg-[#764ABC] p-4">
                <form method="post">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description</label>
                        <textarea id="description" name="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-32"></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" className="bg-white text-[#764ABC] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form