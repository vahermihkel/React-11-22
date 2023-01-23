import React, { useEffect, useState } from 'react'
import confiq from '../data/config.json'
import '../styles/Article.css'

const Article = () => {
    const [article, setArticle] = useState({})
    const [image, setImage] = useState([])

    useEffect(() => {
        fetch(confiq.articleFromUrl)
            .then(res => res.json())
            .then(json => {
                setArticle(json || [])
                setImage(json.image)
            })
    }, []);
    console.log(image)

    return (
        <div className='page'>
            <div className='inline'>
                <h1>{article.title}</h1>
                <p className='intro' dangerouslySetInnerHTML={{ __html: article.intro}}></p>
                <div className='twn-image'>
                    {image?.large && <img className='image-top' src={image.large} alt="" />}
                    {image?.title && <div className='image-title'>{image.title}</div>}
                    {image?.large && <img className="image-bottom" src={image.large} alt="" />}
                </div>
                <p dangerouslySetInnerHTML={{ __html: article.body}}></p>
                {article.tags?.map(tag => <span key={tag}>{tag}</span>)}
            </div>
        </div>
    )
}

export default Article