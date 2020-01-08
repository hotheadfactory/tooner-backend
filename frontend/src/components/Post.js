import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';

function Post({ writeralias, title, writetime, edittime, hit, like }) {
    return(
        <section className="post-container">
            <div>{writeralias}</div>
            <div>{title}</div>
            <div>{writetime}</div>
            <div>{edittime}</div>
            <div>{hit}</div>
            <div>{like}</div>
        </section>
    );
}

Post.propTypes = {
    articleid: PropTypes.number.isRequired,
    writeralias: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    writetime: PropTypes.string.isRequired,
    edittime: PropTypes.string.isRequired,
    hit: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired
}

export default Post;