import { useEffect } from "react"
import { ServiceMain } from "./components/ServiceMain"
import { useAppDispatch } from "../../hooks/hooks"
import { fetchMainService, fetchService } from "../../redux/reducers/servicesSlice"
import { ServiceAdd } from "./components/ServiceAdd"
import { ServiceList } from "./components/ServiceList"

export const ServicePage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchMainService())
    dispatch(fetchService())
  },[])
  return (
    <>  
      <ServiceMain/>
      <ServiceAdd/>
      <hr className="border border-secondary border-1 opacity-75"/>
      <div className="container-fluid">
        <ServiceList/>
      </div>
      

    </>
  )
}
