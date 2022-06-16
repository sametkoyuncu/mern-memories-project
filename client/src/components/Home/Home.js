import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import Pagination from '../Pagination'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

import useStyles from './styles.js'
import { getPosts } from '../../actions/posts'

const Home = () => {
  const [currentId, setCurrentId] = useState(null)

  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
