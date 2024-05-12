import { Button, Textarea, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function CommentSection(props) {
    const [words,setWords] =useState("");
    const {currentUser} = useSelector(state=> state.user)

    console.log(currentUser);
return (
    <div className='max-w-4xl p-4 mx-auto border-t-2 border-gray-400 mt-32 '>
        {
            (currentUser) ?
                (
                    <div className='flex flex-row items-center text-gray-500 text-xs'>
                        <p>Logged in as: </p>
                        <Link to={'/dashboard?tab=profile'} className=' flex flex-row  items-center text-blue-500 hover:text-blue-600  hover:scale-125 transition-all '>
                            <img className=' rounded-full w-6 h-6 ml-5 mr-1' src={currentUser.photo} />
                            <p className=''>  @ {currentUser.username}</p>
                        </Link>
                    </div>
                )
                :
                (
                    <div>
                        <Link to='/sign-in' className='text-blue-500 hover:text-blue-600'>Login</Link> to comment
                    </div>
                )
        }

        {currentUser &&
            <form className='p-5 m-5 border-2 dark:border-gray-500 border-dashed dark:hover:border-gray-200 rounded-lg border-gray-400 hover:border-gray-600 '>
                <Textarea
                    placeholder='Write a comment...'
                    rows={"4"}
                    maxLength={200}
                    onChange={(e) => {
                        setWords(e.target.value)
                    }}
                    className='resize-none'
                 
                >
                </Textarea>
                <div className='flex  justify-between items-center mt-5'>
                    <p className='text-xs'    style={{ color: words.length === 200 ? 'red' : 'inherit' }}>{words.length} / 200</p>
                    <Button size={"sm"} className='bg-blue-500 hover:bg-blue-600 text-white  rounded-lg ' outline>Comment</Button>
                </div>
            </form>
        }
    </div>
)
}
