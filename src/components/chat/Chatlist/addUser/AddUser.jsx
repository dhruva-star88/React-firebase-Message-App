import React from 'react'
import './adduser.css'
import { toast } from 'react-toastify'

const AddUser = () => {

  const handleSearch =  async e => {
    e.preventDefault()

    const formData = new FormData()
    const username = formData.get("username")

    try{

    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }
  return (
    <div className='addUser'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username' />
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png" alt="" />
                <span>Dhruva</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
  )
}

export default AddUser