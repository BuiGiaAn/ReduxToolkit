import React from 'react'
import CreatePost from './components/CreatePost'
import PostList from './components/PostList'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';


const Blog = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className='p-5'>
      <Button
        className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
        onClick={handleShowModal}>
        Add New Blog
      </Button>
      <CreatePost show={showModal} handleClose={handleCloseModal} />
      <PostList onEdit={handleShowModal} />
    </div>
  )
}

export default Blog
