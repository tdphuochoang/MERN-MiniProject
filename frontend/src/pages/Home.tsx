import React from 'react'
import { useAppSelector } from '../redux/store'

const Home = () => {
     const {profiles} = useAppSelector(state => state.profiles);


  return (
    <div>
        <h2>Profile Page</h2>
        <ul>
            {profiles && profiles.map(profile => (
                <li>
                    <h4>{profile.name}</h4>
                    <h4>{profile.email}</h4>
                    <h4>{profile.phone}</h4>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Home