import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Items as ItemsData, SubMenuItems } from '../../@types/data';

import api from '../../services/api';

import { CheckBox, Owner } from './styles';

const Items: React.FC = () => {

  const location = useLocation()

  const [items, setItems] = useState<ItemsData>()
  const [inputsChecked, setInputsChecked] = useState<SubMenuItems[]>([])

  const [checkboxes, setCheckboxes] = useState<boolean>(true)

  const getItems = useCallback(async () => {
    setInputsChecked([])
    try {
      const response = await api.get(location.pathname.substring(10))

      if (response.status === 200) {
        setItems(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }, [location.pathname])

  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    if (inputsChecked.length > 0) {
      setCheckboxes(true)
    } else {
      setCheckboxes(false)
    }
  }, [inputsChecked])

  const handleChecked = (input: ChangeEvent<HTMLInputElement>, item: SubMenuItems) => {
    setInputsChecked([])
    if (input.currentTarget.checked) {
      setInputsChecked([
        ...inputsChecked,
        item
      ])
    } else {
      const filter = inputsChecked.filter(inp => item.id !== inp.id)
      setInputsChecked(filter)
    }
  }

  const handleArchive = () => {
    const newItems: ItemsData = {
      id: items?.id,
      subMenuItems: []
    }

    items?.subMenuItems.forEach(subMenu => {
      const pos = inputsChecked.findIndex(input => input.id === subMenu.id)
      if (pos < 0) {
        newItems.subMenuItems.push(subMenu)
      }
    })

    setItems(newItems)
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <label style={{ marginRight: 8 }}>
            <div className="icheckbox_square-blue" style={{ position: 'relative' }}>
              <input type="checkbox"
                id="check-all" className="icheck aa" />
              <ins
                className="iCheck-helper aa" ></ins>
            </div>
          </label>
          <div>
            <button type="button" className="btn btn-default">
              Atribuir
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={handleArchive}
              style={{ marginLeft: 10, marginRight: 10 }}>
              Arquivar
            </button>
            <button type="button" className="btn btn-default">
              Agendar
            </button>
          </div>
        </div>

        <div className="col-md-6 search-form">
          <form action="#" className="text-right">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <span className="input-group-btn">
                <button type="submit" name="search" className="btn_ btn-primary btn-sm search"><i
                  className="fa fa-search"></i></button></span>
            </div>
          </form>
        </div>
      </div>

      <div className="padding"></div>

      <div style={{ marginTop: 30 }}>
        {items?.subMenuItems.map((item) => (
          <>
            <div className="row item" key={item.id}>
              <div className="col-lg-1">
                <p className="rounded">
                  <CheckBox
                    type="checkbox"
                    visible={checkboxes}
                    onChange={value => handleChecked(value, item)}
                    name={"item-" + item.id} />

                  <Owner visible={checkboxes}>{item.owner}</Owner>
                </p>
              </div>
              <div className="col-lg-8">
                <h4>{item.name}</h4>
                <p>{item.subject}</p>
              </div>
              <div className="col-lg-2">
                <div className="flex">
                  {item.users.map((item) => (
                    <p key={item} className="rounded-sm"><span>{item}</span></p>
                  ))}
                </div>
              </div>
            </div>

            <hr />
          </>
        ))}
      </div>
    </>
  )
}

export default Items;