import React from 'react';

const Comment = () => {
  return (
    <div className="comment-section mt-6 mb-6">
            <form>
        <div className="field">
            <textarea className='textarea' placeholder='Type your comment'></textarea>
        </div>
        <div className="columns">
            <div className="column">
                <input type="text" className="input" placeholder='Your name' />
            </div>
            <div className="column">
                <input type="email" className="input" placeholder='Your email' />
            </div>
        </div>
        <div className="field">
            <input type="text" className="input" placeholder='Subject'/>
        </div>
        <div className="field">
        <button className="button has-background-danger is-fullwidth mt-5 has-text-white">Send</button>
        </div>
    </form>
    </div>
  )
}

export default Comment;