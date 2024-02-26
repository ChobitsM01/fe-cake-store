import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroup } from "../../../redux/userGroup/userGroupSlice";
import { fetchRoles, useSelectRole } from "../../../redux/role/roleSlice";
import LoadingSpinner from "../../../components/Loading/Loading";

const Permission = () => {
  const dispatch = useDispatch();
  const [ userGroup, setUserGroup ] = useState();
  const [ roles, setRole ] = useState( [] );
  const userGroups = useSelector( state => state.groups.userGroup );
  const userRole = useSelector( useSelectRole );
  if ( userRole?.EC === 0 ) {
    setRole( userRole.DT );
    console.log( 'roles: ', userRole.DT );

  }
  useEffect( () => {
    dispatch( fetchGroup() );
    dispatch( fetchRoles() );
  }, [ dispatch ] )
  return (
    <div className="container permission_container">
      <div className="col-6 form-group mt-2">
        <label>Nhóm người dùng: </label>
        <select
          className="form-select"
          onChange={ ( e ) => setUserGroup( e.target.value ) }
          value={ userGroup }
        >
          { userGroups.length > 0 &&
            userGroups.map( ( item, index ) => (
              <option key={ `group-${ index }` } value={ item.id }>
                { item.description }
              </option>
            ) ) }
        </select>
        <div className="permissions">
          { roles && roles.length > 0 ? (
            roles.map( ( role, index ) => (
              <div key={ index }>{ role.description }</div>
            ) )
          ) : (
            <Suspense fallback={ <LoadingSpinner /> } />
          ) }
        </div>
      </div>
    </div>
  );
}

export default Permission;