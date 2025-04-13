import React from 'react'
import { Menu, MenuDropdown, MenuItem } from '../components/Menu'

const AboutPage = () => {
  // Created using Tailwind CSS
  const sample = ['Sample 1', 'Sample 2', 'Sample 3']
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center '>
      <Menu>
        <button className='btn btn-primary'>Dropdown Button</button>
        <MenuDropdown>
          {sample.map((item, index) => (
            <MenuItem key={index} className='hover:bg-gray-200'>
              {item}
            </MenuItem>
          ))}
        </MenuDropdown>
      </Menu>
    </div>
  )
}

export default AboutPage