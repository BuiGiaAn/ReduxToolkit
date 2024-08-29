import { useState, useEffect } from 'react'
import { Post } from 'types/blog.type'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, cancelEditingPost, finishEditingPost } from 'pages/blog/blog.reducer'
import { RootState } from 'store'
import Modal from 'react-bootstrap/Modal';
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons"
import { Button } from "antd"

const initialState = {
    title: '',
    description: '',
    publishDate: '',
    id: '',
    featuredImage: '',
    published: false
}
interface Modal {
    show: boolean
    handleClose: () => void
}
const CreatePost = ({ show, handleClose }: Modal) => {
    const [formData, setFormData] = useState<Post>(initialState)
    const editingPost = useSelector((state: RootState) => state.blog.editingPost)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setFormData(editingPost || initialState)
    }, [editingPost])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (editingPost) {
            setDisabled(true)
            setLoading(true)
            setTimeout(() => {
                dispatch(finishEditingPost(formData))
                setLoading(false)
                setDisabled(false)
                handleClose()
            }, 2000)

        } else {
            const formDataWithId = { ...formData, id: new Date().toISOString() }
            setDisabled(true)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                dispatch(addPost(formDataWithId))
                setFormData(initialState)
                setDisabled(false)
                handleClose()
            }, 2000)
        }
    }

    const handleCancelEditngPost = () => {
        dispatch(cancelEditingPost())
        handleClose()
    }
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    // const hasCopiedText = Boolean(copiedText);

    return (
        <>
            <Modal show={show} onHide={handleCancelEditngPost}>
                <Modal.Header closeButton>
                    <Modal.Title> {editingPost ? "Edit Blog" : "Add A New Blog"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} onReset={handleCancelEditngPost}>
                        <div className='mb-6'>
                            <div className='d-flex align-items-center'>
                                <label htmlFor='title' className='mb-2 mr-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                                    Title
                                </label>
                                {formData.title && <div>
                                    <button
                                        type='button'
                                        className="mb-2 mr-2 block text-sm leading-3 font-medium text-gray-900 dark:text-gray-300"
                                        onClick={() => copyToClipboard(formData.title)}
                                    > {copiedText === formData.title ? <CheckIcon /> : <CopyIcon />}</button>
                                </div>}
                            </div>
                            <input
                                type='text'
                                id='title'
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                                placeholder='Title'
                                required
                                value={formData.title}
                                onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                            />
                        </div>
                        <div className='mb-6'>
                            <div className='d-flex align-items-center'>
                                <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                                    Featured Image
                                </label>
                                {formData.featuredImage && <div>
                                    <button
                                        type='button'
                                        className="mb-2 ml-2 block text-sm leading-3 font-medium text-gray-900 dark:text-gray-300"
                                        onClick={() => copyToClipboard(formData.featuredImage)}
                                    > {copiedText === formData.featuredImage ? <CheckIcon /> : <CopyIcon />}</button>
                                </div>}
                            </div>
                            <input
                                type='text'
                                id='featuredImage'
                                className='block mb-2 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                                placeholder='Url image'
                                required
                                value={formData.featuredImage}
                                onChange={(event) => setFormData((prev) => ({ ...prev, featuredImage: event.target.value }))}
                            />
                            {formData.featuredImage && <img src={formData.featuredImage} alt={formData.title} className="img-thumbnail"></img>}

                        </div>
                        <div className='mb-6'>
                            <div>
                                <div className='d-flex align-items-center'>
                                    <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
                                        Description
                                    </label>
                                    {formData.description && <div>
                                        <button
                                            type='button'
                                            className="mb-2 ml-2 block text-sm leading-3 font-medium text-gray-900 dark:text-gray-300"
                                            onClick={() => copyToClipboard(formData.description)}
                                        > {copiedText === formData.description ? <CheckIcon /> : <CopyIcon />}</button>
                                    </div>}
                                </div>
                                <textarea
                                    id='description'
                                    rows={3}
                                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                                    placeholder='Your description...'
                                    required
                                    value={formData.description}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                                />
                            </div>
                        </div>
                        <div className='mb-6'>
                            <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                                Publish Date
                            </label>
                            <input
                                type='datetime-local'
                                id='publishDate'
                                className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                                placeholder='Title'
                                required
                                value={formData.publishDate}
                                onChange={(event) => setFormData((prev) => ({ ...prev, publishDate: event.target.value }))}
                            />
                        </div>
                        <div className='mb-6 flex items-center'>
                            <input
                                id='publish'
                                type='checkbox'
                                className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
                                checked={formData.published}
                                onChange={(event) => setFormData((prev) => ({ ...prev, published: event.target.checked }))} />

                            <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
                                Publish
                            </label>
                        </div>

                        <Modal.Footer>
                            <div>
                                {editingPost ? <>
                                    <Button
                                        loading={loading}
                                        disabled={disabled}
                                        type="primary"
                                        htmlType="submit"
                                        className={`${disabled ? 'bg-gray-500' : 'bg-gradient-to-br from-teal-300 to-lime-300'
                                            } mr-2`}


                                    >
                                        <span className='text-black'>
                                            Update Post
                                        </span>
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="reset"
                                        className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
                                        onClick={() => { handleCancelEditngPost() }}
                                    >
                                        <span
                                            className='relative rounded-md  px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                                            Cancel
                                        </span>
                                    </Button></>
                                    :
                                    <Button
                                        loading={loading}
                                        className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        <span className='relative rounded-md px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                                            Publish Post
                                        </span>
                                    </Button>}
                            </div>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreatePost
