import { createReducer, createAction, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { intitialPostList } from 'constants/blog'
import { toast } from 'react-toastify'
import { Post } from 'types/blog.type'

interface BlogState {
    postList: Post[]
    editingPost: Post | null
}
const intitialState: BlogState = {
    postList: intitialPostList,
    editingPost: null
}

export const addPost = createAction('blog/addPost', function (post: Omit<Post, "id">) {
    return {
        payload: {
            ...post,
            id: nanoid()
        }
    }
})
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEdtingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')

const blogReaducer = createReducer(intitialState, (builder) => {
    builder
        .addCase(addPost, (state, action) => {
            // immerjs  
            // immerjs giúp chúng ta mtate 1 state an toàn  
            const post = action.payload
            state.postList.push(post)
        })
        .addCase(deletePost, (state, action) => {
            const postId = action.payload
            const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
            if (foundPostIndex !== -1) {
                state.postList.splice(foundPostIndex, 1)
            }
        })
        .addCase(startEditingPost, (state, action) => {
            const postId = action.payload
            const foundPost = state.postList.find((post) => post.id === postId) || null
            state.editingPost = foundPost
        })
        .addCase(cancelEditingPost, (state) => {
            state.editingPost = null
        })
        .addCase(finishEditingPost, (state, action) => {
            console.log({ action });

            const postId = action.payload.id
            state.postList.some((post, index) => {

                if (post.id === postId) {
                    state.postList[index] = action.payload
                    toast.success('Update success')
                    return true
                }

                return false
            })
            state.editingPost = null
        })

})




export default blogReaducer
