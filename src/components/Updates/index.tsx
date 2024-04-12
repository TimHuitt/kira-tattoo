import Post from "../Post"

const Updates: React.FC = () => {

  return (
    <div>
      <div>
        <h1 className="text-4xl text-center p-4 moto">Updates</h1>
      </div>
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Updates