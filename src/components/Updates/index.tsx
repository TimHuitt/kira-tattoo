import Posts from "../Posts"
import Edit from '@/components/Edit'

const Updates: React.FC = () => {

  return (
    <div className="relative">
      <div>
        <h1 className="text-4xl text-center p-4 moto">Updates</h1>
      </div>
      <Edit element={'add/post'} type={'add'} size={30} />
      <Posts />
    </div>
  )
}

export default Updates