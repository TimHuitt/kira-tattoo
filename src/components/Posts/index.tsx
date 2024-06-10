import axios from 'axios'

import { useState, useEffect } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { useAdminContext } from '@/context/AdminContext'
import { useModalContext } from '../../context/ModalContext'

import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen/index'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import CircleLoader from 'react-spinners/CircleLoader'
import Edit from '@/components/Edit'

interface Post {
  date?: string
  title?: string
  header?: string
  content?: string
  id?: string
}

const cld = new Cloudinary({
  cloud: {
    cloudName: "dqty1eboa"
  }
})

const Posts = () => {
  const { updatePosts } = useAdminContext()
  const { updatesRef, scrollRef } = useScrollContext()
  const { setShowModal, setCurrentImage } = useModalContext()

  const [ posts, setPosts ] = useState<Record<string, Post>>({})
  const [ isVisible, setIsVisible ] = useState<number[]>([0])
  const [ postImages, setPostImages ] = useState<string[]>([])

  useEffect(() => {
    const getPosts = async () => {
      axios.get('api/content', {params: {table: 'posts'}})
        .then(res => {
          setPosts(res.data.reverse())
        })
        .catch(err => {
          console.error(err)
        })
    }
    const fetchImages = async() => {
      axios.get('/api/cloudinary',{params: {path: 'main-images/posts'}})
        .then(res => {
          let imagesList = res.data.data.map((resource: { public_id: string }) => resource.public_id)
          setPostImages(imagesList);
        })
        .catch(err => {
          console.error('Error Fetching Images', err)
        })
    }
    fetchImages()
    getPosts()
    setIsVisible([0])
  },[updatePosts])



  // const fetchImages = (id: string) => {
  //   axios.get('/api/cloudinary',{params: {path: 'main-images/posts'}})
  //     .then(res => {
  //       const imagesList = res.data.data.map((resource: { public_id: string }) => resource.public_id)
  //       setPostImages(imagesList);
  //     })
  //     .catch(err => {
  //       console.error('Error Fetching Images', err)
  //     })
  // }

  const handleMore = () => {
    const showPost = isVisible.length
    setIsVisible([...isVisible, showPost])
  }

  const handleLess = () => {
    if (updatesRef && updatesRef.current && scrollRef && scrollRef.current) {
      const top = updatesRef.current.offsetTop + updatesRef.current.offsetHeight
      scrollRef.current.scrollTo({top,behavior: "smooth"})
    }
    setIsVisible([0])
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement
    setShowModal(true)
    setCurrentImage('main-images/posts/' + target.id)
  }

  return (
    <>
      {Object.keys(posts).length > 0 ? (
        Object.keys(posts).map((post) => (
          <div key={posts[post].id} className={`${isVisible.includes(parseInt(post)) ? '' : 'hidden'} relative text-sm md:text-lg p-4 mb-4 rounded bg-fuchsia-900 bg-opacity-20 border border-2 border-fuchsia-900 border-opacity-50`}>
            <div className="absolute top-2 right-2 opacity-50">{posts[post].date}</div>
            <h1 className="text-xl md:text-2xl text-start pt-4">{posts[post].title}</h1>
            <p className='text-xs md:text-base pl-4 opacity-60'>{posts[post].header}</p>
            <div className="w-full flex justify-center my-4">
              <div className="w-5/6 h-1 rounded border border-1 border-slate-500" />
            </div>
            <div className='w-full flex justify-center gap-5 my-4'>
              {postImages?.map((image, index) => {
                const currentImg = cld.image(image)
                currentImg.resize(fill().width(250).height(250))
                const imageName = image.split('/').pop()
                if (image.split('/')[2] === posts[post].id) { return (
                  <div 
                    className='w-[100px] h-[100px] bg-slate-900 cursor-pointer' 
                    key={`post-${imageName}-${index}`}
                    onClick={handleClick}
                  >
                    <AdvancedImage
                      className="block w-auto h-full max-w-full my-0 rounded mx-auto"
                      cldImg={currentImg}
                      id={`${posts[post].id}/${imageName}`}
                      plugins={[lazyload({threshold: 1})]}
                    />
                  </div>
                )}
              })}
            </div>
            <p className='text-xs md:text-base'>{posts[post].content}</p>

            <Edit element={'remove/post'} type={'remove'} data={posts[post].id} isLeft={true} />
          </div>
        ))
      ) : (
        <div className={`relative text-sm md:text-lg p-4 mb-4 rounded bg-fuchsia-900 bg-opacity-20 border border-2 border-fuchsia-900 border-opacity-50 text-center`}>
        <h2>No Posts Yet. Check back soon!</h2>
        </div>
      )}
      {Object.keys(posts).length > 1 && (
        <div className='w-full flex justify-center'>
          {isVisible.length < Object.keys(posts).length && (
            <button className='form-button py-1' onClick={handleMore}>More...</button>
          )}
          {isVisible.length > 1 && (
            <button className='form-button py-1' onClick={handleLess}>Less</button>
          )}
        </div>
      )}
    </>
  )
}

export default Posts