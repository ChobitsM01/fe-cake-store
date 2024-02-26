import { useNavigate } from 'react-router-dom'
import './Topbar.scss'

export const Topbar = () => {
  const navigate = useNavigate();
  return (
    <div className='topbar-container d-flex justify-content-between align-items-center'>
      <div className='title ms-4' onClick={ () => navigate( '/admin' ) }>Dashboard</div>
      <div className="acoount-box me-4">Admin</div>
    </div>
  )
}