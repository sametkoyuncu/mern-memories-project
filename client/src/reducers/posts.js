export default (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload
    case 'CREATE':
      return [...posts, action.payload]
    case 'UPDATE':
      // post tüm postlar
      // action daki post güncellenmiş olan
      // o yüzden eskisi ile yer değiştiriyoruz
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    default:
      return posts
  }
}
