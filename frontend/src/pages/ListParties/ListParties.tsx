import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { createParty, getAllParties } from '@src/slices/partySlice'
import { IPageParams } from '@src/interfaces/IService'
import { IPartyCreate } from '@src/interfaces/IParty'
import { useResetPartyStates } from '@src/hooks/useResetStates'
import { Button, Col } from 'react-bootstrap'
import PaginationComponent from '@src/components/PaginationComponent'
import AddParty from '../AddParty/AddParty'
import Message from '@src/components/Message'
import NewLoading from '@src/components/NewLoading'
import ListPartyItem from './ListPartyItem'

const ListParties = (): JSX.Element => {
  const { parties, success, message, loading } = useSelector((state: RootState) => state.party)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetPartyStates(dispatch)

  const [editParty, setEditParty] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [calc, setCalc] = useState<number[]>([])
  const [pagination, setPagination] = useState<number[]>([])
  const [activePagination, setActivePagination] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)

  const limitPage = {
    limit,
    page,
  } as IPageParams

  useEffect(() => {
    dispatch(getAllParties(limitPage))
  }, [dispatch, limit, page])

  useEffect(() => {
    handleClose()
    dispatch(getAllParties(limitPage))
  }, [success])

  useEffect(() => {
    if (parties) {
      for (let i = 1; i <= Math.ceil(parties.total / parties.per_page); i++) {
        pagination.push(i)
      }
      setCalc([...pagination])
      setPagination([])
    }
  }, [parties])

  const handlePage = (page: number): void => {
    setPage(page)
    setActivePagination(page)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditParty(false)
  }

  const handleDelete = (id: string) => {}
  const handleEdit = (id: string) => {}

  const handleSubmit = async (data: IPartyCreate | any, service: any): Promise<void> => {
    const formData: FormData = new FormData()
    Object.keys(data).forEach((key: any) => formData.append(key, data[key]))
    formData.append('services', JSON.stringify(service))
    await dispatch(createParty(formData))
    resetStates()
  }

  return (
    <>
      <NewLoading load={loading} />
      <AddParty editParty={editParty} show={showModal} hide={handleClose} handleSubmit={handleSubmit} />
      <div>
        <h2 className="display-6">Minhas Festas</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Adicionar nova festa
        </Button>
      </div>
      {message && <Message msg={message} type="success" />}
      {parties && parties.data && parties.data.length > 0 ? (
        <Col as="ul" className="ps-0">
          {parties.data.map((party: IPartyCreate) => (
            <ListPartyItem key={party._id} handleDelete={handleDelete} handleEdit={handleEdit} party={party} />
          ))}
        </Col>
      ) : (
        <h3>Nenhuma festa cadastrada.</h3>
      )}
      <Col className="d-flex justify-content-between align-items-center">
        {parties && (
          <p className="text-muted">
            Total de festas: <strong>{parties.total}</strong>
          </p>
        )}
        <PaginationComponent pages={calc} activePagination={activePagination} handlePage={handlePage} />
      </Col>
    </>
  )
}

export default ListParties
