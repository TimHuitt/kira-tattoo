import { useState, useEffect } from 'react'
import Edit from '@/components/Edit'
import axios from 'axios'
import { useScrollContext } from '@/context/ScrollContext'
import { useAdminContext } from '@/context/AdminContext'

interface Post {
  date?: string
  title?: string
  header?: string
  content?: string
  id?: string
}

const Posts = () => {
  const { updatePosts } = useAdminContext()
  const { updatesRef, scrollRef } = useScrollContext()

  const [ posts, setPosts ] = useState<Record<string, Post>>({})
  const [ isVisible, setIsVisible ] = useState<number[]>([0])


  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get('api/content', {params: {table: 'posts'}})
        setPosts(res.data.reverse())
      } catch (err) {
        console.error(err)
      }
    }
    getPosts()
    setIsVisible([0])
  },[updatePosts])



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

  return (
    <>
      {Object.keys(posts).length > 0 ? (
        Object.keys(posts).map((post) => (
          <div key={post} className={`${isVisible.includes(parseInt(post)) ? '' : 'hidden'} relative text-sm md:text-lg p-4 mb-4 rounded bg-fuchsia-900 bg-opacity-20 border border-2 border-fuchsia-900 border-opacity-50`}>
            <div className="absolute top-2 right-2 opacity-50">{posts[post].date}</div>
            <h1 className="text-xl md:text-2xl text-start pt-4">{posts[post].title}</h1>
            <p className='text-xs md:text-base pl-4 opacity-60'>{posts[post].header}</p>
            <div className="w-full flex justify-center my-4">
              <div className="w-5/6 h-1 rounded border border-1 border-slate-500" />
            </div>
            <div className='w-full flex justify-center gap-5 my-4'>
              <div className='w-[100px] h-[100px] bg-slate-900'></div>
              <div className='w-[100px] h-[100px] bg-slate-900'></div>
              <div className='w-[100px] h-[100px] bg-slate-900'></div>
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