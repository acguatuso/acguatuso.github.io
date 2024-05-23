import { useEffect } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { fetchAds, fetchMainAds } from "../../redux/reducers/adsSlice"
import { AdsMain } from "./components/AdsMain"
import { AdsAdd } from "./components/AdsAdd"
import { AdsList } from "./components/AdsList"

export const Ads = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchMainAds())
    dispatch(fetchAds())
  },[])
  
  return (
    <>
        <AdsMain/>
        <AdsAdd/>
        <hr className="border border-secondary border-1 opacity-75"/>
        <div className="container-fluid">
          <AdsList/>
        </div>

        
    

    </>
  )
}
