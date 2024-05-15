import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
 
    const truncateContent = (content, maxLength) => {
        if (content.length <= maxLength) {
            return content;
        } else {
            return content.slice(0, maxLength) + '...';
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mb-4 transition all duration-300 ease-in-out transform hover:scale-105 hover:rounded-lg">
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover object-center"
                />
            </Link>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    <Link
                        to={`/post/${post.slug}`}
                        className="hover:text-blue-500 transition duration-300"
                    >
                        {post.title}
                    </Link>
                </div>
                <p className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: truncateContent(post.content, 20) }}></p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {post.category}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}
