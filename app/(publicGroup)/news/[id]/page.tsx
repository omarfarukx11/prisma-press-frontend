import React from 'react'

const NewsDetails = async ({ params ,} : {
  params : Promise<{id : string}>
}) => {
  const {id} = await params;
  return (
    <div>hello {id}</div>
  )
}

export default NewsDetails