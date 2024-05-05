import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreatePost() {
 
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen '>
      <h1 className='text-center text-2xl font-bold mb-3 '>Create Post</h1>

      <form className='flex flex-col gap-6'>
           <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' className='flex-1' required>

            </TextInput>
            <Select>
                
                <option value="uncategorized">Select Category</option>
                <option value="theory">Theory</option>
                <option value="fact">Fact</option>
                <option value="review">Review</option>
                <option value="manga">Manga</option> 
            </Select>

           </div>

           <div className='flex flex-col sm:flex-row gap-4 justify-between border-2 border-gray-300 hover:border-gray-800 dark:border-gray-800 dark:hover:border-gray-200 border-dashed dark:text-white p-8 mb-6'
>
<FileInput type="file" accept='image/*'/>


    <Button color={'green'} size={'sm'}  outline className='bg-[#008356] py-1'>Upload</Button>





           </div>

     <ReactQuill  theme='snow' placeholder='Your content....' className='p-4 border-2 border-gray-300 hover:border-gray-800  dark:border-gray-800 dark:hover:border-gray-200 border-dashed dark:text-white  dark:font-normal'
     ></ReactQuill>

      <Button type='submit' color={'green'} className='py-2'>Create Post</Button>

        
      </form>
    </div>
  )
}
