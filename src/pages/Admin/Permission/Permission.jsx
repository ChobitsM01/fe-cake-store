import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignUserRoles, getUserRoles, useSelectUserRoles } from "../../../redux/userRole/userRoleSlice";
import { fetchGroup, useSelectUserGroup } from "../../../redux/userGroup/userGroupSlice";
import { fetchRoles, useSelectRole } from "../../../redux/role/roleSlice";
import { useImmer } from "use-immer";
import produce from 'immer';
import { toast } from "react-toastify";

const Permission = () => {
  const dispatch = useDispatch();
  const [ userGroup, setUserGroup ] = useState( "" );
  const groupRoles = useSelector( useSelectUserRoles );
  const roles = useSelector( useSelectRole );
  const groups = useSelector( useSelectUserGroup );
  const [ selectedGroup, setSelectGroup ] = useState( '' );
  const [ assignRolesByGroup, setAssignRolesByGroup ] = useImmer( [] );

  const handleOnchangeGroup = async ( value ) => {
    setUserGroup( value );
    setSelectGroup( value );
    if ( value ) {
      let data = await dispatch( getUserRoles( value ) );
      if ( data && data.payload && data.payload.EC === 0 ) {
        let result = buildDataRolesByGroup( data.payload.DT, roles );
        setAssignRolesByGroup( result );
      }
    }
  }

  const buildDataRolesByGroup = ( groupRoles, allRoles ) => {
    let results = [];
    if ( allRoles && allRoles.length > 0 ) {
      allRoles.map( role => {
        let obj = {};
        obj.url = role.url;
        obj.id = role.id;
        obj.description = role.description;
        obj.isAssigned = false;
        if ( groupRoles && groupRoles.length > 0 ) {
          let matchingRole = groupRoles.find( item => item.roleId === obj.id );
          if ( matchingRole ) {
            obj.isAssigned = true;
          }
        }
        results.push( obj );
      } )
    }
    return results;
  }

  useEffect( () => {
    dispatch( fetchGroup() );
    dispatch( fetchRoles() );
  }, [ dispatch ] );

  useEffect( () => {
    if ( userGroup ) {
      dispatch( getUserRoles( userGroup ) );
    }
  }, [ dispatch, userGroup ] );
  const handleSelectRole = ( value ) => {
    setAssignRolesByGroup(
      produce( ( draft ) => {
        let foundIndex = draft.findIndex( item => +item.id === +value );
        if ( foundIndex > -1 ) {
          draft[ foundIndex ].isAssigned = !draft[ foundIndex ].isAssigned;
        }
      } )
    );
  };

  const handlePermission = () => {
    const data = assignRolesByGroup
      .filter( item => item.isAssigned )
      .map( item => ( { roleId: item.id, groupId: +selectedGroup } ) );
    if ( data ) {
      return data;
    }
  }

  const handleClickBtn = async () => {
    let data = handlePermission();
    if ( data ) {
      let res = await dispatch( assignUserRoles( { data, selectedGroup } ) );
      if ( res && res.payload && res.payload.EC === 0 ) {
        toast.success( res.payload.EM )
      }
    }
  }

  return (
    <div className="container permission_container ps-4">
      <div className="col-12 form-group mt-2">
        <label>Nhóm người dùng: </label>
        <div className="col-6">
          <select
            className="form-select col-6"
            onChange={ ( e ) => handleOnchangeGroup( e.target.value ) }
            value={ userGroup }
          >
            <option>Chọn nhóm người dùng</option>
            { groups.map( ( group ) => (
              <option key={ group.id } value={ group.id }>
                { group.description }
              </option>
            ) ) }
          </select>
        </div>
        <div className="permissions mt-2">
          <div className="row">
            {
              assignRolesByGroup && assignRolesByGroup.length > 0 &&
              assignRolesByGroup.map( ( item, index ) => {
                return (
                  <div className="form-check col-4" key={ `role-${ index }` }>
                    <input className="form-check-input" type="checkbox"
                      value={ item.id }
                      id={ `role-${ index }` }
                      checked={ item.isAssigned }
                      onChange={ ( e ) => handleSelectRole( e.target.value ) }
                    />
                    <label className="form-check-label clickable" htmlFor={ `role-${ index }` }>
                      { item.description }
                    </label>
                  </div>
                )
              } )
            }
          </div>
        </div>
        <button className="btn btn-primary mt-2" onClick={ () => handleClickBtn() }>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default Permission;

