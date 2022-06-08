import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    console.log(postMessages)

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const createPost = async (req, res) => {
  const post = req.body

  const newPost = new PostMessage(post)

  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id!')

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    )

    res.status(200).json(updatedPost)
  } catch (error) {
    //FIXME: check this after, be sure for correct status code returned
    res.status(409).json({ message: error })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id!')

  try {
    await PostMessage.findByIdAndRemove(id)

    res.status(204).json({ message: 'Post deleted successfully!' })
  } catch (error) {
    //FIXME: check this after, be sure for correct status code returned
    res.status(409).json({ message: error })
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id!')

  const post = await PostMessage.findById(id)

  if (!post) return res.status(404).json({ message: 'Post not found!' })

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    )
    res.status(200).json(updatedPost)
  } catch (error) {
    //FIXME: check this after, be sure for correct status code returneds
    return res.status(409).json({ message: error })
  }
}
