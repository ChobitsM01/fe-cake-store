import { NavLink } from "react-router-dom"

export const Forbidden = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <div className="fs-1 fw-bold text-danger">HTTP ERROR 403- FORBIDDEN</div>
      <div className="fs-3">Bạn không có quyền truy cập vào trang này</div>
      <NavLink to='/' className="btn btn-primary mt-3 fw-bold">Trở về trang chủ</NavLink>
    </div>
  )
}