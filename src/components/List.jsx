import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetAllPostQuery, useDeletePostMutation } from "./../../redux/slice/post"

const List = () => {
    const { data, refetch } = useGetAllPostQuery();
    const [deletePost] = useDeletePostMutation();

    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
            await refetch();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex justify-between text-center font-semibold bg-[#764ABC] text-white">
                <h2 className="flex-1">Title</h2>
                <h2 className="w-20">Action</h2>
            </div>
            <div className="mt-2">
                {
                    data.posts.map((post, index) => (
                        <div className={`flex justify-between ${index % 2 === 0 ? 'bg-gray-200' : ''}`} key={post._id}>
                            <div className="flex pl-2 w-full">
                                <span className="">{index + 1}.</span>
                                <p className="pl-2 flex-1 text-gray-800">{post.title}</p>
                            </div>
                            <div className="text-center w-20">
                                <button className="text-2xl"><MdOutlineEditNote className="text-green-400" /></button>
                                <button className="ml-2 text-2xl" onClick={() => handleDeletePost(post._id)}><MdDelete className="text-red-600" /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List;
