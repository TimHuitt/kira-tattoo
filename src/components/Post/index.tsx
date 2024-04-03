const Post = () => {
  return (

    <div className='relative text-sm md:text-lg p-4 mb-4 rounded-lg bg-fuchsia-900 bg-opacity-20 border border-2 border-fuchsia-900 border-opacity-50'>
      <div className="absolute top-2 right-2 opacity-50">5/5/2024</div>
      <h1 className="text-xl md:text-2xl text-start pt-4">New Project or Event!</h1>
      <p className='text-xs md:text-base pl-4 opacity-60'>
        Some stuff about this project or event
      </p>
      <div className="w-full flex justify-center my-4">
        <div className="w-5/6 h-1 rounded-xl border border-1 border-slate-500" />
      </div>
      <p className='text-xs md:text-base'>
        Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et; pellentesque diam. Blandit quisque, posuere pretium vivamus. Metus urna mattis taciti pharetra nascetur maecenas. Justo placerat lacus ipsum. Ad sed ante eu eleifend massa aenean aptent curae; justo placerat. Proin sollicitudin dui dictum parturient fusce felis ad felis montes. Ante arcu porta laoreet; mus porttitor eros cras arcu vestibulum imperdiet. Tempor primis molestie nisl litora rhoncus. Mus commodo taciti fames. Tortor tincidunt nascetur ac netus curabitur nisl volutpat varius.
      </p>
    </div>
  )
}

export default Post