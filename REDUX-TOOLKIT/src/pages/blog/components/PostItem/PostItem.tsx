import React from 'react'
import { Post } from 'types/blog.type'
import { useState } from 'react'
import CreatePost from '../CreatePost'
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

interface PostItemType {
    post: Post
    handleDelete: (postId: string) => void
    handleStartEditing: (postId: string) => void
}

const PostItem = ({ post, handleDelete, handleStartEditing }: PostItemType) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='flex flex-col items-center overflow-hidden rounded-lg border md:flex-row'>
            <div className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48'>
                <img
                    src={post.featuredImage}
                    loading='lazy'
                    alt={post.title}
                    className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
                />
            </div>
            <div className='flex flex-col gap-2 p-4 lg:p-6'>
                <span className='text-sm text-gray-400'>
                    {moment(post.publishDate).format('MMMM Do YYYY, h:mm:ss a')}
                </span> <h2 className='text-xl font-bold text-gray-800'>{post.title}</h2>
                <p className='text-gray-500'>{post.description}</p>
                <div>
                    <div className='inline-flex rounded-md shadow-sm' role='group'>
                        <button
                            type='button'
                            className='rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
                            onClick={() => { handleStartEditing(post.id) }}
                        >
                            Edit
                        </button>
                        <button
                            type='button'
                            className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
                            onClick={handleShow}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE BLOG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Bạn có chắc chắn mún xóa ko?</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleDelete(post.id)}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PostItem
