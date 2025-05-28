import { useParams } from "react-router";

const PostPage = () => {
  const { postId } = useParams();

  return (
    <div>
      <h1>House Page</h1>
      <p>This is the house page content.</p>
      <p>Post ID: {postId}</p>
    </div>
  );
};

export default PostPage;
