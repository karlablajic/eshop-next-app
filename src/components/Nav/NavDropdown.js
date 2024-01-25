import React from 'react';
import Dropdown from '../Dropdown';
import Button from '@/components/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

const NavDropdown = () => {
  const { userData, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div>
      <Dropdown>
        <Dropdown.Button render={(open, setOpen) => <button onClick={() => setOpen(!open)}>{userData.name}</button>} />

        <Dropdown.List
          render={(open, setOpen) => {
            return (
              <>
                <Dropdown.ListItem>
                  <button
                    onClick={() => {
                      setOpen(!open);
                      if (isAdmin) router.push('/dashboard');
                      else router.push('/cart');
                    }}>
                    {isAdmin ? 'Dashboard' : 'Cart'}
                  </button>
                </Dropdown.ListItem>
                <Dropdown.ListItem>
                  <button
                    onClick={() => {
                      setOpen(!open);
                      dispatch(removeUser());
                    }}>
                    Logout
                  </button>
                </Dropdown.ListItem>
              </>
            );
          }}
        />
      </Dropdown>
    </div>
  );
};

export default NavDropdown;
