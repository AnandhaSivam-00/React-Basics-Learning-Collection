import React, { useState } from 'react';

const FeedBackForm = () => {
    const [rating, setRating] = useState(10);
    const [comments, setComments] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(comments.length === 0) {
            alert('Hello! Please provide your comments');
            return;
        }
        if(Number(rating) < 5 && comments.length < 5) {
            alert('Hello! Please provide your brief comments to improve our services');
            return;
        }
        console.log(`Rating: ${rating}` + '\n' + `Comments: ${comments}`);
        setRating(10);
        setComments('');
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    return (
        <div className="container-fluid p-3">
            <h1 className="text-center">Feedback Form</h1>
            <form onSubmit={handleSubmit}>
                <fieldset className="border p-3 rounded mt-3" style={{ width: '80%', margin: '0 auto' }}>
                    <div className="mb-3">
                        <input
                            type="range"
                            className="form-range"
                            value={rating}
                            min={1}
                            max={10}
                            onChange={handleRatingChange}
                        />
                        <span>Rating: {rating}⭐</span>
                    </div>
                    <div>
                        <h4 className="mb-3">Add a Comments</h4>
                        <textarea
                            className="form-control"
                            cols="6"
                            rows="2"
                            placeholder="Add your comments here"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary mt-3">
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default FeedBackForm;